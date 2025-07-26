import type { Metadata } from 'next'
import { RealTimeMonitoringDashboard } from '../../../components/dashboard/RealTimeMonitoringDashboard'

export const metadata: Metadata = {
  title: 'Quantum Monitoring Dashboard',
  description: 'Real-time Reddit intelligence with AI-powered analysis',
}

export default function DashboardPage() {
  return <RealTimeMonitoringDashboard />
}