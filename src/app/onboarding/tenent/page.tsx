"use client";

import React, { useState, useCallback } from "react";
import { type PromptInputMessage } from "~/components/ai-elements/prompt-input";
import { withAuth } from "~/lib/auth-context";
import { useNetworkRetry, useApiErrorHandler } from "~/hooks/use-retry";
import { toast } from "sonner";

// Import refactored components and utilities
import {
  ChatInterface,
  ProgressPanel,
  useChat,
  useProfileOperations,
  parseAIResponse,
  WELCOME_MESSAGE,
  TOAST_MESSAGES,
  ONBOARDING_CONFIG,
  type ChatMessage,
  type ConversationContext,
  type ProfileData,
  type SubmitStatus,
} from "./";

function TenantOnboarding() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);

  // Error handling state
  const [chatError, setChatError] = useState<string | null>(null);
  const [showRetryPrompt, setShowRetryPrompt] = useState(false);
  const [lastFailedMessage, setLastFailedMessage] = useState<ChatMessage | null>(null);

  // Conversation state management for data aggregation
  const [aggregatedData, setAggregatedData] = useState<ProfileData>({});
  const [conversationContext, setConversationContext] = useState<ConversationContext>({
    questionCount: 0,
    completedQuestions: [],
  });

  // Raw conversation storage for skip functionality
  const [rawConversationStorage, setRawConversationStorage] = useState<ChatMessage[]>([]);

  // Loading states for Skip and Submit buttons
  const [isProcessingSkip, setIsProcessingSkip] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Status for the submit button
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("ready");

  // Error handling utilities
  const { getErrorMessage } = useApiErrorHandler();

  // Custom hooks
  const { sendChatMessage } = useChat({ messages, conversationContext, aggregatedData });
  const { handleSkip, handleSubmitProfile } = useProfileOperations();



  // Setup retry mechanism for chat
  const chatRetry = useNetworkRetry(
    () =>
      lastFailedMessage
        ? sendChatMessage(lastFailedMessage)
        : Promise.reject(new Error("No message to retry")),
    {
      maxAttempts: ONBOARDING_CONFIG.MAX_RETRY_ATTEMPTS,
      delay: ONBOARDING_CONFIG.RETRY_DELAY,
      onError: (error, attempt) => {
        console.warn(
          `Chat request failed (attempt ${attempt}):`,
          error.message,
        );
        setChatError(getErrorMessage(error));
      },
    },
  );

  // Handle form submission
  const handleSubmit = useCallback(
    async (message: PromptInputMessage) => {
      const inputText = message.text;
      if (!inputText?.trim() || isLoading) return;

      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content: inputText.trim(),
      };

      // Clear any previous errors
      setChatError(null);
      setShowRetryPrompt(false);
      setLastFailedMessage(null);

      // Add user message
      setMessages((prev) => [...prev, userMessage]);

      // Store user message in conversation storage
      setRawConversationStorage((prev) => [...prev, userMessage]);

      setIsLoading(true);
      setSubmitStatus("submitted");

      // Simulate brief submitted state then streaming
      setTimeout(() => setSubmitStatus("streaming"), 200);

      try {
        const assistantMessage = await sendChatMessage(userMessage);
        const { displayContent, profileData } = parseAIResponse(assistantMessage);

        // Only try to parse JSON if we're at the end of onboarding
        if (conversationContext.questionCount >= 9 && profileData) {
          setAggregatedData(profileData);
        }

        // Update conversation context
        setConversationContext((prev) => ({
          ...prev,
          questionCount: prev.questionCount + 1,
          currentQuestion: displayContent,
          completedQuestions: [...prev.completedQuestions, displayContent],
        }));

        // Add assistant message
        const assistantMsg: ChatMessage = {
          id: Date.now().toString() + "_assistant",
          role: "assistant",
          content: displayContent,
        };

        setMessages((prev) => [...prev, assistantMsg]);

        // Store assistant message in conversation storage
        setRawConversationStorage((prev) => [...prev, assistantMsg]);
      } catch (error) {
        console.error("Chat error:", error);
        const errorMessage = getErrorMessage(error);

        // Store failed message for retry
        setLastFailedMessage(userMessage);
        setChatError(errorMessage);
        setShowRetryPrompt(true);

        // Remove the user message from chat since it failed
        setMessages((prev) => prev.slice(0, -1));

        setSubmitStatus("error");
      } finally {
        setIsLoading(false);
        if (!chatError) {
          setSubmitStatus("ready");
        }
      }
    },
    [isLoading, sendChatMessage, getErrorMessage, conversationContext.questionCount],
  );

  // Handle retry from retry prompt
  const handleRetry = useCallback(async () => {
    if (!lastFailedMessage) return;

    setShowRetryPrompt(false);
    setChatError(null);
    setIsLoading(true);
    setSubmitStatus("submitted");

    // Re-add the user message
    setMessages((prev) => [...prev, lastFailedMessage]);

    // Simulate brief submitted state then streaming
    setTimeout(() => setSubmitStatus("streaming"), 200);

    try {
      const result = await chatRetry.execute();
      if (result) {
        const { displayContent, profileData } = parseAIResponse(result);

        // Only try to parse JSON if we're at the end of onboarding
        if (conversationContext.questionCount >= 9 && profileData) {
          setAggregatedData(profileData);
        }

        // Update conversation context
        setConversationContext((prev) => ({
          ...prev,
          questionCount: prev.questionCount + 1,
          currentQuestion: displayContent,
          completedQuestions: [...prev.completedQuestions, displayContent],
        }));

        // Add assistant message
        const assistantMsg: ChatMessage = {
          id: Date.now().toString() + "_assistant",
          role: "assistant",
          content: displayContent,
        };

        setMessages((prev) => [...prev, assistantMsg]);

        // Store assistant message in conversation storage
        setRawConversationStorage((prev) => [...prev, assistantMsg]);

        // Clear retry state
        setLastFailedMessage(null);
      }
    } catch (error) {
      // Error is already handled by the retry hook
      setShowRetryPrompt(true);
      // Remove the user message again since retry failed
      setMessages((prev) => prev.slice(0, -1));

      setSubmitStatus("error");
    } finally {
      setIsLoading(false);
      if (!showRetryPrompt) {
        setSubmitStatus("ready");
      }
    }
  }, [lastFailedMessage, chatRetry, conversationContext.questionCount]);

  // Handle cancel retry
  const handleCancelRetry = useCallback(() => {
    setShowRetryPrompt(false);
    setChatError(null);
    setLastFailedMessage(null);
    setSubmitStatus("ready");
    chatRetry.reset();
  }, [chatRetry]);

  // Handle showing retry prompt
  const handleShowRetryPrompt = useCallback(() => {
    setShowRetryPrompt(true);
  }, []);

  // Wrapper functions for profile operations
  const handleSkipWrapper = useCallback(() => {
    handleSkip(rawConversationStorage, setIsProcessingSkip);
  }, [handleSkip, rawConversationStorage]);

  const handleSubmitProfileWrapper = useCallback(() => {
    handleSubmitProfile(aggregatedData, setIsSubmitting);
  }, [handleSubmitProfile, aggregatedData]);

  // Track if welcome toast has been shown to prevent duplicates
  const welcomeToastShown = React.useRef(false);

  // Show welcome toast on mount (only once)
  React.useEffect(() => {
    if (!welcomeToastShown.current) {
      toast.info(TOAST_MESSAGES.WELCOME, { duration: 4000 });
      welcomeToastShown.current = true;
    }
  }, []);

  // Show hint about Skip button after first user input
  React.useEffect(() => {
    // Show hint after first user message (every 2 messages = 1 user + 1 assistant)
    if (rawConversationStorage.length === 2) {
      toast.info(TOAST_MESSAGES.SKIP_HINT, { duration: 3000 });
    }
  }, [rawConversationStorage.length]);

  return (
    <div className="bg-background flex h-screen">
      <ChatInterface
        messages={messages}
        isLoading={isLoading}
        chatError={chatError}
        showRetryPrompt={showRetryPrompt}
        submitStatus={submitStatus}
        onSubmit={handleSubmit}
        onRetry={handleRetry}
        onCancelRetry={handleCancelRetry}
        onShowRetryPrompt={handleShowRetryPrompt}
      />
      <ProgressPanel
        conversationContext={conversationContext}
        isProcessingSkip={isProcessingSkip}
        isSubmitting={isSubmitting}
        onSkip={handleSkipWrapper}
        onSubmitProfile={handleSubmitProfileWrapper}
      />
    </div>
  );
}

// Export the component wrapped with authentication guard for TENANT role
export default withAuth(TenantOnboarding, "TENANT");
