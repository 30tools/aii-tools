'use server';

import { generateText } from 'ai';
import { openai } from '@/lib/ai';

export async function generateStartupIdeas(keyword: string, count: number = 5): Promise<{ success: true; result: string[] } | { success: false; error: string }> {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Generate ${count} innovative startup ideas around "${keyword}". Each idea should:
- Be unique and feasible
- Address a real market need
- Include a brief description (2-3 sentences)
- Consider current market trends
- Be separated by "---"

Format: Company Name: Brief description and market opportunity

Return only the startup ideas separated by "---".`,
    });

    const ideas = result.split('---').map(idea => idea.trim()).filter(idea => idea.length > 0);
    return { success: true, result: ideas };
  } catch (error) {
    console.error('Error generating startup ideas:', error);
    return { success: false, error: 'Failed to generate startup ideas' };
  }
}

export async function generateVideoScript(topic: string, duration: 'short' | 'medium' | 'long' = 'medium'): Promise<{ success: true; result: string } | { success: false; error: string }> {
  try {
    const durationInstructions = {
      short: 'a 30-60 second YouTube Shorts/TikTok script',
      medium: 'a 3-5 minute YouTube video script',
      long: 'a 10-15 minute detailed video script'
    };

    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Create ${durationInstructions[duration]} about "${topic}".

Structure:
- Hook (first 5 seconds)
- Introduction
- Main content points
- Call-to-action
- Outro

Requirements:
- Engaging and conversational tone
- Include timing cues
- Add notes for visuals/graphics
- Optimize for viewer retention
- Include strong hook and CTA

Return the complete script with timing and visual notes.`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error generating video script:', error);
    return { success: false, error: 'Failed to generate video script' };
  }
}

export async function generateAppNames(description: string, count: number = 10): Promise<{ success: true; result: string[] } | { success: false; error: string }> {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Generate ${count} creative app names for: ${description}

Requirements:
- Short and memorable (1-2 words)
- Easy to pronounce and spell
- Available as domain potential
- Brandable and unique
- Relevant to the app concept
- Modern and catchy
- Separate each name with "---"

Return only the app names separated by "---".`,
    });

    const names = result.split('---').map(name => name.trim()).filter(name => name.length > 0);
    return { success: true, result: names };
  } catch (error) {
    console.error('Error generating app names:', error);
    return { success: false, error: 'Failed to generate app names' };
  }
}

export async function generateSlogans(brand: string, industry: string, count: number = 5): Promise<{ success: true; result: string[] } | { success: false; error: string }> {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Create ${count} memorable slogans for "${brand}" in the ${industry} industry.

Requirements:
- Short and catchy (2-7 words)
- Memorable and easy to recall
- Reflects brand values
- Industry appropriate
- Emotionally engaging
- Unique and differentiating
- Separate each slogan with "---"

Return only the slogans separated by "---".`,
    });

    const slogans = result.split('---').map(slogan => slogan.trim()).filter(slogan => slogan.length > 0);
    return { success: true, result: slogans };
  } catch (error) {
    console.error('Error generating slogans:', error);
    return { success: false, error: 'Failed to generate slogans' };
  }
}

export async function brainstormIdeas(theme: string, type: string = 'general'): Promise<{ success: true; result: string[] } | { success: false; error: string }> {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Brainstorm creative ideas for "${theme}" in the context of ${type}.

Generate 10 diverse and innovative ideas that:
- Think outside the box
- Are actionable and practical
- Cover different approaches/angles
- Spark further creativity
- Range from simple to complex
- Separate each idea with "---"

Return only the ideas separated by "---".`,
    });

    const ideas = result.split('---').map(idea => idea.trim()).filter(idea => idea.length > 0);
    return { success: true, result: ideas };
  } catch (error) {
    console.error('Error brainstorming ideas:', error);
    return { success: false, error: 'Failed to brainstorm ideas' };
  }
}