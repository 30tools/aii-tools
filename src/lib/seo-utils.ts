/**
 * SEO Utilities for generating optimized metadata and schema markup
 * Following Google & Bing 2025 best practices
 */

import { Metadata } from 'next';

export interface ToolSEOConfig {
    id: string;
    title: string;
    shortTitle?: string;
    description: string;
    category: string;
    url: string;
    keywords: string[];
    features: string[];
    useCases?: string[];
    rating?: {
        value: number;
        count: number;
    };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-tools.30tools.com';
const SITE_NAME = '30tools AI Tools';

/**
 * Generate optimized metadata for a tool page
 * Follows SEO best practices:
 * - Title < 60 chars with primary keyword at start
 * - Description 150-160 chars with keywords
 * - Comprehensive OG and Twitter tags
 */
export function generateToolMetadata(config: ToolSEOConfig): Metadata {
    const title = optimizeTitle(config.title, config.shortTitle);
    const description = optimizeDescription(config.description, config.keywords);
    const fullUrl = `${SITE_URL}${config.url}`;

    return {
        title,
        description,
        keywords: config.keywords,
        authors: [{ name: SITE_NAME }],
        creator: SITE_NAME,
        publisher: SITE_NAME,
        alternates: {
            canonical: fullUrl,
        },
        openGraph: {
            title: `${config.title} | Free AI Tool`,
            description,
            url: fullUrl,
            siteName: SITE_NAME,
            locale: 'en_US',
            type: 'website',
            images: [
                {
                    url: `${SITE_URL}/og-image.jpg`,
                    width: 1200,
                    height: 630,
                    alt: config.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${config.title} - Free AI Tool`,
            description,
            images: [`${SITE_URL}/og-image.jpg`],
            creator: '@30tools',
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        verification: {
            google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
            other: {
                'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
            },
        },
    };
}

/**
 * Optimize title to be under 60 characters with keyword at start
 */
export function optimizeTitle(title: string, shortTitle?: string): string {
    const suffix = ` | ${SITE_NAME}`;
    const targetLength = 60 - suffix.length;

    const baseTitle = shortTitle || title;

    if (baseTitle.length + suffix.length <= 60) {
        return `${baseTitle}${suffix}`;
    }

    // Truncate and add ellipsis if needed
    return `${baseTitle.substring(0, targetLength - 3)}...${suffix}`;
}

/**
 * Optimize description to be 150-160 characters with keywords
 */
export function optimizeDescription(description: string, keywords: string[]): string {
    const minLength = 150;
    const maxLength = 160;

    let optimized = description;

    // Add call to action if space available
    const cta = ' Try it free, no signup required.';
    if (optimized.length + cta.length <= maxLength) {
        optimized += cta;
    }

    // Ensure it's within range
    if (optimized.length > maxLength) {
        optimized = optimized.substring(0, maxLength - 3) + '...';
    }

    return optimized;
}

/**
 * Generate comprehensive JSON-LD schema for a tool
 * Includes WebApplication, FAQPage, HowTo, and Breadcrumbs
 */
export function generateToolSchema(
    config: ToolSEOConfig,
    faqs: Array<{ question: string; answer: string }>,
    howToSteps?: Array<{ name: string; text: string }>
) {
    const fullUrl = `${SITE_URL}${config.url}`;

    const schemas: any[] = [
        // WebApplication Schema
        {
            '@type': 'WebApplication',
            name: config.title,
            description: config.description,
            url: fullUrl,
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Web Browser',
            offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
            },
            ...(config.rating && {
                aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: config.rating.value.toString(),
                    ratingCount: config.rating.count.toString(),
                    bestRating: '5',
                    worstRating: '1',
                },
            }),
            featureList: config.features,
        },

        // Breadcrumb Schema
        generateBreadcrumbSchema(config.url, config.category, config.title),
    ];

    // Add FAQ Schema if FAQs provided
    if (faqs && faqs.length > 0) {
        schemas.push(generateFAQSchema(faqs));
    }

    // Add HowTo Schema if steps provided
    if (howToSteps && howToSteps.length > 0) {
        schemas.push({
            '@type': 'HowTo',
            name: `How to use ${config.title}`,
            description: `Step-by-step guide to using ${config.title}`,
            step: howToSteps.map((step, index) => ({
                '@type': 'HowToStep',
                position: index + 1,
                name: step.name,
                text: step.text,
            })),
        });
    }

    return {
        '@context': 'https://schema.org',
        '@graph': schemas,
    };
}

/**
 * Generate FAQ schema markup
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
    return {
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(
    toolUrl: string,
    category: string,
    toolName: string
) {
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');

    return {
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                item: {
                    '@id': SITE_URL,
                    name: 'Home',
                },
            },
            {
                '@type': 'ListItem',
                position: 2,
                item: {
                    '@id': `${SITE_URL}/categories/${categorySlug}`,
                    name: category,
                },
            },
            {
                '@type': 'ListItem',
                position: 3,
                item: {
                    '@id': `${SITE_URL}${toolUrl}`,
                    name: toolName,
                },
            },
        ],
    };
}

/**
 * Generate Organization schema (for global use in layout)
 */
export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        description: 'Free AI tools for writing, design, development, and more. No signup required.',
        sameAs: [
            'https://twitter.com/30tools',
            // Add other social media URLs
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            url: `${SITE_URL}/contact`,
            availableLanguage: ['English'],
        },
    };
}

/**
 * Generate default how-to steps for a tool
 */
export function generateDefaultHowToSteps(toolName: string) {
    return [
        {
            name: 'Enter Your Input',
            text: `Type or paste your content into the ${toolName} input field.`,
        },
        {
            name: 'Configure Options',
            text: 'Select any available options or settings to customize the output.',
        },
        {
            name: 'Generate Result',
            text: 'Click the generate button to create your AI-powered result.',
        },
        {
            name: 'Copy or Download',
            text: 'Copy the result to your clipboard or download it for later use.',
        },
    ];
}
