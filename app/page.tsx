'use client'

import { useState } from 'react'

export default function HomePage() {
    const [prompt, setPrompt] = useState('')
    const [response, setResponse] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!prompt.trim()) return

        setLoading(true)
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            })

            const data = await res.json()
            setResponse(data.response || JSON.stringify(data, null, 2))
        } catch (error) {
            setResponse('Error: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">CogniDesk</h1>
                    <p className="text-gray-600">AI Assistant with Dual MatlaBz Integration</p>
                    <div className="mt-2 flex space-x-4">
                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                            🖥️ MatlaBz-Full Online
                        </span>
                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            🖥️ MatlaBz-Runtime Online
                        </span>
                    </div>
                </div>

                {/* Chat Interface */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">💬 AI Assistant</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Ask about football analysis, predictions, or system status..."
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={loading}
                            />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={() => { setPrompt('Analyze Manchester United vs Arsenal'); handleSubmit({ preventDefault: () => { } } as any) }}
                                className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                            >
                                Football Analysis
                            </button>
                            <button
                                type="button"
                                onClick={() => { setPrompt('Predict market trends'); handleSubmit({ preventDefault: () => { } } as any) }}
                                className="bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600"
                            >
                                Predictions
                            </button>
                            <button
                                type="button"
                                onClick={() => { setPrompt('Show system status'); handleSubmit({ preventDefault: () => { } } as any) }}
                                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                            >
                                System Status
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !prompt.trim()}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : 'Send Message'}
                        </button>
                    </form>

                    {response && (
                        <div className="mt-6 bg-gray-50 border rounded-lg p-4">
                            <h3 className="font-semibold text-gray-800 mb-2">Response:</h3>
                            <pre className="whitespace-pre-wrap text-sm text-gray-700">{response}</pre>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>🚀 CogniDesk v1.0 | Enhanced with MatlaBz Integration</p>
                    <p>⚡ D:\MatlaBz + E:\MatlaBz Runtime System | 💰 $0.00/month optimized</p>
                </div>
            </div>
        </div>
    )
}