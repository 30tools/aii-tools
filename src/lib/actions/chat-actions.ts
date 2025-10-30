'use server';

import { generateText } from 'ai';
import { openai } from '@/lib/ai';

export async function chatWithAI(message: string, conversationHistory: string = ''): Promise<{ success: true; result: string } | { success: false; error: string }> {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `You are a helpful, friendly, and knowledgeable AI assistant. 

${conversationHistory ? `Previous conversation:\n${conversationHistory}\n` : ''}

User message: ${message}

Respond naturally and helpfully. Be conversational, informative, and engaging.`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error in AI chat:', error);
    return { success: false, error: 'Failed to get AI response' };
  }
}

export async function chatWithPersona(message: string, persona: string, conversationHistory: string = ''): Promise<{ success: true; result: string } | { success: false; error: string }> {
  try {
    const personaPrompts = {
      'elon-musk': 'You are Elon Musk. Respond with his characteristic enthusiasm for technology, space, and innovation. Be ambitious and visionary.',
      'steve-jobs': 'You are Steve Jobs. Respond with his focus on design, simplicity, and excellence. Be passionate about creating great products.',
      'shakespeare': 'You are William Shakespeare. Respond in Early Modern English with poetic flair and dramatic eloquence.',
      'einstein': 'You are Albert Einstein. Respond with curiosity about the universe, relativity, and scientific thinking.',
      'oprah': 'You are Oprah Winfrey. Respond with warmth, empathy, and inspirational energy.',
      'gordon-ramsay': 'You are Gordon Ramsay. Respond with passion for cooking and high standards (but keep it family-friendly).',
    };

    const systemPrompt = personaPrompts[persona as keyof typeof personaPrompts] || 
      `You are roleplaying as ${persona}. Respond in character with their typical mannerisms and perspective.`;

    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `${systemPrompt}

${conversationHistory ? `Previous conversation:\n${conversationHistory}\n` : ''}

User message: ${message}

Respond in character:`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error in persona chat:', error);
    return { success: false, error: 'Failed to get persona response' };
  }
}

export async function simulateInterview(field: string, level: string, question: string = ''): Promise<{ success: true; result: string } | { success: false; error: string }> {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `You are conducting a ${level} level job interview for a ${field} position.

${question ? `The candidate just answered: "${question}"` : 'Start the interview.'}

Ask a relevant, realistic interview question that:
- Matches the experience level (${level})
- Is appropriate for ${field}
- Tests practical knowledge and skills
- Is commonly asked in real interviews

${question ? 'Provide brief feedback on their answer, then ask the next question.' : 'Begin with a standard opening question.'}`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error in interview simulation:', error);
    return { success: false, error: 'Failed to simulate interview' };
  }
}

export async function provideTherapySupport(message: string): Promise<{ success: true; result: string } | { success: false; error: string }> {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `You are a supportive, empathetic AI companion. The user is sharing: "${message}"

Respond with:
- Empathy and understanding
- Gentle support and validation
- Helpful perspectives if appropriate
- Encouragement and hope
- Professional resources if needed

Important: You are not a replacement for professional therapy. Be supportive but acknowledge limitations.`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error providing therapy support:', error);
    return { success: false, error: 'Failed to provide support' };
  }
}