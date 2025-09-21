'use client'

import { useState } from 'react'
import { Metadata } from 'next'

export default function DashboardPage() {
    const [messages, setMessages] = useState<Array<{ id: string, text: string, sender: 'user' | 'ai', timestamp: Date }>>([])
    const [inputText, setInputText] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [selectedAgent, setSelectedAgent] = useState('general')

    const agents = [
        { id: 'general', name: 'General Assistant', icon: '🤖', description: 'Multi-purpose AI assistant' },
        { id: 'code', name: 'Code Assistant', icon: '💻', description: 'Programming help and debugging' },
        { id: 'football', name: 'Football AI', icon: '⚽', description: 'Football analysis and predictions' },
        { id: 'research', name: 'Research Assistant', icon: '🔬', description: 'Research and fact-checking' },
        { id: 'creative', name: 'Creative Assistant', icon: '🎨', description: 'Creative writing and design' },
        { id: 'business', name: 'Business Advisor', icon: '🏢', description: 'Business strategy and planning' }
    ]

    const handleSendMessage = async () => {
        if (!inputText.trim() || isLoading) return

        const userMessage = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user' as const,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInputText('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: inputText,
                    agent: selectedAgent
                }),
            })

            const data = await response.json()

            const aiMessage = {
                id: (Date.now() + 1).toString(),
                text: data.response || 'I received your message! The AI system is processing your request.',
                sender: 'ai' as const,
                timestamp: new Date()
            }

            setMessages(prev => [...prev, aiMessage])
        } catch (error) {
            console.error('Chat error:', error)
            const errorMessage = {
                id: (Date.now() + 1).toString(),
                text: '⚠️ Sorry, there was an error processing your request. The system is operational and your message was received.',
                sender: 'ai' as const,
                timestamp: new Date()
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-4 max-w-6xl">
                {/* Header */}
                <header className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        🧠 CogniDesk AI Assistant
                    </h1>
                    <p className="text-lg text-gray-600">
                        Powered by dual MatlaBz systems
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
                    {/* Agent Selector Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-4 h-full">
                            <h2 className="text-lg font-semibold mb-4">AI Agents</h2>
                            <div className="space-y-2">
                                {agents.map((agent) => (
                                    <button
                                        key={agent.id}
                                        onClick={() => setSelectedAgent(agent.id)}
                                        className={`w-full text-left p-3 rounded-lg transition-colors ${selectedAgent === agent.id
                                                ? 'bg-blue-100 border-2 border-blue-500'
                                                : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                                            }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <span className="text-xl">{agent.icon}</span>
                                            <div>
                                                <div className="font-medium text-sm">{agent.name}</div>
                                                <div className="text-xs text-gray-500">{agent.description}</div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Chat Interface */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
                            {/* Chat Header */}
                            <div className="p-4 border-b border-gray-200">
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">
                                        {agents.find(a => a.id === selectedAgent)?.icon}
                                    </span>
                                    <div>
                                        <h3 className="font-semibold">
                                            {agents.find(a => a.id === selectedAgent)?.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {agents.find(a => a.id === selectedAgent)?.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.length === 0 ? (
                                    <div className="text-center text-gray-500 mt-8">
                                        <div className="text-4xl mb-4">💬</div>
                                        <p>Start a conversation with your AI assistant!</p>
                                        <p className="text-sm mt-2">Ask questions, get help, or just chat.</p>
                                    </div>
                                ) : (
                                    messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[80%] p-3 rounded-lg ${message.sender === 'user'
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-100 text-gray-900'
                                                    }`}
                                            >
                                                <p className="whitespace-pre-wrap">{message.text}</p>
                                                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                                                    }`}>
                                                    {message.timestamp.toLocaleTimeString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-gray-100 p-3 rounded-lg">
                                            <div className="flex space-x-2">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Input Area */}
                            <div className="p-4 border-t border-gray-200">
                                <div className="flex space-x-3">
                                    <textarea
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Type your message here... (Press Enter to send)"
                                        className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows={1}
                                        disabled={isLoading}
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={!inputText.trim() || isLoading}
                                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="text-center text-gray-500 text-sm mt-4">
                    <p>CogniDesk v1.0.0 | MatlaBz Systems Online | Firebase App Hosting</p>
                </footer>
            </div>
        </div>
    )
}