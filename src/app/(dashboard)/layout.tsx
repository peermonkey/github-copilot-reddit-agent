import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - GitHub Copilot Reddit Agent',
  description: 'Admin dashboard for managing GitHub Copilot Reddit bot',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* TODO: Add dashboard navigation sidebar */}
      {/* TODO: Add top navigation bar */}
      {/* TODO: Add breadcrumb navigation */}
      
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-card border-r border-border">
          {/* TODO: Implement Sidebar component */}
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Navigation</h2>
            <nav className="space-y-2">
              {/* TODO: Add navigation links */}
              <div className="text-muted-foreground">Dashboard</div>
              <div className="text-muted-foreground">Bot Management</div>
              <div className="text-muted-foreground">Analytics</div>
              <div className="text-muted-foreground">Settings</div>
            </nav>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 p-6">
          {/* TODO: Add header with user info and actions */}
          <header className="mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            {/* TODO: Add user profile dropdown */}
            {/* TODO: Add notifications */}
          </header>
          
          {children}
        </main>
      </div>
    </div>
  )
}

// TODO: Add authentication middleware
// TODO: Add role-based access control
// TODO: Add responsive design for mobile
// TODO: Add keyboard navigation support