import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { RAW_DATA_ONBOARDING_PROMPT } from '~/lib/constants';
import { mapAIResponseToProfileData } from '~/app/onboarding/tenent/utils';

// Allow processing up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // Parse request body
    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const { rawData } = body;

    // Validate required fields
    if (!rawData || !Array.isArray(rawData)) {
      return new Response(
        JSON.stringify({ error: 'Invalid rawData format - must be an array' }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key not configured');
      return new Response(
        JSON.stringify({ error: 'AI service temporarily unavailable' }), 
        { 
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Format the raw data for processing
    const formattedData = rawData.map((item, index) => `${index + 1}. ${item}`).join('\n');
    const prompt = `${RAW_DATA_ONBOARDING_PROMPT}\n\nUSER RESPONSES:\n${formattedData}`;

    try {
      // Generate response using OpenAI
      const { text } = await generateText({
        model: openai('gpt-4o-mini'),
        prompt: prompt,
        temperature: 0.1, // Low temperature for consistent extraction
      });

      // Try to parse the JSON response
      let profileData;
      try {
        // Clean up potential markdown code blocks (same logic as frontend)
        let cleanedText = text.trim();
        if (cleanedText.startsWith('```json')) {
          cleanedText = cleanedText
            .replace(/^```json\s*/, '')
            .replace(/\s*```$/, '');
        }

        // Try to extract JSON from the response
        const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error('No JSON object found in response');
        }

        const parsed = JSON.parse(jsonMatch[0]);
        const aiProfileData = parsed.tenantProfile || parsed.profileData || parsed;
        
        // Map AI response to database format
        profileData = mapAIResponseToProfileData(aiProfileData);
      } catch (jsonError) {
        console.error('Failed to parse AI response as JSON:', jsonError);
        console.error('AI response:', text);
        return new Response(
          JSON.stringify({ error: 'Failed to process data - invalid AI response format' }), 
          { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      // Return the extracted profile data
      return new Response(
        JSON.stringify({ profileData }), 
        { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );

    } catch (aiError) {
      console.error('OpenAI API error:', aiError);
      return new Response(
        JSON.stringify({ error: 'AI processing failed. Please try again.' }), 
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

  } catch (error) {
    console.error('Unexpected error in process-raw route:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}