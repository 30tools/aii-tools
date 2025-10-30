'use server';

import { generateText } from 'ai';
import { openai } from '@/lib/ai';

export async function paraphraseText(text: string, tone: 'formal' | 'casual' | 'funny' = 'casual'): Promise<{ success: true; result: string } | { success: false; error: string }> {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Rewrite the following text in a ${tone} tone while maintaining the original meaning:

${text}

Requirements:
- Keep the same meaning and key information
- Adjust the tone to be ${tone}
- Make it natural and engaging
- Return only the rewritten text without quotes or explanations`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error paraphrasing text:', error);
    return { success: false, error: 'Failed to paraphrase text' };
  }
}

export async function generateTweets(topic: string, count: number = 3) {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Generate ${count} engaging tweets about "${topic}". Each tweet should:
- Be under 280 characters
- Include relevant hashtags
- Be engaging and shareable
- Have a clear call-to-action or hook
- Be separated by "---"

Format: Just return the tweets separated by "---" without numbering or extra text.`,
    });

    const tweets = result.split('---').map(tweet => tweet.trim()).filter(tweet => tweet.length > 0);
    return { success: true, result: tweets };
  } catch (error) {
    console.error('Error generating tweets:', error);
    return { success: false, error: 'Failed to generate tweets' };
  }
}

export async function formatLinkedInPost(content: string) {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Format the following content into a professional LinkedIn post:

${content}

Requirements:
- Add appropriate emojis
- Structure with proper spacing and bullet points
- Include relevant professional hashtags
- Make it engaging for LinkedIn audience
- Keep it professional but approachable
- Add a clear call-to-action at the end

Return only the formatted post.`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error formatting LinkedIn post:', error);
    return { success: false, error: 'Failed to format LinkedIn post' };
  }
}

export async function rewriteEmail(email: string, style: 'polite' | 'persuasive' | 'concise' = 'polite') {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Rewrite the following email to be more ${style}:

${email}

Requirements:
- Maintain the original intent and key information
- Make it ${style === 'polite' ? 'more courteous and respectful' : style === 'persuasive' ? 'more convincing and compelling' : 'shorter and more direct'}
- Use professional language
- Keep the same structure (greeting, body, closing)
- Return only the rewritten email`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error rewriting email:', error);
    return { success: false, error: 'Failed to rewrite email' };
  }
}

export async function generateInstagramCaption(description: string) {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Create an engaging Instagram caption for: ${description}

Requirements:
- Start with a hook to grab attention
- Include relevant emojis throughout
- Add 5-10 relevant hashtags at the end
- Keep it engaging and authentic
- Include a call-to-action
- Make it Instagram-friendly with good spacing

Return only the caption with hashtags.`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error generating Instagram caption:', error);
    return { success: false, error: 'Failed to generate Instagram caption' };
  }
}

export async function generateColdDM(context: string, platform: 'twitter' | 'linkedin' = 'linkedin') {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Create a cold outreach message for ${platform} based on this context: ${context}

Requirements:
- Be personalized and specific
- ${platform === 'linkedin' ? 'Professional tone suitable for LinkedIn' : 'Casual but respectful tone for Twitter'}
- Include a clear value proposition
- Keep it brief (under 150 words)
- End with a soft call-to-action
- Avoid being salesy or pushy

Return only the message.`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error generating cold DM:', error);
    return { success: false, error: 'Failed to generate cold DM' };
  }
}

export async function generateProductDescription(productName: string, features: string) {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Create a compelling product description for "${productName}" with these features: ${features}

Requirements:
- Start with a compelling headline
- Highlight key benefits, not just features
- Use persuasive language
- Include emotional appeal
- End with a clear call-to-action
- Make it SEO-friendly
- Keep it concise but compelling (150-200 words)

Return only the product description.`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error generating product description:', error);
    return { success: false, error: 'Failed to generate product description' };
  }
}

export async function generateHeadlines(content: string, count: number = 5) {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Generate ${count} catchy headlines for this content: ${content}

Requirements:
- Make them click-worthy and engaging
- Include power words and emotional triggers
- Keep them under 60 characters for SEO
- Make them specific and benefit-focused
- Vary the style (question, list, how-to, etc.)
- Separate each headline with "---"

Return only the headlines separated by "---".`,
    });

    const headlines = result.split('---').map(headline => headline.trim()).filter(headline => headline.length > 0);
    return { success: true, result: headlines };
  } catch (error) {
    console.error('Error generating headlines:', error);
    return { success: false, error: 'Failed to generate headlines' };
  }
}