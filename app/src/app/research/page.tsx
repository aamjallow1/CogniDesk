'use client'

import { useState } from 'react'

// Mock StreamableValue interface for proper TypeScript typing
interface StreamableValue<T> {
    value: T
    done: boolean
    [Symbol.asyncIterator](): AsyncIterator<T>
}

// Mock function - replace with actual implementation
async function streamAutomatedWebResearch({ query }: { query: string }): Promise<string> {
    // Simulate research delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    return `Research results for: ${query}\n\nThis is a mock implementation. In a real application, this would connect to actual research APIs and return streaming results.`
}

export default function ResearchPage() {
    const [query, setQuery] = useState('')
    const [result, setResult] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleResearch = async () => {
        if (!query.trim()) return

        setIsLoading(true)
        setResult(null)

        try {
            // Use the mock function instead of streaming
            const response = await streamAutomatedWebResearch({ query })
            setResult(response)
        } catch (error: any) {
            console.error('Research failed:', error)
            setResult(`Error: ${error.message || 'Research failed'}`)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">
                        🔬 AI Research Assistant
                    </h1>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-2">
                                Research Query
                            </label>
                            <input
                                id="query"
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Enter your research question..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                onKeyPress={(e) => e.key === 'Enter' && handleResearch()}
                            />
                        </div>

                        <button
                            onClick={handleResearch}
                            disabled={isLoading || !query.trim()}
                            className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${isLoading || !query.trim()
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                        >
                            {isLoading ? 'Researching...' : 'Start Research'}
                        </button>
                    </div>

                    {result && (
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Research Results</h2>
                            <div className="bg-gray-50 rounded-lg p-6 border">
                                <pre className="whitespace-pre-wrap text-sm text-gray-700">
                                    {result}
                                </pre>
                            </div>
                        </div>
                    )}

                    {isLoading && (
                        <div className="mt-8">
                            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                                <div className="flex items-center space-x-3">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                                    <span className="text-blue-700">Conducting research...</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}