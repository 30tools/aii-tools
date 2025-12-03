/**
 * Pollinations AI Client Utility
 * Free, open-source AI API for image and text generation
 * No API keys required - can be called directly from frontend
 */

export interface PollinationsImageOptions {
    width?: number;
    height?: number;
    seed?: number;
    model?: 'flux' | 'turbo';
    nologo?: boolean;
    enhance?: boolean;
}

export interface PollinationsTextOptions {
    model?: 'openai' | 'mistral' | 'llama';
    seed?: number;
    temperature?: number;
}

/**
 * Generate an image URL from a text prompt using Pollinations AI
 * This URL can be used directly in img src or fetched for download
 * 
 * @param prompt - Text description of the image to generate
 * @param options - Optional parameters for image generation
 * @returns URL to the generated image
 * 
 * @example
 * const logoUrl = generateImageUrl("modern tech startup logo", { width: 512, height: 512 });
 * // Use in component: <img src={logoUrl} alt="Generated logo" />
 */
export function generateImageUrl(
    prompt: string,
    options: PollinationsImageOptions = {}
): string {
    const {
        width = 1024,
        height = 1024,
        seed,
        model = 'flux',
        nologo = true,
        enhance = false,
    } = options;

    const params = new URLSearchParams();
    params.set('width', width.toString());
    params.set('height', height.toString());
    params.set('model', model);

    if (seed !== undefined) {
        params.set('seed', seed.toString());
    }

    if (nologo) {
        params.set('nologo', 'true');
    }

    if (enhance) {
        params.set('enhance', 'true');
    }

    const encodedPrompt = encodeURIComponent(prompt);
    return `https://image.pollinations.ai/prompt/${encodedPrompt}?${params.toString()}`;
}

/**
 * Generate text using Pollinations AI
 * 
 * @param prompt - Text prompt for generation
 * @param options - Optional parameters
 * @returns Promise with generated text
 */
export async function generateText(
    prompt: string,
    options: PollinationsTextOptions = {}
): Promise<string> {
    const {
        model = 'openai',
        seed,
        temperature,
    } = options;

    const params = new URLSearchParams();
    if (model) params.set('model', model);
    if (seed !== undefined) params.set('seed', seed.toString());
    if (temperature !== undefined) params.set('temperature', temperature.toString());

    const encodedPrompt = encodeURIComponent(prompt);
    const url = `https://text.pollinations.ai/${encodedPrompt}?${params.toString()}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Pollinations API error: ${response.statusText}`);
        }
        return await response.text();
    } catch (error) {
        console.error('Error generating text with Pollinations:', error);
        throw error;
    }
}

/**
 * Download an image from Pollinations as a Blob
 * Useful for tools that need to process or save the image
 * 
 * @param prompt - Text description of the image
 * @param options - Image generation options
 * @returns Promise with image Blob
 */
export async function downloadImage(
    prompt: string,
    options: PollinationsImageOptions = {}
): Promise<Blob> {
    const imageUrl = generateImageUrl(prompt, options);

    try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error(`Failed to download image: ${response.statusText}`);
        }
        return await response.blob();
    } catch (error) {
        console.error('Error downloading image from Pollinations:', error);
        throw error;
    }
}

/**
 * Generate multiple image variations with different seeds
 * 
 * @param prompt - Text description of the image
 * @param count - Number of variations to generate
 * @param baseOptions - Base options for all images
 * @returns Array of image URLs
 */
export function generateImageVariations(
    prompt: string,
    count: number = 3,
    baseOptions: PollinationsImageOptions = {}
): string[] {
    return Array.from({ length: count }, (_, i) =>
        generateImageUrl(prompt, {
            ...baseOptions,
            seed: baseOptions.seed ? baseOptions.seed + i : Date.now() + i,
        })
    );
}

/**
 * Predefined image sizes for common use cases
 */
export const IMAGE_SIZES = {
    LOGO: { width: 512, height: 512 },
    FAVICON: { width: 256, height: 256 },
    BANNER: { width: 1200, height: 630 },
    SQUARE: { width: 1024, height: 1024 },
    PORTRAIT: { width: 768, height: 1024 },
    LANDSCAPE: { width: 1024, height: 768 },
    HD: { width: 1920, height: 1080 },
} as const;
