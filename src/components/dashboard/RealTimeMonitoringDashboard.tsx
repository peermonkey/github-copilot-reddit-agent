'use client'

import React, { useState, useEffect } from 'react'
import { Activity, Eye, MessageSquare, Image, Link, Shield, AlertTriangle, TrendingUp, Clock } from 'lucide-react'
import { Card } from '../ui/Card'
import { FuturisticMetricCard, FuturisticLineChart, FuturisticBarChart, FuturisticPieChart, RealTimeIndicator, ProgressRing } from '../ui/Charts'

interface MonitoringData {
  posts: any[]
  comments: any[]
  images: any[]
  links: any[]
  moderatorActions: any[]
}

interface DashboardStats {
  totalPosts: number
  totalComments: number
  totalImages: number
  totalLinks: number
  sentimentDistribution: { positive: number; negative: number; neutral: number }
  toxicityLevels: { low: number; medium: number; high: number }
  moderationFlags: { total: number; nsfw: number; violence: number; spam: number }
  activityTrend: Array<{ time: string; posts: number; comments: number }>
}

export const RealTimeMonitoringDashboard: React.FC = () => {
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [monitoringData, setMonitoringData] = useState<MonitoringData>({
    posts: [],
    comments: [],
    images: [],
    links: [],
    moderatorActions: []
  })
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    totalComments: 0,
    totalImages: 0,
    totalLinks: 0,
    sentimentDistribution: { positive: 0, negative: 0, neutral: 0 },
    toxicityLevels: { low: 0, medium: 0, high: 0 },
    moderationFlags: { total: 0, nsfw: 0, violence: 0, spam: 0 },
    activityTrend: []
  })
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  // Simulate real-time data updates
  useEffect(() => {
    if (!isMonitoring) return

    const interval = setInterval(() => {
      // Simulate new data
      const newPost = {
        id: Math.random().toString(36),
        title: 'New monitored post',
        sentiment: ['positive', 'negative', 'neutral'][Math.floor(Math.random() * 3)],
        toxicity: Math.random() * 100,
        timestamp: new Date()
      }

      const newComment = {
        id: Math.random().toString(36),
        content: 'New monitored comment',
        sentiment: ['positive', 'negative', 'neutral'][Math.floor(Math.random() * 3)],
        toxicity: Math.random() * 100,
        timestamp: new Date()
      }

      setMonitoringData(prev => ({
        ...prev,
        posts: [...prev.posts.slice(-49), newPost],
        comments: [...prev.comments.slice(-99), newComment]
      }))

      setLastUpdate(new Date())
    }, 3000)

    return () => clearInterval(interval)
  }, [isMonitoring])

  // Calculate stats from monitoring data
  useEffect(() => {
    const calculateStats = () => {
      const sentimentCounts = { positive: 0, negative: 0, neutral: 0 }
      const toxicityCounts = { low: 0, medium: 0, high: 0 }
      
      const allContent = [...monitoringData.posts, ...monitoringData.comments]
      
      allContent.forEach(item => {
        if (item.sentiment) {
          sentimentCounts[item.sentiment as keyof typeof sentimentCounts]++
        }
        
        if (item.toxicity !== undefined) {
          if (item.toxicity < 30) toxicityCounts.low++
          else if (item.toxicity < 70) toxicityCounts.medium++
          else toxicityCounts.high++
        }
      })

      // Generate activity trend (last 24 data points)
      const activityTrend = Array.from({ length: 24 }, (_, i) => ({
        time: new Date(Date.now() - (23 - i) * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        posts: Math.floor(Math.random() * 10) + 1,
        comments: Math.floor(Math.random() * 25) + 5
      }))

      setStats({
        totalPosts: monitoringData.posts.length,
        totalComments: monitoringData.comments.length,
        totalImages: monitoringData.images.length,
        totalLinks: monitoringData.links.length,
        sentimentDistribution: sentimentCounts,
        toxicityLevels: toxicityCounts,
        moderationFlags: {
          total: monitoringData.images.reduce((acc, img) => {
            const flags = img.moderationFlags || {}
            return acc + (flags.nsfw ? 1 : 0) + (flags.violence ? 1 : 0) + (flags.spam ? 1 : 0)
          }, 0),
          nsfw: monitoringData.images.filter(img => img.moderationFlags?.nsfw).length,
          violence: monitoringData.images.filter(img => img.moderationFlags?.violence).length,
          spam: monitoringData.images.filter(img => img.moderationFlags?.spam).length
        },
        activityTrend
      })
    }

    calculateStats()
  }, [monitoringData])

  const sentimentChartData = [
    { name: 'Positive', value: stats.sentimentDistribution.positive, color: '#00ff88' },
    { name: 'Neutral', value: stats.sentimentDistribution.neutral, color: '#ffd700' },
    { name: 'Negative', value: stats.sentimentDistribution.negative, color: '#ff6b6b' }
  ]

  const toxicityChartData = [
    { name: 'Low', value: stats.toxicityLevels.low },
    { name: 'Medium', value: stats.toxicityLevels.medium },
    { name: 'High', value: stats.toxicityLevels.high }
  ]

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Quantum Monitoring Dashboard
            </h1>
            <p className="text-gray-400 mt-2">Real-time Reddit intelligence with AI-powered analysis</p>
          </div>
          <div className="flex items-center space-x-4">
            <RealTimeIndicator 
              status={isMonitoring ? 'online' : 'offline'} 
              label="Monitoring Status" 
              lastUpdate={lastUpdate}
            />
            <button
              onClick={toggleMonitoring}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                isMonitoring 
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30' 
                  : 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
              }`}
            >
              {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <FuturisticMetricCard
          title="Active Posts"
          value={stats.totalPosts}
          change={12}
          trend="up"
          icon={<MessageSquare size={24} />}
          color="#00ff88"
        />
        <FuturisticMetricCard
          title="Comments Tracked"
          value={stats.totalComments}
          change={8}
          trend="up"
          icon={<Activity size={24} />}
          color="#ff6b6b"
        />
        <FuturisticMetricCard
          title="Images Analyzed"
          value={stats.totalImages}
          change={-3}
          trend="down"
          icon={<Image size={24} />}
          color="#ffd700"
        />
        <FuturisticMetricCard
          title="Links Monitored"
          value={stats.totalLinks}
          change={15}
          trend="up"
          icon={<Link size={24} />}
          color="#8b5cf6"
        />
      </div>

      {/* Advanced Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Activity Trend */}
        <Card className="lg:col-span-2 bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Activity Trend</h3>
              <TrendingUp className="text-cyan-400" size={20} />
            </div>
            <FuturisticLineChart 
              data={stats.activityTrend.map(item => ({ name: item.time, value: item.posts + item.comments }))}
              height={300}
              color="#00ff88"
            />
          </div>
        </Card>

        {/* Sentiment Analysis */}
        <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Sentiment Analysis</h3>
            <FuturisticPieChart data={sentimentChartData} height={250} />
            <div className="mt-4 space-y-2">
              {sentimentChartData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-300">{item.name}</span>
                  </div>
                  <span className="text-sm text-white font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Monitoring Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {/* Toxicity Levels */}
        <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
          <div className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">Toxicity Levels</h3>
            <FuturisticBarChart 
              data={toxicityChartData}
              height={200}
              color="#ff6b6b"
            />
          </div>
        </Card>

        {/* Moderation Alerts */}
        <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
          <div className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">Moderation Alerts</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="text-red-400" size={16} />
                  <span className="text-sm text-gray-300">NSFW Content</span>
                </div>
                <span className="text-red-400 font-medium">{stats.moderationFlags.nsfw}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="text-orange-400" size={16} />
                  <span className="text-sm text-gray-300">Violence</span>
                </div>
                <span className="text-orange-400 font-medium">{stats.moderationFlags.violence}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Eye className="text-yellow-400" size={16} />
                  <span className="text-sm text-gray-300">Spam</span>
                </div>
                <span className="text-yellow-400 font-medium">{stats.moderationFlags.spam}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* AI Analysis Progress */}
        <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
          <div className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">AI Analysis</h3>
            <div className="flex justify-center">
              <ProgressRing 
                progress={85} 
                size={100} 
                color="#00ff88"
                label="Completion"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-400">Processing images and text</p>
            </div>
          </div>
        </Card>

        {/* System Performance */}
        <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
          <div className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">System Performance</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-300 mb-1">
                  <span>CPU Usage</span>
                  <span>42%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full" style={{ width: '42%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-300 mb-1">
                  <span>Memory</span>
                  <span>68%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full" style={{ width: '68%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-300 mb-1">
                  <span>API Calls</span>
                  <span>156/min</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full" style={{ width: '78%' }} />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity Feed */}
      <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Live Activity Feed</h3>
            <div className="flex items-center space-x-2">
              <Clock className="text-cyan-400" size={16} />
              <span className="text-sm text-gray-400">Last updated: {lastUpdate.toLocaleTimeString()}</span>
            </div>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {monitoringData.posts.slice(-10).reverse().map((post, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <MessageSquare className="text-blue-400" size={16} />
                <div className="flex-1">
                  <p className="text-sm text-white">{post.title}</p>
                  <p className="text-xs text-gray-400">r/programming • {post.timestamp?.toLocaleTimeString()}</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  post.sentiment === 'positive' ? 'bg-green-500/20 text-green-400' :
                  post.sentiment === 'negative' ? 'bg-red-500/20 text-red-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {post.sentiment}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}