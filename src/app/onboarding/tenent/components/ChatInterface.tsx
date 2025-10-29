import React from "react";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
} from "~/components/ai-elements/conversation";
import { Message, MessageContent } from "~/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  type PromptInputMessage,
  PromptInputProvider,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "~/components/ai-elements/prompt-input";
import {
  ChatLoading,
  SaveError,
  RetryPrompt,
} from "~/components/loading-states";
import type { ChatMessage, SubmitStatus } from "../types";
import { PLACEHOLDER_TEXTS } from "../constants";

interface ChatInterfaceProps {
  messages: ChatMessage[];
  isLoading: boolean;
  chatError: string | null;
  showRetryPrompt: boolean;
  submitStatus: SubmitStatus;
  onSubmit: (message: PromptInputMessage) => void;
  onRetry: () => void;
  onCancelRetry: () => void;
  onShowRetryPrompt: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  isLoading,
  chatError,
  showRetryPrompt,
  submitStatus,
  onSubmit,
  onRetry,
  onCancelRetry,
  onShowRetryPrompt,
}) => {
  return (
    <div className="relative flex flex-1 flex-col divide-y overflow-hidden">
      {/* Header */}
      <div className="border-border shrink-0 border-b p-4">
        <h1 className="text-xl font-semibold">Tenant Onboarding</h1>
        <p className="text-muted-foreground text-sm">
          Let's get to know your brand and find the perfect space
        </p>
      </div>

      {/* Conversation area - scrollable with mobile bottom padding */}
      <div className="flex-1 overflow-hidden pb-32 lg:pb-0">
        <Conversation>
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              title="Welcome to Tenant Onboarding"
              description="I'll guide you through a few questions to set up your tenant profile."
            />
          ) : (
            <>
              {messages.map((message) => (
                <Message key={message.id} from={message.role}>
                  <MessageContent>{message.content}</MessageContent>
                </Message>
              ))}

              {/* Show loading state */}
              {isLoading && (
                <div className="px-4 py-3">
                  <ChatLoading message="AI is thinking..." />
                </div>
              )}

              {/* Show error state */}
              {chatError && !showRetryPrompt && (
                <div className="px-4 py-3">
                  <SaveError
                    message={chatError}
                    onRetry={onShowRetryPrompt}
                  />
                </div>
              )}

              {/* Show retry prompt */}
              {showRetryPrompt && (
                <div className="px-4 py-3">
                  <RetryPrompt
                    message="Failed to send your message. Would you like to try again?"
                    onRetry={onRetry}
                    onCancel={onCancelRetry}
                  />
                </div>
              )}
            </>
          )}
        </ConversationContent>
        </Conversation>
      </div>

      {/* Input area - fixed at bottom with mobile bottom padding */}
      <div className="w-full px-4 pb-32 lg:pb-4">
        <PromptInputProvider>
          <PromptInput onSubmit={onSubmit}>
            <PromptInputBody>
              <PromptInputTextarea
                placeholder={
                  isLoading
                    ? PLACEHOLDER_TEXTS.INPUT_LOADING
                    : PLACEHOLDER_TEXTS.INPUT_DEFAULT
                }
                disabled={isLoading || showRetryPrompt}
              />
            </PromptInputBody>
            <PromptInputFooter>
              <PromptInputTools>
                <div />
              </PromptInputTools>
              <PromptInputSubmit
                status={submitStatus}
                disabled={isLoading || showRetryPrompt}
              />
            </PromptInputFooter>
          </PromptInput>
        </PromptInputProvider>
      </div>
    </div>
  );
};