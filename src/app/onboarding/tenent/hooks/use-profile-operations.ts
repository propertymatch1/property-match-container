import { useCallback } from "react";
import { toast } from "sonner";
import { useApiErrorHandler } from "~/hooks/use-retry";
import { useSession } from "~/lib/auth-client";
import type { ProfileData, ChatMessage } from "../types";
import { TOAST_MESSAGES, ONBOARDING_CONFIG } from "../constants";

export const useProfileOperations = () => {
  const { data: session } = useSession();
  const { getErrorMessage } = useApiErrorHandler();

  const processConversationData = useCallback(async (conversation: ChatMessage[]): Promise<ProfileData> => {
    // Convert conversation to formatted text for AI processing
    const conversationText = conversation
      .map(msg => `${msg.role.toUpperCase()}: ${msg.content}`)
      .join('\n\n');

    const response = await fetch("/api/onboarding/tenant/process-raw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rawData: [conversationText] }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to process data`);
    }

    const { profileData } = await response.json();
    return profileData;
  }, []);

  const saveProfile = useCallback(async (profileData: ProfileData): Promise<void> => {
    if (!session?.user?.email) {
      throw new Error(TOAST_MESSAGES.SIGN_IN_REQUIRED);
    }

    const saveResponse = await fetch("/api/onboarding/tenant/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: session.user.email,
        data: profileData,
      }),
    });

    if (!saveResponse.ok) {
      throw new Error(`HTTP ${saveResponse.status}: Failed to save profile`);
    }
  }, [session?.user?.email]);

  const handleSkip = useCallback(async (
    conversationStorage: ChatMessage[],
    setIsProcessingSkip: (loading: boolean) => void
  ) => {
    if (!session?.user?.email) {
      toast.error(TOAST_MESSAGES.SIGN_IN_REQUIRED);
      return;
    }

    setIsProcessingSkip(true);

    try {
      toast.loading("Processing your conversation...", { id: "skip-process" });
      const profileData = await processConversationData(conversationStorage);

      toast.loading("Saving your profile...", { id: "skip-process" });
      
      await saveProfile(profileData);

      toast.success(TOAST_MESSAGES.PROFILE_SAVED, { id: "skip-process" });

      setTimeout(() => {
        window.location.href = "/dashboard/tenent";
      }, ONBOARDING_CONFIG.REDIRECT_DELAY);
    } catch (error) {
      console.error("Skip processing error:", error);
      toast.error(getErrorMessage(error), { id: "skip-process" });
    } finally {
      setIsProcessingSkip(false);
    }
  }, [processConversationData, saveProfile, getErrorMessage, session?.user?.email]);

  const handleSubmitProfile = useCallback(async (
    aggregatedData: ProfileData,
    setIsSubmitting: (loading: boolean) => void
  ) => {
    if (!session?.user?.email) {
      toast.error(TOAST_MESSAGES.SIGN_IN_REQUIRED);
      return;
    }

    setIsSubmitting(true);

    try {
      toast.loading("Saving your complete profile...", { id: "submit-profile" });

      await saveProfile(aggregatedData);

      toast.success(TOAST_MESSAGES.PROFILE_SUBMITTED, { id: "submit-profile" });

      setTimeout(() => {
        window.location.href = "/dashboard/tenent";
      }, ONBOARDING_CONFIG.REDIRECT_DELAY);
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(getErrorMessage(error), { id: "submit-profile" });
    } finally {
      setIsSubmitting(false);
    }
  }, [saveProfile, getErrorMessage, session?.user?.email]);

  return {
    handleSkip,
    handleSubmitProfile,
  };
};