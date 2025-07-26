# Development Guide

## Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- PostgreSQL database
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/peermonkey/github-copilot-reddit-agent.git
   cd github-copilot-reddit-agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/github_copilot_reddit_agent"
   
   # Authentication
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   
   # Reddit API
   REDDIT_CLIENT_ID="your-reddit-client-id"
   REDDIT_CLIENT_SECRET="your-reddit-client-secret"
   REDDIT_USERNAME="your-bot-username"
   REDDIT_PASSWORD="your-bot-password"
   
   # GitHub API
   GITHUB_TOKEN="your-github-token"
   
   # OpenAI (optional)
   OPENAI_API_KEY="your-openai-key"
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

## Development Workflow

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

### Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Type Checking

```bash
# Check TypeScript types
npm run type-check
```

### Database Operations

```bash
# Push schema changes to database
npm run db:push

# Create and run migrations
npm run db:migrate

# Seed database with initial data
npm run db:seed

# Open Prisma Studio
npm run db:studio
```

## Project Structure

### Directory Organization

```
src/
├── app/                 # Next.js app router
│   ├── (auth)/         # Authentication routes
│   ├── (dashboard)/    # Dashboard routes
│   ├── api/            # API routes
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── auth/          # Authentication components
│   ├── dashboard/     # Dashboard components
│   ├── bot/           # Bot management components
│   ├── ui/            # UI components
│   └── layout/        # Layout components
├── lib/               # Utility functions
├── services/          # External API services
├── types/             # TypeScript definitions
└── middleware.ts      # Next.js middleware
```

### File Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Pages**: lowercase with hyphens (e.g., `user-profile/page.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Types**: PascalCase interfaces (e.g., `User`, `BotConfig`)

### Import Organization

1. React and Next.js imports
2. Third-party library imports
3. Internal component imports
4. Internal utility imports
5. Type imports (using `import type`)

Example:
```typescript
import { useState } from 'react'
import { NextRequest } from 'next/server'
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'
import type { User } from '@/types/auth'
```

## Contributing

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Commit Messages

Use conventional commit format:

```
type(scope): description

feat(auth): add user registration
fix(bot): resolve comment posting issue
docs(readme): update installation instructions
```

### Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Add tests for new functionality
4. Ensure all tests pass
5. Update documentation if needed
6. Submit a pull request

### Code Review Guidelines

- All code must be reviewed before merging
- Tests must pass
- Code coverage should not decrease
- Documentation must be updated for new features

## Debugging

### Local Development

1. **Check logs in terminal**
2. **Use browser developer tools**
3. **Check database with Prisma Studio**
4. **Review environment variables**

### Common Issues

**Database connection errors:**
- Verify PostgreSQL is running
- Check `DATABASE_URL` in `.env.local`
- Ensure database exists

**API errors:**
- Check API keys in environment variables
- Verify external service availability
- Review rate limiting

**Build errors:**
- Clear `.next` directory: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run type-check`

## Performance

### Optimization Tips

1. **Use Next.js built-in optimizations**
   - Image optimization
   - Font optimization
   - Bundle analysis

2. **Database queries**
   - Use Prisma query optimization
   - Implement proper indexing
   - Use connection pooling

3. **API rate limiting**
   - Implement caching
   - Use proper pagination
   - Monitor external API usage

### Monitoring

- Use Vercel Analytics for performance metrics
- Monitor database performance with Prisma metrics
- Track external API usage and rate limits

## Deployment

### Environment Variables

Ensure all required environment variables are set in production:

- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `REDDIT_*` variables
- `GITHUB_TOKEN`

### Build Process

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Vercel Deployment

1. Connect repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Reddit API Documentation](https://www.reddit.com/dev/api/)
- [GitHub API Documentation](https://docs.github.com/en/rest)