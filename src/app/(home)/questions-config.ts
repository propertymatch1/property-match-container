import type { QuestionConfig } from "./steps/question-step"

// URL validation helper
const validateUrl = (url: string): string | null => {
  const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i
  if (!urlPattern.test(url)) {
    return "Please enter a valid URL (e.g., https://example.com)"
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
    id: "websiteUrl",
    title: "Where does your brand live online?",
    description: "Paste your link and our AI will instantly pull your logo, primary color palette, and brand bio. It's the fastest way to seed your Passport.",
    type: "url",
    placeholder: "www.url.com",
    required: false,
    validation: validateUrl,
    helperText: "",
    useSplitScreen: true,
    nextScreen: "brandDetails", // If URL provided, go to brandDetails
    nextScreenOnSkip: "industry", // If skipped, go directly to industry
  },
  {
    id: "brandDetails",
    title: "Brand name & logo",
    description: "",
    type: "text", // This will be a custom multi-field question
    placeholder: "brand name",
    required: true,
    minLength: 2,
    maxLength: 100,
    // No nextScreen - will go to completion
  },
  {
    id: "industry",
    title: "Where do you primarily operate today?",
    description: "you can let us know your operating address or simply tell us the zipcode where your business is at",
    type: "select",
    placeholder: "Select your location",
    required: true,
    nextScreen: "targetAudience",
    options: [
      { value: "northeast", label: "Northeast Region" },
      { value: "southeast", label: "Southeast Region" },
      { value: "midwest", label: "Midwest Region" },
      { value: "southwest", label: "Southwest Region" },
      { value: "west", label: "West Region" },
      { value: "national", label: "National (Multiple Regions)" },
      { value: "international", label: "International" },
    ],
  },
  {
    id: "targetAudience",
    title: "In the retail world, how do you define yourself?",
    description: "",
    type: "multiple-choice",
    placeholder: "",
    required: true,
    allowMultiple: true,
    options: [
      { value: "option1", label: "MULTIPLE SELECT 01" },
      { value: "option2", label: "MULTIPLE SELECT 02" },
      { value: "option3", label: "MULTIPLE SELECT 03" },
      { value: "option4", label: "MULTIPLE SELECT 04" },
      { value: "other", label: "OTHER" },
    ],
    nextScreen: "brandDescription",
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
    // No nextScreen - will go to completion
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
