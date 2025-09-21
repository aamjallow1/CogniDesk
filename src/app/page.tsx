export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-8">
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        🧠 CogniDesk
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Your intelligent AI assistant platform with specialized agents for every task
                    </p>
                </header>

                <div className="text-center">
                    <a
                        href="/dashboard"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
                    >
                        Enter Dashboard →
                    </a>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <div className="text-3xl mb-4">🤖</div>
                        <h3 className="text-lg font-semibold mb-2">9 AI Agents</h3>
                        <p className="text-gray-600 text-sm">Specialized assistants for different tasks and domains</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <div className="text-3xl mb-4">⚡</div>
                        <h3 className="text-lg font-semibold mb-2">Instant Response</h3>
                        <p className="text-gray-600 text-sm">Powered by Google Gemini AI for fast, accurate responses</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <div className="text-3xl mb-4">🔧</div>
                        <h3 className="text-lg font-semibold mb-2">Easy to Use</h3>
                        <p className="text-gray-600 text-sm">Simple interface designed for productivity</p>
                    </div>
                </div>

                <footer className="mt-16 text-center text-gray-500 text-sm">
                    <p>CogniDesk v1.0.0 | Powered by Firebase + Google AI</p>
                </footer>
            </div>
        </div>
    )
}