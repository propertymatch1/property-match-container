// Type definitions for tenant onboarding

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface AIResponse {
  resp: string;
  data?: {
    tenantProfile?: Record<string, any>;
    profileData?: Record<string, any>;
  };
  tenantProfile?: Record<string, any>;
  profileData?: Record<string, any>;
}

export interface ProfileData {
  brandName?: string;
  industry?: string;
  tennentExperience?: string;
  spaceLooking?: string[];
  spaceNeed?: number;
  rentRangeDesire?: number;
  cityNext?: string[];
  whenNextOpen?: string;
  typcialCustomer?: string[];
  typcialCustomerSpend?: string; // String range format like "15-50"
  personalityTags?: string[];
  brandKeywords?: string[];
  toneTags?: string[];
  logoUrl?: string;
  notes?: string;
}

export interface ConversationContext {
  questionCount: number;
  completedQuestions: string[];
  currentQuestion?: string;
}

export type SubmitStatus = "submitted" | "streaming" | "ready" | "error";