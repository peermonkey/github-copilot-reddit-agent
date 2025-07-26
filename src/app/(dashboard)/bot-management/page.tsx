import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bot Management - GitHub Copilot Reddit Agent',
  description: 'Configure and manage Reddit bot settings',
}

export default function BotManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Bot Management</h1>
          <p className="text-muted-foreground mt-2">
            Configure your Reddit bot settings and monitor its activity
          </p>
        </div>
        
        <div className="flex gap-2">
          {/* TODO: Replace with actual Button components */}
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            Start Bot
          </button>
          <button className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90">
            Stop Bot
          </button>
        </div>
      </div>

      {/* Bot Status Card */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Current Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Status</label>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm">Inactive</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Last Activity</label>
            <div className="text-sm">Never</div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Comments Today</label>
            <div className="text-sm">0</div>
          </div>
        </div>
      </div>

      {/* Configuration Card */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Configuration</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Monitored Subreddits</label>
              <textarea
                className="w-full p-3 border border-border rounded-md bg-background"
                rows={3}
                placeholder="copilot, github, programming"
                defaultValue="copilot, github, programming"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Comma-separated list of subreddits to monitor
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Check Interval (minutes)</label>
              <input
                type="number"
                className="w-full p-3 border border-border rounded-md bg-background"
                defaultValue={1}
                min={1}
                max={60}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Max Comments per Hour</label>
              <input
                type="number"
                className="w-full p-3 border border-border rounded-md bg-background"
                defaultValue={30}
                min={1}
                max={100}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Trigger Keywords</label>
              <textarea
                className="w-full p-3 border border-border rounded-md bg-background"
                rows={3}
                placeholder="copilot, github copilot, ai assistant"
                defaultValue="copilot, github copilot, ai assistant"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Keywords that trigger bot responses
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Exclude Keywords</label>
              <textarea
                className="w-full p-3 border border-border rounded-md bg-background"
                rows={3}
                placeholder="spam, test, delete"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Keywords to avoid responding to
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            Save Configuration
          </button>
        </div>
      </div>

      {/* Response Template Card */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Response Template</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Default Response Template</label>
            <textarea
              className="w-full p-3 border border-border rounded-md bg-background"
              rows={6}
              placeholder="Hello! I'm the GitHub Copilot Reddit Agent..."
              defaultValue={`Hello! I'm the GitHub Copilot Reddit Agent. I noticed you mentioned GitHub Copilot.

Here are some helpful resources:
- [GitHub Copilot Documentation](https://docs.github.com/copilot)
- [Getting Started Guide](https://docs.github.com/copilot/quickstart)
- [Best Practices](https://docs.github.com/copilot/using-github-copilot/best-practices)

Feel free to ask if you have any specific questions about GitHub Copilot!`}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Template for bot responses. Use {'{username}'} for personalization.
            </p>
          </div>
          
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
              Save Template
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// TODO: Add form validation
// TODO: Add real-time configuration updates
// TODO: Add configuration presets
// TODO: Add bot performance metrics
// TODO: Add A/B testing for responses
// TODO: Add response analytics