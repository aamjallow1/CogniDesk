'use client'

import { Metadata } from 'next'
import { useState } from 'react'

export default function DashboardPage() {
    const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

    const aiAgents = [
        {
            id: 'general',
            emoji: '🤖',
            name: 'General Assistant',
            description: 'Multi-purpose AI assistant for general queries and tasks'
        },
        {
            id: 'code',
            emoji: '💻',
            name: 'Code Assistant',
            description: 'Programming help, debugging, and code optimization'
        },
        {
            id: 'writing',
            emoji: '📝',
            name: 'Writing Assistant',
            description: 'Content creation, editing, and writing improvement'
        },
        {
            id: 'data',
            emoji: '📊',
            name: 'Data Analyst',
            description: 'Data analysis, visualization, and insights'
        },
        {
            id: 'creative',
            emoji: '🎨',
            name: 'Creative Assistant',
            description: 'Design ideas, creative writing, and artistic concepts'
        },
        {
            id: 'business',
            emoji: '🏢',
            name: 'Business Advisor',
            description: 'Business strategy, planning, and decision support'
        },
        {
            id: 'research',
            emoji: '🔬',
            name: 'Research Assistant',
            description: 'Research, fact-checking, and information gathering'
        },
        {
            id: 'education',
            emoji: '🎓',
            name: 'Education Tutor',
            description: 'Learning support, explanations, and tutoring'
        },
        {
            id: 'innovation',
            emoji: '💡',
            name: 'Innovation Catalyst',
            description: 'Brainstorming, problem-solving, and innovation'
        }
    ]

    const handleAgentSelect = (agentId: string) => {
        setSelectedAgent(agentId)
        // Here you would typically navigate to the agent or open a chat interface
        console.log(`Selected agent: ${agentId}`)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-8">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        🧠 CogniDesk AI Assistant
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Your intelligent desktop AI general assistant with 9 specialized agents
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {aiAgents.map((agent) => (
                        <div
                            key={agent.id}
                            onClick={() => handleAgentSelect(agent.id)}
                            className={`bg-white rounded-lg shadow-md p-6 border border-gray-200 cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${selectedAgent === agent.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                                }`}
                        >
                            <div className="text-2xl mb-3">{agent.emoji}</div>
                            <h3 className="text-lg font-semibold mb-2">{agent.name}</h3>
                            <p className="text-gray-600 text-sm">{agent.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
                        <h2 className="text-2xl font-bold mb-4">🚀 Ready to Get Started?</h2>
                        <p className="text-gray-600 mb-6">
                            {selectedAgent
                                ? `You selected: ${aiAgents.find(a => a.id === selectedAgent)?.name}`
                                : 'Choose an AI agent above or start with a general conversation'
                            }
                        </p>
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                            onClick={() => {
                                // Start conversation logic here
                                console.log('Starting conversation...')
                            }}
                        >
                            Start Conversation
                        </button>
                    </div>
                </div>

                <footer className="mt-16 text-center text-gray-500 text-sm">
                    <p>CogniDesk v1.0.0 | Powered by Firebase + Genkit AI</p>
                </footer>
            </div>
        </div>
    )
}