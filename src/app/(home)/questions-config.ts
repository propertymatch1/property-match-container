import type { QuestionConfig } from "./steps/question-step"

// URL validation helper
const validateUrl = (url: string): string | null => {
  const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i
  if (!urlPattern.test(url)) {
    return "Please enter a valid URL (e.g., https://example.com)"
  }
  return null
}

// Email validation helper
const validateEmail = (email: string): string | null => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email)) {
    return "Please enter a valid email address"
  }
  return null
}

/**
 * Onboarding Questions Configuration
 * 
 * Add or modify questions here. Each question will be rendered as a separate step.
 * The order in this array determines the order of questions in the flow.
 */
export const ONBOARDING_QUESTIONS: QuestionConfig[] = [
  {
    id: "companyName",
    title: "What's your company name?",
    description: "Let's start with the basics. What should we call your brand?",
    type: "text",
    placeholder: "Enter your company name",
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  {
    id: "industry",
    title: "What industry are you in?",
    description: "Help us understand your market and competitive landscape.",
    type: "text",
    placeholder: "e.g., Technology, Healthcare, Retail",
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  {
    id: "targetAudience",
    title: "Who is your target audience?",
    description: "Describe the customers or clients you're trying to reach.",
    type: "text",
    placeholder: "e.g., Small businesses, Millennials, Enterprise clients",
    required: true,
    minLength: 5,
    maxLength: 200,
  },
  {
    id: "brandDescription",
    title: "Tell us about your brand",
    description: "Describe your brand's mission, values, and what makes you unique.",
    type: "textarea",
    placeholder: "Share your brand story, core values, and what sets you apart from competitors...",
    required: true,
    minLength: 20,
    maxLength: 1000,
  },
  {
    id: "websiteUrl",
    title: "What's your website URL?",
    description: "We'll use this to understand your current brand presence and provide tailored recommendations.",
    type: "url",
    placeholder: "https://example.com",
    required: true,
    validation: validateUrl,
    helperText: "We'll analyze your website to better understand your brand identity",
  },
  
  // Add more questions below as needed
  // Example additional questions:
  
  // {
  //   id: "foundedYear",
  //   title: "When was your company founded?",
  //   description: "Help us understand your company's history and maturity.",
  //   type: "number",
  //   placeholder: "2020",
  //   required: false,
  // },
  // {
  //   id: "companySize",
  //   title: "How many employees do you have?",
  //   description: "This helps us understand your company's scale.",
  //   type: "text",
  //   placeholder: "e.g., 1-10, 11-50, 51-200",
  //   required: false,
  // },
  // {
  //   id: "primaryGoal",
  //   title: "What's your primary business goal?",
  //   description: "What are you hoping to achieve in the next 12 months?",
  //   type: "textarea",
  //   placeholder: "Describe your main objectives...",
  //   required: false,
  //   minLength: 10,
  // },

]

/**
 * Calculate total number of steps including landing, welcome, and completion
 */
export const TOTAL_STEPS = 2 + ONBOARDING_QUESTIONS.length + 1 // landing + welcome + questions + completion
