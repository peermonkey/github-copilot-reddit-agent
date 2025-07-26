export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md">
          The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        <div className="flex gap-4 justify-center mt-6">
          <a
            href="/"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Go Home
          </a>
          <a
            href="/dashboard"
            className="px-4 py-2 border border-border rounded-md hover:bg-accent"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}

// TODO: Add search functionality
// TODO: Add suggested pages
// TODO: Add recent pages visited
// TODO: Add error reporting