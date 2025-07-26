import { NextRequest, NextResponse } from 'next/server'
import { redditClient } from '../../../services/reddit/client'

let monitoringActive = false
let monitoringData: any = null

// GET /api/monitoring - Get current monitoring status and data
export async function GET(_request: NextRequest) {
  try {
    const status = {
      isActive: monitoringActive,
      lastUpdate: monitoringData?.lastUpdate || null,
      stats: monitoringData?.stats || {
        totalPosts: 0,
        totalComments: 0,
        totalImages: 0,
        totalLinks: 0,
        flaggedContent: 0,
        sentimentBreakdown: { positive: 0, negative: 0, neutral: 0 },
      },
      subreddits: ['copilot', 'github', 'programming'], // TODO: Make configurable
      uptime: monitoringActive ? Date.now() - (monitoringData?.startTime || Date.now()) : 0,
    }

    return NextResponse.json({
      success: true,
      data: status,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Monitoring status error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get monitoring status',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

// POST /api/monitoring - Start/stop monitoring
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json()
    const { action, subreddits, options } = body

    // Validate request body
    if (!action || !['start', 'stop'].includes(action)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid action. Use "start" or "stop"',
        },
        { status: 400 }
      )
    }

    if (action === 'start') {
      if (monitoringActive) {
        return NextResponse.json({
          success: true,
          message: 'Monitoring already active',
          data: { isActive: true },
        })
      }

      // Check if Reddit client is ready
      if (!redditClient.isReady()) {
        return NextResponse.json(
          {
            success: false,
            error: 'Reddit client not available',
          },
          { status: 503 }
        )
      }

      const monitoredSubreddits = subreddits || ['copilot', 'github', 'programming']
      const monitoringOptions = {
        includeImages: true,
        includeLinks: true,
        includeModActions: false, // Requires mod privileges
        analyzeWithAI: true,
        interval: 60000, // 1 minute
        ...options,
      }

      console.log(`Starting comprehensive monitoring of: ${monitoredSubreddits.join(', ')}`)

      // Initialize monitoring data
      monitoringData = {
        startTime: Date.now(),
        lastUpdate: new Date(),
        stats: {
          totalPosts: 0,
          totalComments: 0,
          totalImages: 0,
          totalLinks: 0,
          flaggedContent: 0,
          sentimentBreakdown: { positive: 0, negative: 0, neutral: 0 },
        },
        recentActivity: [],
      }

      // Start monitoring
      redditClient.startComprehensiveMonitoring(
        monitoredSubreddits,
        (data) => {
          // Update monitoring data with new information
          monitoringData.lastUpdate = new Date()
          monitoringData.stats.totalPosts += data.posts.length
          monitoringData.stats.totalComments += data.comments.length
          monitoringData.stats.totalImages += data.images.length
          monitoringData.stats.totalLinks += data.links.length

          // Count flagged content
          const flaggedImages = data.images.filter(img => 
            img.moderationFlags?.nsfw || 
            img.moderationFlags?.violence || 
            img.moderationFlags?.spam
          ).length
          monitoringData.stats.flaggedContent += flaggedImages

          // Update sentiment breakdown
          const allContent = [...data.posts, ...data.comments]
          allContent.forEach(item => {
            if (item.sentiment) {
              monitoringData.stats.sentimentBreakdown[item.sentiment]++
            }
          })

          // Store recent activity (keep last 50 items)
          const newActivity = [...data.posts, ...data.comments]
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 20)
          
          monitoringData.recentActivity = [
            ...newActivity,
            ...monitoringData.recentActivity
          ].slice(0, 50)

          console.log(`Monitoring update: ${data.posts.length} posts, ${data.comments.length} comments, ${data.images.length} images`)
        },
        monitoringOptions
      )

      monitoringActive = true

      return NextResponse.json({
        success: true,
        message: 'Monitoring started successfully',
        data: {
          isActive: true,
          subreddits: monitoredSubreddits,
          options: monitoringOptions,
        },
      })
    } else if (action === 'stop') {
      if (!monitoringActive) {
        return NextResponse.json({
          success: true,
          message: 'Monitoring already stopped',
          data: { isActive: false },
        })
      }

      // Stop monitoring
      redditClient.stopMonitoring()
      monitoringActive = false

      console.log('Monitoring stopped')

      return NextResponse.json({
        success: true,
        message: 'Monitoring stopped successfully',
        data: { isActive: false },
      })
    }

    // Default return for TypeScript
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid action',
      },
      { status: 400 }
    )
  } catch (error) {
    console.error('Monitoring control error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to control monitoring',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

// PUT /api/monitoring - Update monitoring configuration
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { subreddits, options } = body

    // TODO: Implement monitoring configuration update
    // TODO: Validate new configuration
    // TODO: Apply changes to active monitoring session

    return NextResponse.json({
      success: true,
      message: 'Monitoring configuration updated',
      data: {
        subreddits: subreddits || [],
        options: options || {},
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Monitoring config update error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update monitoring configuration',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}