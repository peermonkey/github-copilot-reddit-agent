import Snoowrap from 'snoowrap'
import { geminiClient } from '../gemini/client'

export interface MonitoringData {
  posts: RedditPost[]
  comments: RedditComment[]
  images: ImageData[]
  links: LinkData[]
  moderatorActions: ModeratorAction[]
}

export interface RedditPost {
  id: string
  title: string
  content: string
  author: string
  subreddit: string
  upvotes: number
  downvotes: number
  commentCount: number
  url?: string
  thumbnail?: string | undefined
  images?: string[] | undefined
  links?: string[] | undefined
  createdAt: Date
  isStickied: boolean
  isLocked: boolean
  flair?: string | undefined
  sentiment?: 'positive' | 'negative' | 'neutral'
  toxicity?: number
  analyzed: boolean
}

export interface RedditComment {
  id: string
  postId: string
  parentId?: string | undefined
  content: string
  author: string
  upvotes: number
  downvotes: number
  replies: RedditComment[]
  createdAt: Date
  isDistinguished: boolean
  sentiment?: 'positive' | 'negative' | 'neutral'
  toxicity?: number
  analyzed: boolean
}

export interface ImageData {
  url: string
  postId: string
  description?: string
  tags: string[]
  moderationFlags: {
    nsfw: boolean
    violence: boolean
    spam: boolean
    inappropriate: boolean
  }
  sentiment?: 'positive' | 'negative' | 'neutral'
  confidence: number
  analyzedAt: Date
}

export interface LinkData {
  url: string
  postId: string
  domain: string
  title?: string
  description?: string
  isSafe: boolean
  isSpam: boolean
  analyzedAt: Date
}

export interface ModeratorAction {
  id: string
  action: 'remove' | 'approve' | 'lock' | 'sticky' | 'flair' | 'ban' | 'warn'
  targetType: 'post' | 'comment' | 'user'
  targetId: string
  moderator: string
  reason?: string
  timestamp: Date
}

// Reddit API client configuration and wrapper
export class RedditClient {
  private client: Snoowrap | null = null
  private isInitialized = false
  private monitoringActive = false
  private monitoringInterval: NodeJS.Timeout | null = null

  constructor() {
    this.initializeClient()
  }

  private initializeClient() {
    try {
      // TODO: Add proper environment variable validation
      const requiredEnvVars = [
        'REDDIT_CLIENT_ID',
        'REDDIT_CLIENT_SECRET', 
        'REDDIT_USER_AGENT',
        'REDDIT_USERNAME',
        'REDDIT_PASSWORD'
      ]

      const missingVars = requiredEnvVars.filter(
        varName => !process.env[varName]
      )

      if (missingVars.length > 0) {
        console.error('Missing Reddit environment variables:', missingVars)
        return
      }

      this.client = new Snoowrap({
        userAgent: process.env.REDDIT_USER_AGENT!,
        clientId: process.env.REDDIT_CLIENT_ID!,
        clientSecret: process.env.REDDIT_CLIENT_SECRET!,
        username: process.env.REDDIT_USERNAME!,
        password: process.env.REDDIT_PASSWORD!,
      })

      this.isInitialized = true
      console.log('Reddit client initialized successfully')
    } catch (error) {
      console.error('Failed to initialize Reddit client:', error)
      this.isInitialized = false
    }
  }

  // Check if client is ready
  public isReady(): boolean {
    return this.isInitialized && this.client !== null
  }

  // Enhanced monitoring method with comprehensive data collection
  public async startComprehensiveMonitoring(
    subreddits: string[], 
    callback: (data: MonitoringData) => void,
    options: {
      includeImages?: boolean
      includeLinks?: boolean
      includeModActions?: boolean
      analyzeWithAI?: boolean
      interval?: number
    } = {}
  ) {
    if (!this.isReady()) {
      throw new Error('Reddit client not initialized')
    }

    const {
      includeImages = true,
      includeLinks = true,
      includeModActions = true,
      analyzeWithAI = true,
      interval = 60000 // 1 minute
    } = options

    if (this.monitoringActive) {
      console.log('Monitoring already active, stopping previous session')
      this.stopMonitoring()
    }

    console.log(`Starting comprehensive monitoring of subreddits: ${subreddits.join(', ')}`)
    this.monitoringActive = true

    const monitor = async () => {
      if (!this.monitoringActive) return

      try {
        const monitoringData: MonitoringData = {
          posts: [],
          comments: [],
          images: [],
          links: [],
          moderatorActions: []
        }

        for (const subreddit of subreddits) {
          try {
            // Fetch recent posts
            const posts = await this.getEnhancedPosts(subreddit, { 
              limit: 25, 
              analyzeWithAI,
              includeImages,
              includeLinks 
            })
            monitoringData.posts.push(...posts)

            // Fetch recent comments
            const comments = await this.getEnhancedComments(subreddit, { 
              limit: 50, 
              analyzeWithAI 
            })
            monitoringData.comments.push(...comments)

            // Extract images from posts if enabled
            if (includeImages) {
              const images = await this.extractAndAnalyzeImages(posts)
              monitoringData.images.push(...images)
            }

            // Extract links from posts if enabled
            if (includeLinks) {
              const links = await this.extractAndAnalyzeLinks(posts)
              monitoringData.links.push(...links)
            }

            // Fetch moderator actions if enabled
            if (includeModActions) {
              const modActions = await this.getModeratorActions(subreddit)
              monitoringData.moderatorActions.push(...modActions)
            }

          } catch (error) {
            console.error(`Error monitoring r/${subreddit}:`, error)
          }
        }

        // Send collected data to callback
        callback(monitoringData)

      } catch (error) {
        console.error('Error in monitoring cycle:', error)
      }
    }

    // Start monitoring cycle
    await monitor() // Run immediately
    this.monitoringInterval = setInterval(monitor, interval)
  }

  public stopMonitoring() {
    this.monitoringActive = false
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval)
      this.monitoringInterval = null
    }
    console.log('Monitoring stopped')
  }

  // Enhanced post fetching with AI analysis
  public async getEnhancedPosts(subreddit: string, options: {
    limit?: number
    sort?: 'new' | 'top' | 'hot' | 'rising'
    timeframe?: 'hour' | 'day' | 'week' | 'month' | 'year' | 'all'
    analyzeWithAI?: boolean
    includeImages?: boolean
    includeLinks?: boolean
  } = {}): Promise<RedditPost[]> {
    if (!this.isReady()) {
      throw new Error('Reddit client not initialized')
    }

    try {
      const { 
        limit = 25, 
        sort = 'hot', 
        analyzeWithAI = false,
        includeImages = true,
        includeLinks = true 
      } = options
      
      let redditPosts
      switch (sort) {
        case 'new':
          redditPosts = await this.client!.getSubreddit(subreddit).getNew({ limit })
          break
        case 'top':
          redditPosts = await this.client!.getSubreddit(subreddit).getTop({ limit })
          break
        case 'rising':
          redditPosts = await this.client!.getSubreddit(subreddit).getRising({ limit })
          break
        default:
          redditPosts = await this.client!.getSubreddit(subreddit).getHot({ limit })
      }

      const enhancedPosts: RedditPost[] = []

      for (const post of redditPosts) {
        const enhancedPost: RedditPost = {
          id: post.id,
          title: post.title,
          content: post.selftext || '',
          author: post.author.name,
          subreddit: post.subreddit.display_name,
          upvotes: post.ups,
          downvotes: post.downs,
          commentCount: post.num_comments,
          url: post.url,
          thumbnail: post.thumbnail !== 'self' ? post.thumbnail : undefined,
          createdAt: new Date(post.created_utc * 1000),
          isStickied: post.stickied,
          isLocked: post.locked,
          flair: post.link_flair_text || undefined,
          analyzed: false,
          images: includeImages ? this.extractImageUrls(post) : undefined,
          links: includeLinks ? this.extractLinks(post) : undefined
        }

        // AI analysis if enabled
        if (analyzeWithAI && geminiClient.isReady()) {
          try {
            const analysis = await geminiClient.analyzeTextWithContext(
              `${post.title}\n\n${post.selftext}`,
              {
                subreddit: post.subreddit.display_name,
                postTitle: post.title,
                isComment: false
              }
            )
            
            enhancedPost.sentiment = analysis.sentiment
            enhancedPost.toxicity = analysis.toxicity
            enhancedPost.analyzed = true
          } catch (error) {
            console.error(`Error analyzing post ${post.id}:`, error)
          }
        }

        enhancedPosts.push(enhancedPost)
      }

      return enhancedPosts
    } catch (error) {
      console.error(`Error fetching enhanced posts from r/${subreddit}:`, error)
      throw error
    }
  }

  // Enhanced comment fetching with AI analysis
  public async getEnhancedComments(subreddit: string, options: {
    limit?: number
    analyzeWithAI?: boolean
  } = {}): Promise<RedditComment[]> {
    if (!this.isReady()) {
      throw new Error('Reddit client not initialized')
    }

    try {
      const { limit = 25, analyzeWithAI = false } = options
      
      const redditComments = await this.client!
        .getSubreddit(subreddit)
        .getNewComments({ limit })

      const enhancedComments: RedditComment[] = []

      for (const comment of redditComments) {
        const enhancedComment: RedditComment = {
          id: comment.id,
          postId: comment.link_id.replace('t3_', ''),
          parentId: comment.parent_id !== comment.link_id ? comment.parent_id.replace('t1_', '') : undefined,
          content: comment.body,
          author: comment.author.name,
          upvotes: comment.ups,
          downvotes: comment.downs,
          replies: [], // TODO: Implement recursive reply fetching
          createdAt: new Date(comment.created_utc * 1000),
          isDistinguished: comment.distinguished !== null,
          analyzed: false
        }

        // AI analysis if enabled
        if (analyzeWithAI && geminiClient.isReady()) {
          try {
            const analysis = await geminiClient.analyzeTextWithContext(
              comment.body,
              {
                subreddit: comment.subreddit.display_name,
                isComment: true
              }
            )
            
            enhancedComment.sentiment = analysis.sentiment
            enhancedComment.toxicity = analysis.toxicity
            enhancedComment.analyzed = true
          } catch (error) {
            console.error(`Error analyzing comment ${comment.id}:`, error)
          }
        }

        enhancedComments.push(enhancedComment)
      }

      return enhancedComments
    } catch (error) {
      console.error(`Error fetching enhanced comments from r/${subreddit}:`, error)
      throw error
    }
  }

  // Extract and analyze images from posts
  private async extractAndAnalyzeImages(posts: RedditPost[]): Promise<ImageData[]> {
    const images: ImageData[] = []

    for (const post of posts) {
      if (post.images && post.images.length > 0) {
        for (const imageUrl of post.images) {
          try {
            if (geminiClient.isReady()) {
              const analysis = await geminiClient.analyzeImage(imageUrl)
              images.push({
                url: imageUrl,
                postId: post.id,
                description: analysis.description,
                tags: analysis.tags,
                moderationFlags: analysis.moderationFlags,
                sentiment: analysis.sentiment,
                confidence: analysis.confidence,
                analyzedAt: new Date()
              })
            } else {
              // Fallback without AI analysis
              images.push({
                url: imageUrl,
                postId: post.id,
                tags: [],
                moderationFlags: {
                  nsfw: false,
                  violence: false,
                  spam: false,
                  inappropriate: false
                },
                confidence: 0,
                analyzedAt: new Date()
              })
            }
          } catch (error) {
            console.error(`Error analyzing image ${imageUrl}:`, error)
          }
        }
      }
    }

    return images
  }

  // Extract and analyze links from posts
  private async extractAndAnalyzeLinks(posts: RedditPost[]): Promise<LinkData[]> {
    const links: LinkData[] = []

    for (const post of posts) {
      if (post.links && post.links.length > 0) {
        for (const linkUrl of post.links) {
          try {
            const url = new URL(linkUrl)
            links.push({
              url: linkUrl,
              postId: post.id,
              domain: url.hostname,
              isSafe: true, // TODO: Implement link safety check
              isSpam: false, // TODO: Implement spam detection
              analyzedAt: new Date()
            })
          } catch (error) {
            console.error(`Error analyzing link ${linkUrl}:`, error)
          }
        }
      }
    }

    return links
  }

  // Get moderator actions (placeholder - requires mod privileges)
  private async getModeratorActions(_subreddit: string): Promise<ModeratorAction[]> {
    // TODO: Implement moderator action fetching
    // This requires moderator privileges on the subreddit
    return []
  }

  // Extract image URLs from Reddit post
  private extractImageUrls(post: any): string[] {
    const images: string[] = []
    
    // Direct image URL
    if (post.url && this.isImageUrl(post.url)) {
      images.push(post.url)
    }
    
    // Reddit gallery
    if (post.is_gallery && post.media_metadata) {
      for (const mediaId of Object.keys(post.media_metadata)) {
        const media = post.media_metadata[mediaId]
        if (media.s && media.s.u) {
          images.push(media.s.u.replace(/&amp;/g, '&'))
        }
      }
    }
    
    return images
  }

  // Extract links from Reddit post
  private extractLinks(post: any): string[] {
    const links: string[] = []
    
    // Post URL if not an image
    if (post.url && !this.isImageUrl(post.url) && !post.url.includes('reddit.com')) {
      links.push(post.url)
    }
    
    // Extract URLs from post content
    const urlRegex = /https?:\/\/[^\s)]+/g
    const matches = post.selftext?.match(urlRegex) || []
    links.push(...matches)
    
    return Array.from(new Set(links)) // Remove duplicates
  }

  // Check if URL is an image
  private isImageUrl(url: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
    return imageExtensions.some(ext => url.toLowerCase().includes(ext)) ||
           url.includes('i.redd.it') ||
           url.includes('imgur.com')
  }

  // Legacy methods for backward compatibility
  public async getComments(subreddit: string, options: {
    limit?: number
    sort?: 'new' | 'top' | 'hot'
    timeframe?: 'hour' | 'day' | 'week' | 'month' | 'year' | 'all'
  } = {}) {
    const enhancedOptions: { limit?: number; analyzeWithAI: boolean } = {
      analyzeWithAI: false
    }
    if (options.limit !== undefined) {
      enhancedOptions.limit = options.limit
    }
    const enhanced = await this.getEnhancedComments(subreddit, enhancedOptions)
    return enhanced
  }

  public replyToComment(commentId: string, content: string): Promise<any> {
    if (!this.isReady()) {
      throw new Error('Reddit client not initialized')
    }

    try {
      const comment = this.client!.getComment(commentId)
      return comment.reply(content)
    } catch (error) {
      console.error(`Error replying to comment ${commentId}:`, error)
      throw error
    }
  }

  public async getPosts(subreddit: string, options: {
    limit?: number
    sort?: 'new' | 'top' | 'hot' | 'rising'
    timeframe?: 'hour' | 'day' | 'week' | 'month' | 'year' | 'all'
  } = {}) {
    const enhanced = await this.getEnhancedPosts(subreddit, options)
    return enhanced
  }

  // Monitor multiple subreddits for new content (legacy)
  public async monitorSubreddits(subreddits: string[], callback: (item: any) => void) {
    return this.startComprehensiveMonitoring(subreddits, (data) => {
      data.posts.forEach(callback)
      data.comments.forEach(callback)
    })
  }
}

// Singleton instance
export const redditClient = new RedditClient()