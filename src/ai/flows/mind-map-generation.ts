/**
 * Mind Map Generation Flow
 * Generates mind maps for topics using AI
 */

'use server'

export interface MindMapNode {
    id: string;
    text: string;
    children: MindMapNode[];
    level: number;
}

export interface MindMapResult {
    nodes: MindMapNode[];
    imageUrl?: string;
    structure: string;
}

/**
 * Generate a mind map for a given topic
 */
export async function generateMindMap(topic: string): Promise<MindMapResult> {
    try {
        // Mock AI generation - replace with actual AI service
        const mockGeneration = await mockAIGeneration(topic);

        // Handle null check for media
        const media = mockGeneration.media;
        const imageUrl = media?.url; // Use optional chaining to handle null

        if (!imageUrl) {
            console.warn('Mind map generation did not produce an image URL');
        }

        const nodes: MindMapNode[] = [
            {
                id: 'root',
                text: topic,
                level: 0,
                children: [
                    {
                        id: 'branch1',
                        text: `Key Concept 1 for ${topic}`,
                        level: 1,
                        children: []
                    },
                    {
                        id: 'branch2',
                        text: `Key Concept 2 for ${topic}`,
                        level: 1,
                        children: []
                    },
                    {
                        id: 'branch3',
                        text: `Key Concept 3 for ${topic}`,
                        level: 1,
                        children: []
                    }
                ]
            }
        ];

        const structure = `
Mind Map: ${topic}
├── Key Concept 1
├── Key Concept 2
└── Key Concept 3
    `;

        return {
            nodes,
            imageUrl: imageUrl || undefined,
            structure: structure.trim()
        };

    } catch (error) {
        console.error('Mind map generation failed:', error);
        throw new Error(`Mind map generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

/**
 * Mock AI generation function
 */
async function mockAIGeneration(topic: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
        media: Math.random() > 0.5 ? { url: `https://example.com/mindmap-${Date.now()}.png` } : null,
        text: `Generated mind map content for ${topic}`
    };
}

export default generateMindMap;