/**
 * Comprehensive FAQs for all tools
 * Each tool should have 10-15 keyword-rich questions and answers
 */

export interface ToolFAQ {
    question: string;
    answer: string;
}

export const toolFAQs: Record<string, ToolFAQ[]> = {
    'tweet-generator': [
        {
            question: 'How does the AI tweet generator work?',
            answer: 'Our AI tweet generator uses advanced natural language processing to create engaging tweets from any topic. Simply enter your topic or idea, and the AI will generate multiple tweet variations optimized for engagement, with relevant hashtags and proper character count.',
        },
        {
            question: 'Is the tweet generator really free?',
            answer: 'Yes! Our tweet generator is 100% free with no signup required. You can generate unlimited tweets without any hidden costs or subscription fees.',
        },
        {
            question: 'Can I generate multiple tweet variations?',
            answer: 'Absolutely! The tool generates 3-5 different tweet variations for each topic, giving you multiple options to choose from. Each variation has a unique style and approach to maximize engagement.',
        },
        {
            question: 'Does it include hashtags automatically?',
            answer: 'Yes, our AI automatically suggests relevant and trending hashtags for each tweet. The hashtags are strategically selected to increase discoverability and engagement on Twitter.',
        },
        {
            question: 'What makes a good tweet according to this AI?',
            answer: 'The AI is trained on high-performing tweets and considers factors like clarity, emotional appeal, call-to-action, proper length (under 280 characters), and relevant hashtags to create tweets with maximum engagement potential.',
        },
        {
            question: 'Can I use this for business or personal accounts?',
            answer: 'Yes! The tweet generator works great for both personal and business Twitter accounts. You can specify the tone (professional, casual, funny) to match your brand voice.',
        },
        {
            question: 'Does it check character count?',
            answer: 'Yes, all generated tweets are automatically checked to ensure they stay within Twitter\'s 280-character limit, including hashtags and spaces.',
        },
        {
            question: 'How do I make my tweets go viral?',
            answer: 'While we can\'t guarantee virality, our AI uses proven engagement techniques: creating curiosity, using emotional triggers, including relevant hashtags, and crafting compelling calls-to-action. Combine this with posting at optimal times and engaging with your audience.',
        },
        {
            question: 'Can I edit the generated tweets?',
            answer: 'Absolutely! The generated tweets are meant to be a starting point. You can copy any tweet and edit it to perfectly match your style and message before posting.',
        },
        {
            question: 'Does this work for Twitter threads too?',
            answer: 'While this tool focuses on single tweets, you can use it multiple times to generate different tweets for a thread. Each generated tweet can serve as a thread component.',
        },
    ],

    'logo-maker': [
        {
            question: 'How does the AI logo maker generate logos?',
            answer: 'Our AI logo maker uses Pollinations AI, a powerful free image generation engine, to create professional logos from text descriptions. Simply describe your brand, industry, and style preferences, and the AI will generate unique logo designs instantly.',
        },
        {
            question: 'Is the logo maker completely free?',
            answer: 'Yes! This tool is 100% free with no signup required. We use Pollinations AI which provides free image generation, so you can create unlimited logos without any costs.',
        },
        {
            question: 'Can I download the generated logo?',
            answer: 'Yes, you can download any generated logo in high resolution. The logos are generated at 512x512 pixels by default, perfect for most use cases including social media profiles and websites.',
        },
        {
            question: 'What image format are the logos in?',
            answer: 'The logos are generated as PNG images with transparency support where applicable. This format is widely compatible and perfect for web and print use.',
        },
        {
            question: 'Can I generate multiple logo variations?',
            answer: 'Absolutely! You can generate as many variations as you need. Simply adjust your description or regenerate to get different design options for your brand.',
        },
        {
            question: 'What style of logos can it create?',
            answer: 'The AI can create various logo styles including minimalist, modern, vintage, abstract, mascot, geometric, and more. Just describe your preferred style in your prompt for best results.',
        },
        {
            question: 'Do I own the copyright to generated logos?',
            answer: 'Yes, logos generated using our tool and Pollinations AI are yours to use commercially. However, we recommend reviewing the images and potentially trademarking your final logo choice.',
        },
        {
            question: 'How detailed should my logo description be?',
            answer: 'The more detailed, the better! Include: your brand name, industry, preferred colors, style (modern, vintage, etc.), and any specific elements you want (symbols, shapes, etc.). For example: "Modern tech startup logo for CloudSync, blue and white colors, cloud symbol, minimalist"',
        },
        {
            question: 'Can I request specific colors in my logo?',
            answer: 'Yes! Include your preferred colors in your description. For best results, mention 1-3 specific colors like "navy blue and gold" or "emerald green and white".',
        },
        {
            question: 'What if I don\'t like the generated logo?',
            answer: 'Simply regenerate with a revised description! Try adjusting your prompt by adding more details, changing the style keywords, or specifying different elements. Each generation is unique.',
        },
    ],

    'ai-paraphraser': [
        {
            question: 'What is an AI paraphraser?',
            answer: 'An AI paraphraser is a tool that uses artificial intelligence to rewrite text while maintaining its original meaning. Our paraphraser can adjust tone (formal, casual, funny) and create multiple variations of your content.',
        },
        {
            question: 'Is this paraphrasing tool free?',
            answer: 'Yes! Our AI paraphraser is completely free with no signup required. You can paraphrase unlimited text without any restrictions or hidden fees.',
        },
        {
            question: 'What tone options are available?',
            answer: 'You can choose from formal (professional writing), casual (conversational style), or funny (humorous tone). Each tone transforms your text differently while preserving the core message.',
        },
        {
            question: 'How is this different from a thesaurus?',
            answer: 'Unlike a thesaurus that only suggests synonyms, our AI paraphraser understands context and rewrites entire sentences and paragraphs while maintaining meaning, improving flow, and adjusting tone as needed.',
        },
        {
            question: 'Can it help avoid plagiarism?',
            answer: 'Yes! The paraphraser creates unique versions of text, which can help you avoid plagiarism when used ethically. However, always cite original sources and use paraphrasing as part of your own analysis and writing.',
        },
        {
            question: 'What is the character limit?',
            answer: 'You can paraphrase up to 5,000 characters at once, which is approximately 700-800 words. For longer texts, simply break them into sections.',
        },
        {
            question: 'Does it work for academic writing?',
            answer: 'Yes! The formal tone option is perfect for academic writing. It helps rephrase research content, rewrite thesis statements, and improve essay clarity while maintaining an academic tone.',
        },
        {
            question: 'Can I paraphrase in different languages?',
            answer: 'Currently, our paraphraser works best with English text. However, the AI can handle some multilingual content. For best results, use English input.',
        },
        {
            question: 'How many variations can I generate?',
            answer: 'You can generate unlimited variations! Each time you paraphrase, you get a new unique version. Try different tones to see various interpretations of your text.',
        },
        {
            question: 'Is the paraphrased text grammatically correct?',
            answer: 'Yes! Our AI ensures all paraphrased text is grammatically correct and naturally flowing. It doesn\'t just swap words but restructures sentences for better readability.',
        },
    ],

    // Add more tool FAQs as we implement each tool
    // This is a template - we'll expand this as we optimize each tool
};

/**
 * Get FAQs for a specific tool
 */
export function getToolFAQs(toolId: string): ToolFAQ[] {
    return toolFAQs[toolId] || [];
}

/**
 * Check if a tool has FAQs
 */
export function hasToolFAQs(toolId: string): boolean {
    return toolId in toolFAQs && toolFAQs[toolId].length > 0;
}
