import { redirect } from 'next/navigation'

export default function HomePage() {
  // TODO: Add authentication check
  // TODO: If user is authenticated, redirect to dashboard
  // TODO: If user is not authenticated, redirect to login
  
  // For now, redirect to dashboard
  redirect('/dashboard')
}

// TODO: Add metadata export for SEO
// TODO: Add loading component
// TODO: Add error boundary
// TODO: Consider adding a landing page instead of redirect