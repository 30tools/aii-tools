'use server';

import { generateText } from 'ai';
import { openai } from '@/lib/ai';

export async function generateLogo(description: string) {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Create a detailed logo concept based on this description: ${description}

Requirements:
- Describe the visual elements and composition
- Include color scheme recommendations
- Suggest typography styles if applicable
- Consider the brand message to convey
- Recommend suitable file formats
- Provide design rationale

Return the complete logo concept description.`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error generating logo:', error);
    return { success: false, error: 'Failed to generate logo concept' };
  }
}

export async function generateColorPalette(theme: string) {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Generate a harmonious color palette for: ${theme}

Requirements:
- Include 5-7 colors that work well together
- Provide HEX codes for each color
- Describe the mood/emotion each color evokes
- Suggest which colors work best for backgrounds, text, accents
- Consider accessibility and contrast ratios
- Name the color palette

Return the color palette with names and HEX codes.`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error generating color palette:', error);
    return { success: false, error: 'Failed to generate color palette' };
  }
}

export async function generateFavicon(description: string) {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Generate a favicon concept for: ${description}

Requirements:
- Describe the simple, iconic design that works at 16x16 pixels
- Focus on high contrast and recognizability
- Consider simplicity and brand representation
- Suggest color scheme suitable for favicon
- Recommend format (PNG, ICO)
- Provide implementation guidance

Return the favicon concept description.`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error generating favicon:', error);
    return { success: false, error: 'Failed to generate favicon concept' };
  }
}

export async function generateFontPairing(description: string) {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Generate a harmonious font pairing for: ${description}

Requirements:
- Suggest one font for headings/titles
- Suggest one font for body text
- Explain why the pairing works well
- Consider readability and brand alignment
- Suggest web-safe alternatives
- Include considerations for accessibility

Return the font pairing recommendation with explanations.`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error generating font pairing:', error);
    return { success: false, error: 'Failed to generate font pairing' };
  }
}

export async function generateMockup(description: string) {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Generate a mockup concept for: ${description}

Requirements:
- Describe the layout and composition
- Suggest appropriate device frames (phone, tablet, desktop)
- Include background and styling suggestions
- Consider user interface elements
- Recommend placement of key elements
- Suggest color scheme and typography

Return the complete mockup concept description.`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error generating mockup:', error);
    return { success: false, error: 'Failed to generate mockup concept' };
  }
}