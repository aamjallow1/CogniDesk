// MatlaBz Parallel Processing Service
// Utilizes both D:\MatlaBz and E:\MatlaBz Runtime System for optimal performance

interface MatlaBzInstance {
    path: string;
    name: string;
    isAvailable: boolean;
    lastResponse: number;
    priority: number;
}

interface AnalysisRequest {
    type: 'football' | 'general' | 'prediction';
    data: any;
    priority: 'high' | 'medium' | 'low';
}

interface AnalysisResponse {
    success: boolean;
    data: any;
    source: string;
    processingTime: number;
    timestamp: number;
}

class MatlaBzParallelService {
    private instances: MatlaBzInstance[] = [
        {
            path: 'D:\\MatlaBz',
            name: 'MatlaBz-Full',
            isAvailable: true,
            lastResponse: 0,
            priority: 1 // Higher priority for full system
        },
        {
            path: 'E:\\MatlaBz Runtime System',
            name: 'MatlaBz-Runtime',
            isAvailable: true,
            lastResponse: 0,
            priority: 2 // Lower priority for runtime
        }
    ];

    private loadBalancer = {
        currentIndex: 0,
        requestCount: 0,
        failureCount: new Map<string, number>()
    };

    constructor() {
        this.validateInstances();
    }

    // Validate both MatlaBz instances are available
    private async validateInstances(): Promise<void> {
        for (const instance of this.instances) {
            try {
                // Check if path exists and is accessible
                const fs = require('fs');
                const pathExists = fs.existsSync(instance.path);
                instance.isAvailable = pathExists;
                
                if (!pathExists) {
                    console.warn(`MatlaBz instance not available: ${instance.name} at ${instance.path}`);
                }
            } catch (error) {
                console.error(`Error validating ${instance.name}:`, error);
                instance.isAvailable = false;
            }
        }

        // Ensure at least one instance is available
        const availableInstances = this.instances.filter(i => i.isAvailable);
        if (availableInstances.length === 0) {
            throw new Error('No MatlaBz instances available. Please check D:\\MatlaBz and E:\\MatlaBz Runtime System');
        }

        console.log(`MatlaBz Parallel Service initialized with ${availableInstances.length} instances`);
    }

    // Get the best available instance based on load and performance
    private selectBestInstance(): MatlaBzInstance {
        const availableInstances = this.instances.filter(i => i.isAvailable);
        
        if (availableInstances.length === 0) {
            throw new Error('No MatlaBz instances available');
        }

        // Use round-robin with priority weighting
        const sortedByPriority = availableInstances.sort((a, b) => {
            const aFailures = this.loadBalancer.failureCount.get(a.name) || 0;
            const bFailures = this.loadBalancer.failureCount.get(b.name) || 0;
            
            // Prefer instances with fewer failures and higher priority
            if (aFailures !== bFailures) {
                return aFailures - bFailures;
            }
            return a.priority - b.priority;
        });

        return sortedByPriority[this.loadBalancer.currentIndex % sortedByPriority.length];
    }

    // Execute analysis on selected MatlaBz instance
    private async executeOnInstance(instance: MatlaBzInstance, request: AnalysisRequest): Promise<AnalysisResponse> {
        const startTime = Date.now();
        
        try {
            // Mock analysis execution - replace with actual MatlaBz integration
            const mockResult = await this.mockMatlaBzExecution(instance, request);
            
            const processingTime = Date.now() - startTime;
            instance.lastResponse = processingTime;
            
            // Reset failure count on successful execution
            this.loadBalancer.failureCount.set(instance.name, 0);
            
            return {
                success: true,
                data: mockResult,
                source: instance.name,
                processingTime,
                timestamp: Date.now()
            };
            
        } catch (error) {
            // Track failures for load balancing
            const currentFailures = this.loadBalancer.failureCount.get(instance.name) || 0;
            this.loadBalancer.failureCount.set(instance.name, currentFailures + 1);
            
            throw new Error(`${instance.name} execution failed: ${error.message}`);
        }
    }

    // Mock MatlaBz execution (replace with actual integration)
    private async mockMatlaBzExecution(instance: MatlaBzInstance, request: AnalysisRequest): Promise<any> {
        // Simulate processing delay based on system type
        const processingDelay = instance.name === 'MatlaBz-Full' ? 100 : 150;
        await new Promise(resolve => setTimeout(resolve, processingDelay));
        
        switch (request.type) {
            case 'football':
                return {
                    analysis: 'Comprehensive football analysis completed',
                    predictions: ['Team A 65%', 'Draw 20%', 'Team B 15%'],
                    confidence: 0.87,
                    factors: ['Recent form', 'Head-to-head', 'Player availability'],
                    processedBy: instance.name,
                    systemPath: instance.path
                };
                
            case 'prediction':
                return {
                    prediction: 'Statistical prediction completed',
                    accuracy: 0.91,
                    dataPoints: 156,
                    processedBy: instance.name,
                    systemPath: instance.path
                };
                
            default:
                return {
                    analysis: 'General analysis completed',
                    result: 'Analysis successful',
                    processedBy: instance.name,
                    systemPath: instance.path
                };
        }
    }

    // Main analysis method with parallel processing
    public async analyzeWithParallel(request: AnalysisRequest): Promise<AnalysisResponse> {
        const availableInstances = this.instances.filter(i => i.isAvailable);
        
        if (availableInstances.length === 0) {
            throw new Error('No MatlaBz instances available for analysis');
        }

        // For high priority requests, try both instances in parallel
        if (request.priority === 'high' && availableInstances.length > 1) {
            return this.executeParallelAnalysis(availableInstances, request);
        }
        
        // For normal requests, use load balancing
        const selectedInstance = this.selectBestInstance();
        this.loadBalancer.currentIndex++;
        
        return this.executeOnInstance(selectedInstance, request);
    }

    // Execute analysis on multiple instances in parallel (for high priority)
    private async executeParallelAnalysis(instances: MatlaBzInstance[], request: AnalysisRequest): Promise<AnalysisResponse> {
        console.log(`Executing parallel analysis on ${instances.length} instances`);
        
        const promises = instances.map(instance => 
            this.executeOnInstance(instance, request).catch(error => ({
                success: false,
                error: error.message,
                source: instance.name,
                processingTime: 0,
                timestamp: Date.now()
            }))
        );

        const results = await Promise.all(promises);
        const successfulResults = results.filter(r => r.success) as AnalysisResponse[];
        
        if (successfulResults.length === 0) {
            throw new Error('All parallel executions failed');
        }

        // Return the fastest successful result, but log all results
        const fastestResult = successfulResults.reduce((fastest, current) => 
            current.processingTime < fastest.processingTime ? current : fastest
        );

        console.log(`Parallel execution completed. Fastest: ${fastestResult.source} (${fastestResult.processingTime}ms)`);
        
        return {
            ...fastestResult,
            data: {
                ...fastestResult.data,
                parallelResults: successfulResults.length,
                executionMode: 'parallel'
            }
        };
    }

    // Football-specific analysis method
    public async analyzeFootball(matchData: any): Promise<AnalysisResponse> {
        return this.analyzeWithParallel({
            type: 'football',
            data: matchData,
            priority: 'high' // Football analysis gets high priority
        });
    }

    // General prediction method
    public async generatePrediction(data: any): Promise<AnalysisResponse> {
        return this.analyzeWithParallel({
            type: 'prediction',
            data: data,
            priority: 'medium'
        });
    }

    // System health check
    public async getSystemStatus(): Promise<any> {
        const status = {
            totalInstances: this.instances.length,
            availableInstances: this.instances.filter(i => i.isAvailable).length,
            instances: this.instances.map(i => ({
                name: i.name,
                path: i.path,
                available: i.isAvailable,
                priority: i.priority,
                lastResponse: i.lastResponse,
                failures: this.loadBalancer.failureCount.get(i.name) || 0
            })),
            loadBalancer: {
                requestCount: this.loadBalancer.requestCount,
                currentIndex: this.loadBalancer.currentIndex
            }
        };

        console.log('MatlaBz System Status:', status);
        return status;
    }
}

// Singleton instance
export const matlabzService = new MatlaBzParallelService();

// Convenience methods for direct use
export async function analyzeFootballMatch(matchData: any): Promise<AnalysisResponse> {
    return matlabzService.analyzeFootball(matchData);
}

export async function generateAnalysisPrediction(data: any): Promise<AnalysisResponse> {
    return matlabzService.generatePrediction(data);
}

export async function getMatlaBzStatus(): Promise<any> {
    return matlabzService.getSystemStatus();
}

export default matlabzService;