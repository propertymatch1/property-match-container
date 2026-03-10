# Onboarding Questions - Simple Setup Guide

This guide shows you how to add questions and create branching logic in the onboarding flow. No coding knowledge required!

---

## Where to Edit

Open this file: `src/app/(home)/questions-config.ts`

All questions are in the `ONBOARDING_QUESTIONS` array. Each question is a block of text between `{` and `}`.

---

## How to Add a Simple Question

Copy and paste this template, then fill in your details:

```typescript
{
  id: "yourQuestionId",
  title: "Your question text here?",
  description: "Optional helper text",
  type: "text",
  placeholder: "Hint text that shows in the input box",
  required: true,
},
```

### What Each Part Means:

- **id**: A unique name (no spaces, use lowercase and dashes like `"company-name"`)
- **title**: The actual question the user sees
- **description**: Extra help text below the title (can be empty `""`)
- **type**: What kind of input (see types below)
- **placeholder**: Gray hint text inside the input box
- **required**: `true` = user must answer, `false` = user can skip

---

## Question Types

### 1. Text Input (Short Answer)
```typescript
type: "text"
```
For short answers like names, emails, etc.

### 2. Long Text (Paragraph)
```typescript
type: "textarea"
```
For longer answers like descriptions or stories.

### 3. Dropdown Menu
```typescript
type: "select",
options: [
  { value: "option1", label: "First Choice" },
  { value: "option2", label: "Second Choice" },
  { value: "option3", label: "Third Choice" },
]
```
User picks ONE option from a dropdown.

### 4. Multiple Choice Buttons (Pick One)
```typescript
type: "multiple-choice",
allowMultiple: false,
options: [
  { value: "choice1", label: "FIRST CHOICE" },
  { value: "choice2", label: "SECOND CHOICE" },
]
```
User clicks ONE button.

### 5. Multiple Choice Buttons (Pick Many)
```typescript
type: "multiple-choice",
allowMultiple: true,
options: [
  { value: "option1", label: "OPTION 1" },
  { value: "option2", label: "OPTION 2" },
  { value: "option3", label: "OPTION 3" },
]
```
User can click MULTIPLE buttons.

### 6. Website URL
```typescript
type: "url"
```
Special input that checks if the URL is valid.

---

## Creating Branching Logic

Branching means: "If user picks A, go to Question X. If user picks B, go to Question Y."

### Simple Flow (No Branching)

Questions go in order automatically. Just add them to the list:

```typescript
[
  { id: "question1", title: "First question?", type: "text", required: true },
  { id: "question2", title: "Second question?", type: "text", required: true },
  { id: "question3", title: "Third question?", type: "text", required: true },
]
```

Flow: Question 1 → Question 2 → Question 3 → Done

---

### Jump to a Specific Question

Add `nextScreen` to make the flow jump:

```typescript
{
  id: "question1",
  title: "Do you have a website?",
  type: "text",
  required: false,
  nextScreen: "question5",  // Skip to question5 if answered
}
```

Flow: Question 1 (answered) → Question 5

---

### Different Paths for Skip vs Answer

Use both `nextScreen` and `nextScreenOnSkip`:

```typescript
{
  id: "websiteUrl",
  title: "What's your website?",
  type: "url",
  required: false,
  nextScreen: "brandDetails",           // If they enter a URL
  nextScreenOnSkip: "industryQuestion", // If they skip
}
```

Flow:
- User enters URL → Go to `brandDetails`
- User skips → Go to `industryQuestion`

---

### Branching Based on User's Choice

For multiple-choice questions where each button goes to a different place:

```typescript
{
  id: "userType",
  title: "Are you a business or individual?",
  type: "multiple-choice",
  allowMultiple: false,  // Single choice only!
  required: true,
  options: [
    { 
      value: "business", 
      label: "BUSINESS",
      nextScreen: "businessQuestions"  // Goes here if they pick this
    },
    { 
      value: "individual", 
      label: "INDIVIDUAL",
      nextScreen: "individualQuestions"  // Goes here if they pick this
    },
  ],
}
```

Flow:
- User clicks "BUSINESS" → Go to `businessQuestions`
- User clicks "INDIVIDUAL" → Go to `individualQuestions`

**Important**: This ONLY works when `allowMultiple: false` (single choice).

---

## Real Example: Complete Branching Flow

Here's a real example from the code:

```typescript
// Question 1: Ask for website (optional)
{
  id: "websiteUrl",
  title: "Where does your brand live online?",
  type: "url",
  required: false,
  nextScreen: "brandDetails",        // If they enter URL → skip to end
  nextScreenOnSkip: "industryOrAudience",  // If they skip → ask more questions
},

// Question 2: Branching question (only shows if they skipped website)
{
  id: "industryOrAudience",
  title: "Industry or Target audience?",
  type: "multiple-choice",
  allowMultiple: false,
  required: true,
  options: [
    { value: "chooseIndustry", label: "INDUSTRY", nextScreen: "industry" },
    { value: "chooseTargetAudience", label: "TARGET AUDIENCE", nextScreen: "targetAudience" },
  ],
},

// Question 3: Industry path
{
  id: "industry",
  title: "Where do you primarily operate?",
  type: "select",
  required: true,
  nextScreen: "brandDescription",  // Both paths meet here
  options: [
    { value: "northeast", label: "Northeast Region" },
    { value: "west", label: "West Region" },
  ],
},

// Question 4: Target Audience path
{
  id: "targetAudience",
  title: "How do you define yourself?",
  type: "multiple-choice",
  allowMultiple: true,
  required: true,
  nextScreen: "brandDescription",  // Both paths meet here
  options: [
    { value: "option1", label: "RETAIL" },
    { value: "option2", label: "WHOLESALE" },
  ],
},

// Question 5: Final question (both paths end here)
{
  id: "brandDescription",
  title: "Tell us about your brand",
  type: "textarea",
  required: true,
  // No nextScreen = goes to completion
},
```

**Flow Diagram:**

```
Start
  ↓
Website URL?
  ├─ Entered → Brand Details → Done
  └─ Skipped → Industry or Audience?
                ├─ Industry → Industry Question → Brand Description → Done
                └─ Audience → Audience Question → Brand Description → Done
```

---

## Quick Reference: Navigation Fields

| Field | When to Use | What It Does |
|-------|-------------|--------------|
| (none) | Default | Goes to next question in the list |
| `nextScreen: "questionId"` | Always jump to a specific question | Skips other questions |
| `nextScreenOnSkip: "questionId"` | User can skip this question | Different path if they skip |
| `options[].nextScreen` | Multiple choice (single only) | Each button goes somewhere different |

---

## Tips

1. **Question IDs must be unique** - No two questions can have the same `id`
2. **Use lowercase with dashes** - Good: `"company-name"`, Bad: `"Company Name"`
3. **Test your flow** - Click through to make sure branches work correctly
4. **Questions without `nextScreen`** - Automatically go to the next question in the list
5. **Last question** - Don't add `nextScreen` to the last question (it goes to completion)

---

## How to Get User Answers in Your Code

If you need to access what the user answered:

```typescript
import { useOnboarding } from "./onboarding-context"

function YourComponent() {
  const { responses } = useOnboarding()
  
  // Get a specific answer using the question ID
  const companyName = responses["company-name"]
  const websiteUrl = responses["websiteUrl"]
  
  // For multiple choice (multiple selections), split by comma
  const selectedOptions = responses["targetAudience"]?.split(",") || []
}
```

---

## Need Help?

- Check existing questions in `questions-config.ts` for examples
- Make sure all `{` have matching `}`
- Make sure all lines end with commas except the last one in a block
- Test in the browser after making changes
