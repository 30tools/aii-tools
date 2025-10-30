'use server';

import { generateText } from 'ai';
import { openai } from '@/lib/ai';

export async function generateBusinessPlan(idea: string) {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Create a comprehensive business plan for: ${idea}

Structure the plan with these sections:
- Executive Summary
- Company Description
- Market Analysis
- Organization & Management
- Service or Product Line
- Marketing & Sales Strategy
- Funding Request
- Financial Projections
- Appendix

Requirements:
- Include realistic financial projections
- Consider market trends and competition
- Provide actionable strategies
- Make it professional and detailed
- Format with clear headings and subheadings

Return the complete business plan.`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error generating business plan:', error);
    return { success: false, error: 'Failed to generate business plan' };
  }
}

export async function generateEmailTemplate(context: string, purpose: string = 'professional') {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Create a professional email template for: ${context}

Purpose: ${purpose}

Requirements:
- Include appropriate greeting and closing
- Use professional tone
- Be concise and clear
- Include call-to-action if relevant
- Format with proper spacing

Return only the email template.`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error generating email template:', error);
    return { success: false, error: 'Failed to generate email template' };
  }
}

export async function generatePitchDeck(idea: string) {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Create a pitch deck outline for: ${idea}

Include slides for:
- Problem
- Solution
- Market Size
- Business Model
- Competition
- Marketing Strategy
- Financial Projections
- Team
- Ask

Requirements:
- Each slide should have key points
- Include compelling visuals suggestions
- Focus on investor appeal
- Keep it concise but comprehensive

Return the pitch deck outline.`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error generating pitch deck:', error);
    return { success: false, error: 'Failed to generate pitch deck' };
  }
}

export async function generateSalesPitch(product: string, target: string) {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Create a compelling sales pitch for ${product} targeting ${target}

Requirements:
- Hook to grab attention immediately
- Problem identification
- Solution presentation
- Social proof or testimonials
- Call-to-action
- Objection handling points
- Keep it conversational but persuasive

Return the complete sales pitch.`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error generating sales pitch:', error);
    return { success: false, error: 'Failed to generate sales pitch' };
  }
}

export async function generateBrandName(description: string) {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Generate 10 memorable brand names for: ${description}

Requirements:
- Short and memorable (1-2 words)
- Easy to pronounce and spell
- Available as domain potential
- Brandable and unique
- Relevant to the description
- Modern and catchy
- Separate each name with "---"

Return only the brand names separated by "---".`,
    });

    const names = result.split('---').map(name => name.trim()).filter(name => name.length > 0);
    return { success: true, result: names };
  } catch (error) {
    console.error('Error generating brand names:', error);
    return { success: false, error: 'Failed to generate brand names' };
  }
}