import { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'CogniDesk - AI Assistant with MatlaBz Integration',
    description: 'Professional AI Assistant powered by dual MatlaBz systems',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="bg-gray-50">{children}</body>
        </html>
    )
}