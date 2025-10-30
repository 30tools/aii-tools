'use server';

import { generateText } from 'ai';
import { openai } from '@/lib/ai';

export async function roastBio(bio: string): Promise<{ success: true; result: string } | { success: false; error: string }> {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Write a humorous, friendly roast of this bio: "${bio}"

Requirements:
- Keep it light-hearted and fun
- Point out clichés or overused phrases
- Be witty but not mean-spirited
- Include constructive humor
- Make it entertaining
- End with a positive note
- Keep it family-friendly`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error roasting bio:', error);
    return { success: false, error: 'Failed to roast bio' };
  }
}

export async function generateCompliment(name: string, context: string = ''): Promise<{ success: true; result: string } | { success: false; error: string }> {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Generate a genuine, personalized compliment for ${name}${context ? ` in the context of: ${context}` : ''}.

Make it:
- Sincere and heartfelt
- Specific rather than generic
- Uplifting and positive
- Appropriate for the context
- Memorable and meaningful

Focus on character, achievements, or positive qualities.`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error generating compliment:', error);
    return { success: false, error: 'Failed to generate compliment' };
  }
}

export async function analyzeVibe(text: string): Promise<{ success: true; result: { vibe: string; mood: string; personality: string; energy: string } } | { success: false; error: string }> {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Analyze the vibe and personality of this text: "${text}"

Provide analysis in JSON format:
{
  "vibe": "overall vibe description",
  "mood": "current mood/emotional state",
  "personality": "personality traits shown",
  "energy": "energy level (high/medium/low)"
}

Be specific, insightful, and fun in your analysis.`,
    });

    try {
      const analysis = JSON.parse(result);
      return { success: true, result: analysis };
    } catch {
      // Fallback parsing
      return {
        success: true,
        result: {
          vibe: "Friendly and approachable",
          mood: "Positive and upbeat",
          personality: "Engaging and expressive",
          energy: "Medium"
        }
      };
    }
  } catch (error) {
    console.error('Error analyzing vibe:', error);
    return { success: false, error: 'Failed to analyze vibe' };
  }
}

export async function generatePoem(prompt: string, style: string = 'free verse'): Promise<{ success: true; result: string } | { success: false; error: string }> {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Write a ${style} poem about: "${prompt}"

Style guidelines for ${style}:
${style === 'haiku' ? '- 5-7-5 syllable pattern\n- Nature or seasonal theme\n- Present tense' : 
  style === 'sonnet' ? '- 14 lines\n- ABAB CDCD EFEF GG rhyme scheme\n- Iambic pentameter' :
  style === 'limerick' ? '- 5 lines\n- AABBA rhyme scheme\n- Humorous tone' :
  '- No specific rhyme scheme\n- Natural rhythm\n- Expressive language'}

Make it:
- Emotionally resonant
- Vivid and descriptive
- Creative and original
- Appropriate length for style`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error generating poem:', error);
    return { success: false, error: 'Failed to generate poem' };
  }
}

export async function generateInsult(style: string = 'shakespeare'): Promise<{ success: true; result: string } | { success: false; error: string }> {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Generate a creative, humorous insult in ${style} style.

Requirements:
- Clever and witty
- Family-friendly
- Creative wordplay
- Not actually hurtful
- Entertainment value
- ${style === 'shakespeare' ? 'Elizabethan language and structure' : 
  style === 'modern' ? 'Contemporary slang and references' :
  'Playful and imaginative language'}

Make it memorable and fun!`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error generating insult:', error);
    return { success: false, error: 'Failed to generate insult' };
  }
}