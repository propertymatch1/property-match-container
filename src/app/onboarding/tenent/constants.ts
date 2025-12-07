// Constants for tenant onboarding

export const ONBOARDING_CONFIG = {
  TOTAL_QUESTIONS: 10,
  REQUEST_TIMEOUT: 30000, // 30 seconds
  RETRY_DELAY: 1000,
  MAX_RETRY_ATTEMPTS: 3,
  REDIRECT_DELAY: 1000,
} as const;

export const INTRO_MESSAGE = {
  id: "intro",
  role: "assistant" as const,
  content:
    "Let's make your brand discoverable.\n\nIn just a few minutes, you'll create your Business Identity Card — an AI-powered profile that helps you find spaces that fit your brand's story and growth goals.\n\nThink of it as your brand's passport — it helps landlords recognize your value instantly and unlocks smarter space recommendations tailored to your vibe. The more you share, the better our AI understands your concept and the better the spaces it recommends.",
};

export const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant" as const,
  content:
    "Hi there! I'm here to help you get set up as a tenant on our platform. Let's start by learning about your brand - what's your business name and what industry are you in?",
};

export const TOAST_MESSAGES = {
  WELCOME: "Welcome to tenant onboarding! Answer questions or skip anytime.",
  SKIP_HINT: '💡 Tip: You can skip anytime using the "Skip & Finish" button!',
  SAFEGUARD_HINT: '✅ Great job! You can now complete your profile using the "Submit Profile" button.',
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

// Suggestions for each question in the onboarding flow
export const QUESTION_SUGGESTIONS = {
  1: [
    // Brand journey/stage
    "Just starting out",
    "Been in business 1-2 years",
    "Established business (3+ years)",
    "Expanding to new locations",
    "Rebranding/pivoting",
  ],
  2: [
    // Space preference type
    "Retail storefront",
    "Office space",
    "Restaurant space",
    "Pop-up location",
    "Warehouse/Industrial",
  ],
  3: [
    // Space size needed
    "500-1,000 sq ft",
    "1,000-2,500 sq ft",
    "2,500-5,000 sq ft",
    "5,000+ sq ft",
    "Not sure yet",
  ],
  4: [
    // Rent range budget
    "$20-40 per sq ft",
    "$40-60 per sq ft",
    "$60-80 per sq ft",
    "$80+ per sq ft",
    "Need to discuss",
  ],
  5: [
    // Cities they want to open in
    "New York City",
    "Los Angeles",
    "Chicago",
    "Miami",
    "Multiple cities",
  ],
  6: [
    // Timeline for opening
    "Within 3 months",
    "3-6 months",
    "6-12 months",
    "12+ months",
    "Flexible timeline",
  ],
  7: [
    // Target customer type
    "Young professionals",
    "Families",
    "Students",
    "Tourists",
    "Local community",
  ],
  8: [
    // Customer spending range
    "$10-25 per visit",
    "$25-50 per visit",
    "$50-100 per visit",
    "$100+ per visit",
    "Varies by service",
  ],
  9: [
    // Brand personality
    "Modern & trendy",
    "Classic & timeless",
    "Fun & playful",
    "Professional & sophisticated",
    "Eco-friendly & sustainable",
  ],
} as const;
