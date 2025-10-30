'use server';

import { generateText } from 'ai';
import { openai } from '@/lib/ai';

export async function explainCode(code: string, language: string = 'auto'): Promise<{ success: true; result: string } | { success: false; error: string }> {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Explain this ${language !== 'auto' ? language : ''} code in simple terms:

\`\`\`${language !== 'auto' ? language : ''}
${code}
\`\`\`

Provide:
- Overall purpose of the code
- Line-by-line explanation for complex parts
- Key concepts and terminology
- What the code accomplishes
- Any potential improvements or issues

Explain it so a beginner can understand.`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error explaining code:', error);
    return { success: false, error: 'Failed to explain code' };
  }
}

export async function generateRegex(description: string): Promise<{ success: true; result: { pattern: string; explanation: string; examples: string[] } } | { success: false; error: string }> {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Create a regular expression for: "${description}"

Provide the response in this JSON format:
{
  "pattern": "the regex pattern",
  "explanation": "detailed explanation of the pattern",
  "examples": ["example1", "example2", "example3"]
}

Make sure the regex is:
- Accurate and tested
- Well-explained
- Includes practical examples`,
    });

    try {
      const parsed = JSON.parse(result);
      return { success: true, result: parsed };
    } catch {
      // Fallback parsing
      const lines = result.split('\n');
      const pattern = lines.find(line => line.includes('pattern'))?.split(':')[1]?.trim().replace(/[",]/g, '') || '';
      const explanation = lines.find(line => line.includes('explanation'))?.split(':')[1]?.trim().replace(/[",]/g, '') || '';
      const examples = ['test@example.com', 'user123@domain.org'];
      
      return { success: true, result: { pattern, explanation, examples } };
    }
  } catch (error) {
    console.error('Error generating regex:', error);
    return { success: false, error: 'Failed to generate regex' };
  }
}

export async function generateCommitMessage(diff: string): Promise<{ success: true; result: string } | { success: false; error: string }> {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Generate a clean git commit message for these changes:

${diff}

Follow conventional commit format:
- Start with type: feat, fix, docs, style, refactor, test, chore
- Keep the summary under 50 characters
- Use imperative mood
- Be specific but concise

Examples:
- feat: add user authentication system
- fix: resolve memory leak in data processor
- docs: update API documentation

Return only the commit message.`,
    });

    return { success: true, result: result.trim() };
  } catch (error) {
    console.error('Error generating commit message:', error);
    return { success: false, error: 'Failed to generate commit message' };
  }
}

export async function generateSQLQuery(description: string, database: string = 'mysql'): Promise<{ success: true; result: string } | { success: false; error: string }> {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Generate a ${database} SQL query for: "${description}"

Requirements:
- Use proper ${database} syntax
- Include comments explaining complex parts
- Follow best practices
- Make it readable and efficient
- Handle common edge cases

Return only the SQL query with comments.`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error generating SQL query:', error);
    return { success: false, error: 'Failed to generate SQL query' };
  }
}

export async function debugCode(code: string, error: string, language: string): Promise<{ success: true; result: string } | { success: false; error: string }> {
  try {
    const { text: result } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `Debug this ${language} code that's producing the error: "${error}"

Code:
\`\`\`${language}
${code}
\`\`\`

Provide:
- Explanation of what's causing the error
- Step-by-step solution
- Corrected code
- Best practices to prevent similar issues
- Alternative approaches if applicable`,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error debugging code:', error);
    return { success: false, error: 'Failed to debug code' };
  }
}