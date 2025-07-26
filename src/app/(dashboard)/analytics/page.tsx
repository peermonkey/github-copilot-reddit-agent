import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Analytics - GitHub Copilot Reddit Agent',
  description: 'View analytics and performance metrics for the Reddit bot',
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Track bot performance and engagement metrics
        </p>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2">
        <button className="px-3 py-1 text-sm border border-border rounded-md bg-primary text-primary-foreground">
          7 Days
        </button>
        <button className="px-3 py-1 text-sm border border-border rounded-md hover:bg-accent">
          30 Days
        </button>
        <button className="px-3 py-1 text-sm border border-border rounded-md hover:bg-accent">
          90 Days
        </button>
        <button className="px-3 py-1 text-sm border border-border rounded-md hover:bg-accent">
          1 Year
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-sm font-medium text-muted-foreground">Total Comments</h3>
          <p className="text-2xl font-bold mt-2">0</p>
          <p className="text-xs text-green-500 mt-1">+0% from last period</p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-sm font-medium text-muted-foreground">Avg. Upvotes</h3>
          <p className="text-2xl font-bold mt-2">0</p>
          <p className="text-xs text-green-500 mt-1">+0% from last period</p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-sm font-medium text-muted-foreground">Success Rate</h3>
          <p className="text-2xl font-bold mt-2">0%</p>
          <p className="text-xs text-muted-foreground mt-1">Comments with &gt;0 upvotes</p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-sm font-medium text-muted-foreground">Response Time</h3>
          <p className="text-2xl font-bold mt-2">0s</p>
          <p className="text-xs text-muted-foreground mt-1">Avg. time to respond</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold mb-4">Activity Over Time</h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            {/* TODO: Replace with actual chart component */}
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <p>Chart will be displayed here</p>
              <p className="text-xs">TODO: Implement Chart.js or Recharts</p>
            </div>
          </div>
        </div>

        {/* Subreddit Performance */}
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold mb-4">Subreddit Performance</h3>
          <div className="space-y-3">
            {/* TODO: Replace with actual data */}
            <div className="flex items-center justify-between">
              <span className="text-sm">r/copilot</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-muted rounded-full">
                  <div className="w-0 h-full bg-primary rounded-full"></div>
                </div>
                <span className="text-xs text-muted-foreground">0</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">r/github</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-muted rounded-full">
                  <div className="w-0 h-full bg-primary rounded-full"></div>
                </div>
                <span className="text-xs text-muted-foreground">0</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">r/programming</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-muted rounded-full">
                  <div className="w-0 h-full bg-primary rounded-full"></div>
                </div>
                <span className="text-xs text-muted-foreground">0</span>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground mt-4">
              TODO: Show actual subreddit engagement metrics
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {/* TODO: Replace with actual activity feed */}
          <div className="text-center text-muted-foreground py-8">
            <div className="text-4xl mb-2">🤖</div>
            <p>No recent activity</p>
            <p className="text-xs">Bot activity will appear here once started</p>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="flex justify-end gap-2">
        <button className="px-4 py-2 border border-border rounded-md hover:bg-accent">
          Export CSV
        </button>
        <button className="px-4 py-2 border border-border rounded-md hover:bg-accent">
          Export JSON
        </button>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
          Generate Report
        </button>
      </div>
    </div>
  )
}

// TODO: Add real-time data fetching
// TODO: Implement chart libraries (Chart.js, Recharts, or D3)
// TODO: Add data export functionality
// TODO: Add custom date range picker
// TODO: Add drill-down capabilities
// TODO: Add comparative analytics
// TODO: Add alerting for performance thresholds