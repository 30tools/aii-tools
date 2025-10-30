'use server';

import { generateText } from 'ai';
import { openai } from '@/lib/ai';

export async function generateHashtags(description: string, platform: 'instagram' | 'twitter' | 'linkedin' | 'tiktok' = 'instagram') {
  try {
    const platformLimits: Record<string, number> = {
      instagram: 30,
      twitter: 2,
      linkedin: 5,
      tiktok: 5
    };

    const maxHashtags = platformLimits[platform] || 5;

    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Generate ${maxHashtags} relevant hashtags for: ${description}

Platform: ${platform}

Requirements:
- Create hashtags that are popular and relevant to the content
- Include a mix of broad and specific tags
- Consider trending topics if applicable
- Make sure they're appropriate for the platform
- Separate each hashtag with a space
- Focus on hashtags that will increase discoverability

Return only the hashtags separated by spaces.`,
    });

    const hashtags = result.split(' ').map(tag => tag.trim()).filter(tag => tag.length > 0);
    return { success: true, result: hashtags };
  } catch (error) {
    console.error('Error generating hashtags:', error);
    return { success: false, error: 'Failed to generate hashtags' };
  }
}

export async function generateSocialPost(content: string, platform: 'instagram' | 'twitter' | 'linkedin' | 'facebook' = 'instagram') {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Create a social media post for ${platform} about: ${content}

Requirements:
- Match the tone to the platform (casual for Instagram/TikTok, professional for LinkedIn, concise for Twitter)
- Include relevant emojis where appropriate
- Add a call-to-action if relevant
- Consider optimal length for the platform
- Include relevant hashtags if appropriate

Return the complete social media post.`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error generating social post:', error);
    return { success: false, error: 'Failed to generate social post' };
  }
}

export async function analyzeEngagement(postText: string) {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Analyze the potential engagement of this social media post: ${postText}

Requirements:
- Assess the likely engagement level (high, medium, low)
- Identify elements that could boost engagement
- Suggest improvements for better engagement
- Consider emotional appeal
- Consider visual elements if applicable
- Note any potential issues

Return the engagement analysis.`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error analyzing engagement:', error);
    return { success: false, error: 'Failed to analyze engagement' };
  }
}

export async function generateContentCalendar(brand: string, theme: string, count: number = 7) {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Generate a ${count}-day content calendar for ${brand} focused on ${theme}

Requirements:
- Include a different post idea for each day
- Vary the content types (educational, promotional, user-generated, behind-the-scenes, etc.)
- Include relevant hashtags for each post
- Consider special days/holidays if applicable
- Ensure content aligns with the brand voice
- Suggest optimal posting times if platform-specific

Return the content calendar with daily post ideas.`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error generating content calendar:', error);
    return { success: false, error: 'Failed to generate content calendar' };
  }
}

export async function generateInfluencerOutreach(brand: string, influencer: string) {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Generate an influencer outreach message for ${brand} to ${influencer}

Requirements:
- Professional but personable tone
- Mention why their content resonates with the brand
- Describe the collaboration opportunity
- Keep it concise and clear
- Include value proposition for the influencer
- End with a clear call-to-action

Return the complete outreach message.`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error generating influencer outreach:', error);
    return { success: false, error: 'Failed to generate influencer outreach' };
  }
}