import { useCallback } from "react";
import type { ChatMessage, ConversationContext, ProfileData } from "../types";
import { ONBOARDING_CONFIG } from "../constants";
import { createChatRequestBody, handleStreamingResponse, createTimeoutError } from "../utils";

interface UseChatProps {
  messages: ChatMessage[];
  conversationContext: ConversationContext;
  aggregatedData: ProfileData;
}

export const useChat = ({ messages, conversationContext, aggregatedData }: UseChatProps) => {
  const sendChatMessage = useCallback(
    async (userMessage: ChatMessage) => {
      // Create an AbortController for timeout handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), ONBOARDING_CONFIG.REQUEST_TIMEOUT);

      try {
        const response = await fetch("/api/onboarding/tenant/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            createChatRequestBody(
              [...messages, userMessage],
              conversationContext,
              aggregatedData
            )
          ),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP ${response.status}: ${errorText || "Failed to get response"}`,
          );
        }

        return await handleStreamingResponse(response);
      } catch (error) {
        clearTimeout(timeoutId);
        throw createTimeoutError(error);
      }
    },
    [messages, conversationContext, aggregatedData],
  );

  return { sendChatMessage };
};