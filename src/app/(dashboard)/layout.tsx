export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="dashboard-layout">
            <nav className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <a href="/" className="text-xl font-bold text-gray-900">
                            🧠 CogniDesk
                        </a>
                        <div className="text-sm text-gray-500">
                            AI Assistant Dashboard
                        </div>
                    </div>
                </div>
            </nav>
            {children}
        </div>
    )
}