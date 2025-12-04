'use server';

/**
 * Universal action generator for all tools
 * This creates appropriate prompts based on tool type and category
 * Uses Pollinations AI free API for text generation
 */

export async function generateUniversalToolOutput(
    toolId: string,
    toolTitle: string,
    toolDescription: string,
    toolCategory: string,
    userInput: string
) {
    try {
        console.log(`[${toolId}] Starting generation...`);
        const prompt = buildPrompt(toolId, toolTitle, toolDescription, toolCategory, userInput);
        console.log(`[${toolId}] Prompt length: ${prompt.length} characters`);

        // Use Pollinations AI free API
        const encodedPrompt = encodeURIComponent(prompt);
        const apiUrl = `https://text.pollinations.ai/${encodedPrompt}`;
        console.log(`[${toolId}] Calling Pollinations API...`);

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'text/plain',
            },
        });

        console.log(`[${toolId}] Response status: ${response.status}`);
        console.log(`[${toolId}] Response headers:`, Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
            throw new Error(`Pollinations API error: ${response.status} ${response.statusText}`);
        }

        const result = await response.text();
        console.log(`[${toolId}] Result length: ${result.length} characters`);
        console.log(`[${toolId}] Result preview:`, result.substring(0, 200));

        if (!result || result.trim().length === 0) {
            throw new Error('Empty response from Pollinations API');
        }

        console.log(`[${toolId}] Generation successful!`);
        return { success: true, result };
    } catch (error) {
        console.error(`[${toolId}] Error:`, error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to generate output'
        };
    }
}

function buildPrompt(
    toolId: string,
    toolTitle: string,
    toolDescription: string,
    toolCategory: string,
    userInput: string
): string {
    // Category-specific prompt templates
    const categoryPrompts: Record<string, string> = {
        writing: `You are an expert ${toolTitle}. ${toolDescription}

User input: ${userInput}

Generate high-quality output that is engaging, well-structured, and professional. Focus on clarity and impact.`,

        creativity: `You are a creative ${toolTitle}. ${toolDescription}

User input: ${userInput}

Generate innovative, unique, and inspiring ideas. Be creative and think outside the box while remaining practical.`,

        text: `You are a ${toolTitle} tool. ${toolDescription}

User input: ${userInput}

Process the text according to the tool's purpose. Maintain accuracy and clarity.`,

        chat: `You are a helpful ${toolTitle}. ${toolDescription}

User message: ${userInput}

Respond naturally, helpfully, and engagingly. Provide value in your response.`,

        developer: `You are an expert ${toolTitle}. ${toolDescription}

User request: ${userInput}

Provide accurate, well-formatted code or technical output. Include explanations where helpful.`,

        learning: `You are an educational ${toolTitle}. ${toolDescription}

Topic/Content: ${userInput}

Create educational content that is clear, structured, and easy to understand. Make learning engaging.`,

        fun: `You are a fun ${toolTitle}. ${toolDescription}

User input: ${userInput}

Create entertaining, engaging output while maintaining quality. Be creative and fun!`,

        business: `You are a professional ${toolTitle}. ${toolDescription}

Business need: ${userInput}

Generate professional, actionable business content. Focus on value and practicality.`,

        design: `You are a ${toolTitle} expert. ${toolDescription}

Design request: ${userInput}

Provide detailed design guidance, concepts, or descriptions. Be specific and professional.`,

        seo: `You are an SEO ${toolTitle}. ${toolDescription}

Input: ${userInput}

Generate SEO-optimized output following best practices. Focus on keywords, readability, and search performance.`,

        social: `You are a social media ${toolTitle}. ${toolDescription}

Content: ${userInput}

Create engaging social media content optimized for maximum engagement and reach.`,
    };

    // Use category-specific prompt or fallback to generic
    return categoryPrompts[toolCategory] || `You are a ${toolTitle}. ${toolDescription}

User input: ${userInput}

Generate appropriate output based on the tool's purpose.`;
}
