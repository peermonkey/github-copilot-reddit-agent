import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  try {
    // Create default admin user
    const adminPassword = await bcrypt.hash('admin123', 12)
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@github-copilot-reddit-agent.com' },
      update: {},
      create: {
        email: 'admin@github-copilot-reddit-agent.com',
        username: 'admin',
        passwordHash: adminPassword,
        role: 'ADMIN',
        isActive: true,
      },
    })
    console.log('✅ Created admin user:', adminUser.email)

    // Create default bot configuration
    await prisma.botConfig.upsert({
      where: { id: 'default-config' },
      update: {},
      create: {
        id: 'default-config',
        isEnabled: false,
        subreddits: ['copilot', 'github', 'programming'],
        checkInterval: 60000, // 1 minute
        maxCommentsPerHour: 30,
        responseTemplate: `Hello! I'm the GitHub Copilot Reddit Agent. I noticed you mentioned GitHub Copilot.

Here are some helpful resources:
- [GitHub Copilot Documentation](https://docs.github.com/copilot)
- [Getting Started Guide](https://docs.github.com/copilot/quickstart)
- [Best Practices](https://docs.github.com/copilot/using-github-copilot/best-practices)

Feel free to ask if you have any specific questions about GitHub Copilot!`,
        keywords: ['copilot', 'github copilot', 'ai assistant', 'code completion'],
        excludeKeywords: ['spam', 'test', 'delete', 'nsfw'],
        minUpvotes: 1,
        maxCommentAge: 86400, // 24 hours
      },
    })
    console.log('✅ Created bot configuration')

    // Create sample analytics entries
    const now = new Date()
    const analyticsData = [
      {
        metric: 'comments_posted',
        value: 0,
        category: 'bot',
        tags: { subreddit: 'copilot' },
        timestamp: now,
      },
      {
        metric: 'upvotes_received',
        value: 0,
        category: 'engagement',
        tags: { subreddit: 'copilot' },
        timestamp: now,
      },
      {
        metric: 'response_time',
        value: 0,
        category: 'performance',
        tags: { unit: 'seconds' },
        timestamp: now,
      },
    ]

    for (const data of analyticsData) {
      await prisma.analytics.create({ data })
    }
    console.log('✅ Created sample analytics entries')

    // Create sample GitHub repositories
    const repositories = [
      {
        repoId: '1',
        owner: 'github',
        name: 'copilot-docs',
        fullName: 'github/copilot-docs',
        isPrivate: false,
        language: 'Markdown',
        stars: 1000,
        forks: 200,
        issues: 50,
        isMonitored: true,
      },
      {
        repoId: '2',
        owner: 'microsoft',
        name: 'vscode',
        fullName: 'microsoft/vscode',
        isPrivate: false,
        language: 'TypeScript',
        stars: 150000,
        forks: 25000,
        issues: 5000,
        isMonitored: false,
      },
    ]

    for (const repo of repositories) {
      await prisma.gitHubRepository.upsert({
        where: { repoId: repo.repoId },
        update: {},
        create: repo,
      })
    }
    console.log('✅ Created sample GitHub repositories')

    // Create initial bot log entry
    await prisma.botLog.create({
      data: {
        userId: adminUser.id,
        action: 'STARTUP',
        subreddit: 'system',
        status: 'INFO',
        content: 'Bot system initialized successfully',
        metadata: {
          version: '1.0.0',
          environment: process.env.NODE_ENV || 'development',
        },
      },
    })
    console.log('✅ Created initial bot log entry')

    console.log('🎉 Database seeding completed successfully!')
  } catch (error) {
    console.error('❌ Error during seeding:', error)
    throw error
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

// TODO: Add more comprehensive seed data
// TODO: Add environment-specific seeding
// TODO: Add data import from external sources
// TODO: Add seed data validation
// TODO: Add rollback functionality
// TODO: Add seed data versioning