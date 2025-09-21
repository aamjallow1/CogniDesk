/**
 * Intelligent Task Routing
 * Routes tasks to appropriate AI agents based on content analysis
 */

'use server'

export type TaskType = 'research' | 'code' | 'mindmap' | 'video' | 'general';

export interface TaskAnalysis {
    taskType: TaskType;
    confidence: number;
    agent: string;
    reasoning: string;
}

export interface RoutingResult {
    analysis: TaskAnalysis;
    response: string;
}

/**
 * Analyze input and route to appropriate agent
 */
export async function routeTask(input: string): Promise<RoutingResult> {
    try {
        const analysis = await analyzeTaskType(input);
        const response = await routeToAgent(analysis, input);

        return {
            analysis,
            response
        };
    } catch (error) {
        console.error('Task routing failed:', error);
        throw new Error(`Task routing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

/**
 * Analyze the input to determine task type
 */
async function analyzeTaskType(input: string): Promise<TaskAnalysis> {
    const lowerInput = input.toLowerCase();

    // Research keywords
    if (lowerInput.includes('research') || lowerInput.includes('find') || lowerInput.includes('search')) {
        return {
            taskType: 'research',
            confidence: 0.9,
            agent: 'research_agent',
            reasoning: 'Contains research-related keywords'
        };
    }

    // Code keywords
    if (lowerInput.includes('code') || lowerInput.includes('debug') || lowerInput.includes('programming')) {
        return {
            taskType: 'code',
            confidence: 0.9,
            agent: 'code_agent',
            reasoning: 'Contains programming-related keywords'
        };
    }

    // Mind map keywords
    if (lowerInput.includes('mind map') || lowerInput.includes('mindmap') || lowerInput.includes('diagram')) {
        return {
            taskType: 'mindmap',
            confidence: 0.85,
            agent: 'mindmap_agent',
            reasoning: 'Contains visualization-related keywords'
        };
    }

    // Video keywords
    if (lowerInput.includes('video') || lowerInput.includes('analyze video') || lowerInput.includes('watch')) {
        return {
            taskType: 'video',
            confidence: 0.8,
            agent: 'video_agent',
            reasoning: 'Contains video-related keywords'
        };
    }

    // Default to general
    return {
        taskType: 'general',
        confidence: 0.7,
        agent: 'general_agent',
        reasoning: 'No specific task type detected'
    };
}

/**
 * Route to appropriate agent based on analysis
 */
async function routeToAgent(analysis: TaskAnalysis, input: string): Promise<string> {
    switch (analysis.agent) {
        case 'research_agent':
            return `📚 Research Agent activated for: "${input}"
      
Task Type: ${analysis.taskType}
Confidence: ${(analysis.confidence * 100).toFixed(1)}%
Reasoning: ${analysis.reasoning}

[Research results would be processed here]`;

        case 'code_agent':
            return `💻 Code Agent activated for: "${input}"
      
Task Type: ${analysis.taskType}
Confidence: ${(analysis.confidence * 100).toFixed(1)}%
Reasoning: ${analysis.reasoning}

[Code analysis would be processed here]`;

        case 'mindmap_agent':
            return `🧠 Mind Map Agent activated for: "${input}"
      
Task Type: ${analysis.taskType}
Confidence: ${(analysis.confidence * 100).toFixed(1)}%
Reasoning: ${analysis.reasoning}

[Mind map generation would be processed here]`;

        case 'video_agent':
            return `🎥 Video Agent activated for: "${input}"
      
Task Type: ${analysis.taskType}
Confidence: ${(analysis.confidence * 100).toFixed(1)}%
Reasoning: ${analysis.reasoning}

[Video analysis would be processed here]`;

        default:
            return `🤖 General Agent activated for: "${input}"
      
Task Type: ${analysis.taskType}
Confidence: ${(analysis.confidence * 100).toFixed(1)}%
Reasoning: ${analysis.reasoning}

I'm ready to help with your general request.`;
    }
}

export default routeTask;