import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GitHub Copilot Reddit Agent',
  description: 'AI agent mod for GitHub Copilot Reddit community',
  keywords: ['github', 'copilot', 'reddit', 'ai', 'bot', 'agent'],
  authors: [{ name: 'GitHub Copilot Reddit Community' }],
  openGraph: {
    title: 'GitHub Copilot Reddit Agent',
    description: 'AI agent mod for GitHub Copilot Reddit community',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GitHub Copilot Reddit Agent',
    description: 'AI agent mod for GitHub Copilot Reddit community',
  },
  robots: {
    index: false, // Don't index in development
    follow: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        {/* TODO: Add global providers */}
        {/* TODO: Add AuthProvider for authentication context */}
        {/* TODO: Add ThemeProvider for dark/light mode */}
        {/* TODO: Add ToastProvider for notifications */}
        {/* TODO: Add QueryProvider for data fetching */}
        
        <div id="root" className="relative min-h-screen">
          {/* TODO: Add global navigation component */}
          <main className="relative">
            {children}
          </main>
          
          {/* TODO: Add global footer component */}
          {/* TODO: Add global modals and overlays */}
        </div>
        
        {/* TODO: Add analytics scripts */}
        {/* TODO: Add error boundary for global error handling */}
      </body>
    </html>
  )
}

// TODO: Add error.tsx for error handling
// TODO: Add loading.tsx for loading states
// TODO: Add not-found.tsx for 404 pages
// TODO: Add global.d.ts for global type definitions