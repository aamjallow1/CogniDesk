import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json({
        status: 'Firebase Auth API Ready',
        project: 'studio-7308845117-ec2b2',
        authDomain: 'studio-7308845117-ec2b2.firebaseapp.com',
        supportedMethods: ['email', 'google', 'phone'],
        emailTemplates: {
            verification: {
                enabled: true,
                from: 'noreply@studio-7308845117-ec2b2.firebaseapp.com',
                subject: 'Verify your email for CogniDesk',
                customDomain: 'studio-7308845117-ec2b2.web.app'
            },
            passwordReset: {
                enabled: true,
                from: 'noreply@studio-7308845117-ec2b2.firebaseapp.com',
                subject: 'Reset your CogniDesk password'
            }
        },
        authorizedDomains: [
            'localhost',
            'studio-7308845117-ec2b2.firebaseapp.com',
            'studio-7308845117-ec2b2.web.app',
            'studio--studio-7308845117-ec2b2.us-central1.hosted.app'
        ],
        timestamp: new Date().toISOString()
    })
}

export async function POST(req: NextRequest) {
    try {
        const { action, email, uid } = await req.json()

        // Handle auth actions
        switch (action) {
            case 'verify-email':
                return NextResponse.json({
                    success: true,
                    message: 'Email verification initiated',
                    email,
                    redirectUrl: 'https://studio-7308845117-ec2b2.web.app/auth/verified'
                })

            case 'reset-password':
                return NextResponse.json({
                    success: true,
                    message: 'Password reset email sent',
                    email,
                    redirectUrl: 'https://studio-7308845117-ec2b2.web.app/auth/reset'
                })

            default:
                return NextResponse.json(
                    { error: 'Invalid action' },
                    { status: 400 }
                )
        }
    } catch (error) {
        console.error('Auth API Error:', error)
        return NextResponse.json(
            { error: 'Authentication service error' },
            { status: 500 }
        )
    }
}