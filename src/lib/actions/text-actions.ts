'use server';

import { generateText } from 'ai';
import { openai } from '@/lib/ai';

export async function summarizeText(text: string, length: 'short' | 'medium' | 'long' = 'medium'): Promise<{ success: true; result: string } | { success: false; error: string }> {
  try {
    const lengthInstructions = {
      short: 'in 1-2 sentences',
      medium: 'in 3-5 sentences', 
      long: 'in 1-2 paragraphs'
    };

    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Summarize the following text ${lengthInstructions[length]}:

${text}

Requirements:
- Capture the main points and key information
- Keep it ${length} and concise
- Maintain the original meaning
- Use clear, simple language
- Return only the summary without quotes or explanations`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error summarizing text:', error);
    return { success: false, error: 'Failed to summarize text' };
  }
}

export async function expandText(text: string): Promise<{ success: true; result: string } | { success: false; error: string }> {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Expand the following text into a more detailed and comprehensive version:

${text}

Requirements:
- Add relevant details and context
- Maintain the original meaning and tone
- Make it more informative and engaging
- Use natural, flowing language
- Expand to 2-3x the original length
- Return only the expanded text`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error expanding text:', error);
    return { success: false, error: 'Failed to expand text' };
  }
}

export async function simplifyText(text: string): Promise<{ success: true; result: string } | { success: false; error: string }> {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Simplify the following text to make it easier to understand:

${text}

Requirements:
- Use simple, everyday language
- Break down complex concepts
- Remove jargon and technical terms
- Keep the same meaning but make it accessible
- Target a 5th-grade reading level
- Return only the simplified text`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error simplifying text:', error);
    return { success: false, error: 'Failed to simplify text' };
  }
}

export async function correctGrammar(text: string): Promise<{ success: true; result: string } | { success: false; error: string }> {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Correct the grammar and improve the writing quality of the following text:

${text}

Requirements:
- Fix all grammatical errors
- Improve sentence structure and flow
- Maintain the original meaning and tone
- Make it more professional and polished
- Ensure proper punctuation and capitalization
- Return only the corrected text`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error correcting grammar:', error);
    return { success: false, error: 'Failed to correct grammar' };
  }
}

export async function optimizeAdCopy(adCopy: string, platform: 'facebook' | 'google' | 'linkedin' = 'facebook'): Promise<{ success: true; result: string } | { success: false; error: string }> {
  try {
    const platformInstructions = {
      facebook: 'Facebook ads with emotional appeal and social proof',
      google: 'Google ads with clear value proposition and call-to-action',
      linkedin: 'LinkedIn ads with professional tone and business benefits'
    };

    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Optimize the following ad copy for ${platformInstructions[platform]}:

${adCopy}

Requirements:
- Increase click-through rate and engagement
- Include compelling headlines and descriptions
- Add strong call-to-action
- Optimize for ${platform} audience
- Make it more persuasive and conversion-focused
- Keep it concise and impactful
- Return only the optimized ad copy`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error optimizing ad copy:', error);
    return { success: false, error: 'Failed to optimize ad copy' };
  }
}

export async function generateSEOMeta(content: string): Promise<{ success: true; result: { title: string; description: string } } | { success: false; error: string }> {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Generate SEO-optimized title and meta description for the following content:

${content}

Requirements:
- Title: Under 60 characters, include primary keyword, compelling
- Description: 150-160 characters, include keywords, enticing
- Focus on search engine optimization
- Make them click-worthy and relevant
- Format as JSON: {"title": "...", "description": "..."}`,
    });

    try {
      const parsed = JSON.parse(result);
      return { success: true, result: parsed };
    } catch {
      // Fallback if JSON parsing fails
      const lines = result.split('\n').filter(line => line.trim());
      const title = lines.find(line => line.includes('title') || line.includes('Title'))?.replace(/.*[:"]\s*/, '').replace(/[",].*/, '') || '';
      const description = lines.find(line => line.includes('description') || line.includes('Description'))?.replace(/.*[:"]\s*/, '').replace(/[",].*/, '') || '';
      
      return { success: true, result: { title, description } };
    }
  } catch (error) {
    console.error('Error generating SEO meta:', error);
    return { success: false, error: 'Failed to generate SEO meta tags' };
  }
}