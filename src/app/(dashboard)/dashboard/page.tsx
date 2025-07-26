import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard Overview',
  description: 'Overview of GitHub Copilot Reddit Agent activity',
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* TODO: Replace with actual StatsCard components */}
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-sm font-medium text-muted-foreground">Active Bots</h3>
          <p className="text-2xl font-bold">0</p>
          <p className="text-xs text-muted-foreground">TODO: Connect to real data</p>
        </div>
        
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-sm font-medium text-muted-foreground">Comments Today</h3>
          <p className="text-2xl font-bold">0</p>
          <p className="text-xs text-muted-foreground">TODO: Connect to real data</p>
        </div>
        
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-sm font-medium text-muted-foreground">Upvotes</h3>
          <p className="text-2xl font-bold">0</p>
          <p className="text-xs text-muted-foreground">TODO: Connect to real data</p>
        </div>
        
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-sm font-medium text-muted-foreground">Success Rate</h3>
          <p className="text-2xl font-bold">0%</p>
          <p className="text-xs text-muted-foreground">TODO: Connect to real data</p>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {/* TODO: Replace with actual ActivityFeed component */}
            <div className="text-sm text-muted-foreground">
              No recent activity
            </div>
            <div className="text-xs text-muted-foreground">
              TODO: Implement real-time activity feed
            </div>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold mb-4">Bot Status</h3>
          <div className="space-y-3">
            {/* TODO: Replace with actual BotStatus component */}
            <div className="flex items-center justify-between">
              <span className="text-sm">Reddit Bot</span>
              <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">
                Inactive
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              TODO: Implement real bot status monitoring
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* TODO: Replace with actual Button components */}
          <button className="p-3 text-left rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors">
            <div className="font-medium">Start Bot</div>
            <div className="text-xs text-muted-foreground">TODO: Implement</div>
          </button>
          
          <button className="p-3 text-left rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors">
            <div className="font-medium">View Logs</div>
            <div className="text-xs text-muted-foreground">TODO: Implement</div>
          </button>
          
          <button className="p-3 text-left rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors">
            <div className="font-medium">Update Config</div>
            <div className="text-xs text-muted-foreground">TODO: Implement</div>
          </button>
          
          <button className="p-3 text-left rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors">
            <div className="font-medium">View Analytics</div>
            <div className="text-xs text-muted-foreground">TODO: Implement</div>
          </button>
        </div>
      </div>
    </div>
  )
}

// TODO: Add real-time data fetching
// TODO: Add loading states
// TODO: Add error handling
// TODO: Add refresh functionality
// TODO: Add data export features
// TODO: Add customizable dashboard widgets