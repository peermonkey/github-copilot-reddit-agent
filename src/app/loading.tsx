export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-muted-foreground">Loading GitHub Copilot Reddit Agent...</p>
      </div>
    </div>
  )
}

// TODO: Add skeleton loading states for specific components
// TODO: Add progressive loading indicators
// TODO: Add loading states for different sections