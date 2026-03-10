# Onboarding Questions - Developer Guide

## Quick Start: Adding a New Question

### 1. Open the Config File
Edit `src/app/(home)/questions-config.ts`

### 2. Add Your Question to the Array
Add a new question object to the `ONBOARDING_QUESTIONS` array:

```typescript
{
  id: "yourQuestionId",              // Unique identifier (camelCase)
  title: "Your Question Title",      // Main heading
  description: "Optional description", // Subheading (optional)
  type: "text",                      // Question type (see types below)
  placeholder: "Enter value...",     // Input placeholder
  required: true,                    // Is this required?
  nextScreen: "nextQuestionId",      // Where to go next (optional)
}
```

### 3. Configure Navigation
- **nextScreen**: ID of the next question (if continuing with value)
- **nextScreenOnSkip**: ID to jump to when skipping (optional, for non-required questions)
- **No nextScreen**: Goes to completion screen

## Question Types

### Text Input
```typescript
{
  id: "companyName",
  type: "text",
  placeholder: "Enter company name",
  minLength: 2,
  maxLength: 100,
}
```

### Textarea
```typescript
{
  id: "description",
  type: "textarea",
  placeholder: "Tell us more...",
  minLength: 20,
  maxLength: 500,
}
```

### URL Input
```typescript
{
  id: "website",
  type: "url",
  placeholder: "www.example.com",
  validation: validateUrl,  // Use built-in validator
}
```

### Dropdown Select
```typescript
{
  id: "region",
  type: "select",
  placeholder: "Select region",
  options: [
    { value: "north", label: "North" },
    { value: "south", label: "South" },
  ],
}
```

### Multiple Choice
```typescript
{
  id: "interests",
  type: "multiple-choice",
  allowMultiple: true,
  options: [
    { value: "opt1", label: "OPTION 1" },
    { value: "opt2", label: "OPTION 2" },
  ],
}
```

## Layout Options

### Split-Screen Layout
```typescript
{
  useSplitScreen: true,  // Illustration on left, form on right
}
```

### Centered Layout (Default)
Questions without `useSplitScreen` use centered layout with optional map placeholder.

## Navigation Flow Examples

### Linear Flow
```typescript
// Question 1
{ id: "q1", nextScreen: "q2" }
// Question 2
{ id: "q2", nextScreen: "q3" }
// Question 3 (last)
{ id: "q3" }  // No nextScreen = goes to completion
```

### Conditional Flow
```typescript
// Question with skip option
{
  id: "optional",
  required: false,
  nextScreen: "detailsPage",      // If filled
  nextScreenOnSkip: "summaryPage" // If skipped
}
```

## Accessing User Responses

### Method: `responses` Object

The `responses` object is a key-value store where:
- **Key**: Question ID (e.g., "websiteUrl", "industry")
- **Value**: User's input as a string

### In Any Component

```typescript
import { useOnboarding } from "./onboarding-context"

function YourComponent() {
  const { responses } = useOnboarding()
  
  // Access a specific response
  const websiteUrl = responses["websiteUrl"]
  const industry = responses["industry"]
  
  // Check if a field has been filled
  if (responses["websiteUrl"]) {
    console.log("User provided a website:", responses["websiteUrl"])
  }
  
  // Get all responses
  console.log(responses) // { websiteUrl: "...", industry: "...", ... }
  
  return <div>{/* Your JSX */}</div>
}
```

### In Completion Screen

```typescript
import { useOnboarding } from "../onboarding-context"

export function CompletionStep() {
  const { responses } = useOnboarding()
  
  return (
    <div>
      <h1>Welcome, {responses["brandName"]}!</h1>
      <p>Website: {responses["websiteUrl"] || "Not provided"}</p>
      <p>Industry: {responses["industry"]}</p>
    </div>
  )
}
```

### Updating Responses

```typescript
const { updateResponse } = useOnboarding()

// Save a response
updateResponse("questionId", "user's answer")

// Save empty value (when skipping)
updateResponse("questionId", "")
```

### Debug Dialog

Click the bug icon (top right) to view all collected responses in real-time. This is useful for:
- Testing the flow
- Verifying data is saved correctly
- Copying JSON for API testing

### Response Data Structure

```typescript
// Example responses object:
{
  "websiteUrl": "https://example.com",
  "brandName": "Acme Corp",
  "brandColor": "#00bfa5",
  "industry": "Northeast",
  "targetAudience": "retail",
  "brandDescription": "We sell quality products..."
}
```

### Common Use Cases

**1. Conditional Rendering Based on Responses**
```typescript
const { responses } = useOnboarding()

{responses["websiteUrl"] ? (
  <p>We found your website: {responses["websiteUrl"]}</p>
) : (
  <p>No website provided</p>
)}
```

**2. Pre-filling Forms**
```typescript
const { responses } = useOnboarding()
const [value, setValue] = useState(responses["questionId"] || "")
```

**3. Sending to API**
```typescript
const { responses } = useOnboarding()

const handleSubmit = async () => {
  await fetch("/api/onboarding", {
    method: "POST",
    body: JSON.stringify(responses),
  })
}
```

## Validation

### Built-in Validators
- `validateUrl` - URL format validation
- `validateEmail` - Email format validation

### Custom Validation
```typescript
const validateCustom = (value: string): string | null => {
  if (/* invalid */) {
    return "Error message"
  }
  return null
}

// In question config:
{
  validation: validateCustom,
}
```

## Tips

1. **Question Order**: Questions appear in array order
2. **IDs**: Use camelCase, must be unique
3. **Testing**: Use debug dialog (bug icon) to check responses
4. **Navigation**: Always set `nextScreen` except for the last question
5. **Required Fields**: Set `required: false` to show "Skip" button

## Common Patterns

### Optional Question with Skip
```typescript
{
  required: false,
  nextScreen: "nextQuestion",
  // Skip button appears automatically
}
```

### Last Question
```typescript
{
  id: "finalQuestion",
  // No nextScreen - automatically goes to completion
}
```

### Validation with Length
```typescript
{
  type: "text",
  required: true,
  minLength: 5,
  maxLength: 50,
}
```

## File Locations

- **Config**: `src/app/(home)/questions-config.ts`
- **Components**: `src/app/(home)/steps/`
- **Context**: `src/app/(home)/onboarding-context.tsx`
- **Main Page**: `src/app/(home)/page.tsx`
