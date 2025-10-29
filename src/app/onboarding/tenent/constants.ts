// Constants for tenant onboarding

export const ONBOARDING_CONFIG = {
  TOTAL_QUESTIONS: 10,
  REQUEST_TIMEOUT: 30000, // 30 seconds
  RETRY_DELAY: 1000,
  MAX_RETRY_ATTEMPTS: 3,
  REDIRECT_DELAY: 1000,
} as const;

export const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant" as const,
  content:
    "Hi there! I'm here to help you get set up as a tenant on our platform. Let's start by learning about your brand - what's your business name and what industry are you in?",
};

export const TOAST_MESSAGES = {
  WELCOME: "Welcome to tenant onboarding! Answer questions or skip anytime.",
  SKIP_HINT: '💡 Tip: You can skip anytime using the "Skip & Finish" button!',
  SIGN_IN_REQUIRED: "Please sign in to save your profile",
  PROFILE_SAVED: "Profile saved successfully! Redirecting...",
  PROFILE_SUBMITTED: "Profile submitted successfully! Redirecting...",
} as const;

export const PLACEHOLDER_TEXTS = {
  INPUT_LOADING: "Please wait...",
  INPUT_DEFAULT: "Tell me about your brand and business...",
  PROCESSING: "Processing...",
  SUBMITTING: "Submitting...",
} as const;
