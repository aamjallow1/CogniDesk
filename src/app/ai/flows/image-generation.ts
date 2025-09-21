/**
 * Image Generation Flow
 * Handles AI-powered image generation with proper null safety
 */

interface MediaResponse {
    url?: string | null;
    id?: string;
    status?: 'pending' | 'completed' | 'failed';
}

interface ImageGenerationRequest {
    prompt: string;
    size?: '256x256' | '512x512' | '1024x1024';
    quality?: 'standard' | 'hd';
    style?: 'natural' | 'vivid';
}

interface ImageGenerationResponse {
    success: boolean;
    imageUrl?: string;
    error?: string;
}

/**
 * Generate an image using AI with proper error handling and null safety
 */
export async function generateImage(
    request: ImageGenerationRequest
): Promise<ImageGenerationResponse> {
    try {
        // Mock API call - replace with actual image generation service
        const response = await fetch('/api/generate-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const media: MediaResponse | null = data.media || null;

        // Line 40: Proper null safety check for media
        if (!media || !media.url) {
            return {
                success: false,
                error: 'No media URL received from the image generation service',
            };
        }

        const imageUrl = media.url;

        // Validate the URL
        if (typeof imageUrl !== 'string' || imageUrl.trim() === '') {
            return {
                success: false,
                error: 'Invalid image URL received',
            };
        }

        return {
            success: true,
            imageUrl: imageUrl,
        };
    } catch (error) {
        console.error('Image generation failed:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred',
        };
    }
}

/**
 * Process multiple image generation requests
 */
export async function generateMultipleImages(
    requests: ImageGenerationRequest[]
): Promise<ImageGenerationResponse[]> {
    const results: ImageGenerationResponse[] = [];

    for (const request of requests) {
        try {
            const result = await generateImage(request);
            results.push(result);
        } catch (error) {
            results.push({
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }

    return results;
}

/**
 * Validate image generation request
 */
export function validateImageRequest(
    request: ImageGenerationRequest
): { valid: boolean; error?: string } {
    if (!request.prompt || request.prompt.trim() === '') {
        return { valid: false, error: 'Prompt is required' };
    }

    if (request.prompt.length > 1000) {
        return { valid: false, error: 'Prompt too long (max 1000 characters)' };
    }

    const validSizes = ['256x256', '512x512', '1024x1024'];
    if (request.size && !validSizes.includes(request.size)) {
        return { valid: false, error: 'Invalid size specified' };
    }

    const validQualities = ['standard', 'hd'];
    if (request.quality && !validQualities.includes(request.quality)) {
        return { valid: false, error: 'Invalid quality specified' };
    }

    const validStyles = ['natural', 'vivid'];
    if (request.style && !validStyles.includes(request.style)) {
        return { valid: false, error: 'Invalid style specified' };
    }

    return { valid: true };
}

export default {
    generateImage,
    generateMultipleImages,
    validateImageRequest,
};