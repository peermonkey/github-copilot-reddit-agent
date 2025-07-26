// Database connection utility using Prisma
import { PrismaClient } from '@prisma/client'

// Global variable to store Prisma client instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create Prisma client with connection pooling
export const db = globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'error', 'warn'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  })

// Prevent multiple instances in development
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

// Database utility functions
export class DatabaseUtils {
  // Test database connection
  static async testConnection(): Promise<boolean> {
    try {
      await db.$queryRaw`SELECT 1`
      console.log('Database connection successful')
      return true
    } catch (error) {
      console.error('Database connection failed:', error)
      return false
    }
  }

  // Gracefully disconnect from database
  static async disconnect(): Promise<void> {
    try {
      await db.$disconnect()
      console.log('Database disconnected successfully')
    } catch (error) {
      console.error('Error disconnecting from database:', error)
    }
  }

  // Get database health status
  static async getHealth() {
    try {
      const start = Date.now()
      await db.$queryRaw`SELECT 1`
      const responseTime = Date.now() - start

      return {
        status: 'healthy',
        responseTime,
        timestamp: new Date().toISOString(),
      }
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      }
    }
  }

  // Execute raw query with error handling
  static async executeRaw(query: string, ...args: any[]): Promise<any> {
    try {
      return await db.$queryRawUnsafe(query, ...args)
    } catch (error) {
      console.error('Raw query execution failed:', error)
      throw error
    }
  }

  // Transaction wrapper
  static async transaction<T>(
    callback: (prisma: PrismaClient) => Promise<T>
  ): Promise<T> {
    try {
      return await db.$transaction(callback)
    } catch (error) {
      console.error('Transaction failed:', error)
      throw error
    }
  }
}

// Repository pattern implementations
export class UserRepository {
  // TODO: Implement user CRUD operations
  static async findById(id: string) {
    return await db.user.findUnique({
      where: { id },
      include: {
        sessions: true,
        botLogs: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
      },
    })
  }

  static async findByEmail(email: string) {
    return await db.user.findUnique({
      where: { email },
    })
  }

  static async create(userData: {
    email: string
    username?: string
    passwordHash: string
  }) {
    return await db.user.create({
      data: userData,
    })
  }

  static async updateLastLogin(id: string) {
    return await db.user.update({
      where: { id },
      data: { updatedAt: new Date() },
    })
  }
}

export class BotRepository {
  // TODO: Implement bot configuration CRUD operations
  static async getConfig() {
    return await db.botConfig.findFirst({
      orderBy: { createdAt: 'desc' },
    })
  }

  static async updateConfig(config: Partial<any>) {
    const existing = await this.getConfig()
    
    if (existing) {
      return await db.botConfig.update({
        where: { id: existing.id },
        data: { ...config, updatedAt: new Date() },
      })
    } else {
      return await db.botConfig.create({
        data: config,
      })
    }
  }

  static async logAction(logData: {
    userId?: string
    action: string
    subreddit: string
    postId?: string
    commentId?: string
    content?: string
    status: string
    error?: string
    metadata?: any
  }) {
    return await db.botLog.create({
      data: logData,
    })
  }

  static async getRecentLogs(limit = 50) {
    return await db.botLog.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { username: true, email: true },
        },
      },
    })
  }
}

export class AnalyticsRepository {
  // TODO: Implement analytics data operations
  static async recordMetric(
    metric: string,
    value: number,
    category: string,
    tags?: any
  ) {
    return await db.analytics.create({
      data: {
        metric,
        value,
        category,
        tags,
      },
    })
  }

  static async getMetrics(
    category: string,
    from: Date,
    to: Date
  ) {
    return await db.analytics.findMany({
      where: {
        category,
        timestamp: {
          gte: from,
          lte: to,
        },
      },
      orderBy: { timestamp: 'desc' },
    })
  }
}

// TODO: Add connection retry logic
// TODO: Add connection pooling configuration
// TODO: Add query performance monitoring
// TODO: Add database migration utilities
// TODO: Add backup and restore utilities
// TODO: Add data export utilities
// TODO: Add cache integration