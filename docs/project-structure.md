# Project Structure

## Directory Tree

```
github-copilot-reddit-agent/
├── docs/                           # Documentation files
│   ├── architecture.md            # System architecture documentation
│   ├── api.md                     # API documentation
│   ├── deployment.md              # Deployment guide
│   └── development.md             # Development setup guide
├── prisma/                        # Database schema and migrations
│   ├── schema.prisma              # Prisma database schema
│   ├── migrations/                # Database migration files
│   └── seed.ts                    # Database seeding script
├── public/                        # Static assets
│   ├── icons/                     # Application icons
│   ├── images/                    # Static images
│   └── favicon.ico                # Favicon
├── src/                           # Source code
│   ├── app/                       # Next.js app router
│   │   ├── (auth)/               # Authentication routes group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/          # Dashboard routes group
│   │   │   ├── analytics/
│   │   │   │   └── page.tsx
│   │   │   ├── bot-management/
│   │   │   │   └── page.tsx
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── api/                  # API routes
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── register/
│   │   │   │       └── route.ts
│   │   │   ├── bot/
│   │   │   │   ├── config/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── logs/
│   │   │   │   │   └── route.ts
│   │   │   │   └── status/
│   │   │   │       └── route.ts
│   │   │   ├── github/
│   │   │   │   ├── copilot/
│   │   │   │   │   └── route.ts
│   │   │   │   └── webhooks/
│   │   │   │       └── route.ts
│   │   │   └── reddit/
│   │   │       ├── comments/
│   │   │       │   └── route.ts
│   │   │       ├── posts/
│   │   │       │   └── route.ts
│   │   │       └── webhooks/
│   │   │           └── route.ts
│   │   ├── globals.css           # Global CSS styles
│   │   ├── layout.tsx            # Root layout component
│   │   ├── loading.tsx           # Global loading component
│   │   ├── not-found.tsx         # 404 page
│   │   └── page.tsx              # Home page
│   ├── components/               # Reusable React components
│   │   ├── auth/                 # Authentication components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── AuthProvider.tsx
│   │   ├── dashboard/            # Dashboard components
│   │   │   ├── DashboardNav.tsx
│   │   │   ├── StatsCard.tsx
│   │   │   └── ActivityFeed.tsx
│   │   ├── bot/                  # Bot management components
│   │   │   ├── BotConfig.tsx
│   │   │   ├── BotStatus.tsx
│   │   │   └── BotLogs.tsx
│   │   ├── ui/                   # UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Toast.tsx
│   │   └── layout/               # Layout components
│   │       ├── Header.tsx
│   │       ├── Sidebar.tsx
│   │       └── Footer.tsx
│   ├── lib/                      # Utility functions and configurations
│   │   ├── auth.ts              # Authentication configuration
│   │   ├── db.ts                # Database connection
│   │   ├── utils.ts             # General utilities
│   │   ├── constants.ts         # Application constants
│   │   └── validations.ts       # Form validation schemas
│   ├── services/                # External service integrations
│   │   ├── reddit/              # Reddit API integration
│   │   │   ├── client.ts
│   │   │   ├── bot.ts
│   │   │   └── types.ts
│   │   ├── github/              # GitHub API integration
│   │   │   ├── client.ts
│   │   │   ├── copilot.ts
│   │   │   └── types.ts
│   │   └── openai/              # OpenAI API integration
│   │       ├── client.ts
│   │       └── types.ts
│   ├── types/                   # TypeScript type definitions
│   │   ├── auth.ts              # Authentication types
│   │   ├── bot.ts               # Bot-related types
│   │   ├── reddit.ts            # Reddit API types
│   │   ├── github.ts            # GitHub API types
│   │   └── database.ts          # Database types
│   └── middleware.ts            # Next.js middleware
├── tests/                       # Test files
│   ├── __mocks__/              # Test mocks
│   ├── components/             # Component tests
│   ├── services/               # Service tests
│   └── api/                    # API route tests
├── .env.example                # Environment variables example
├── .env.local                  # Local environment variables (gitignored)
├── .gitignore                  # Git ignore rules
├── .eslintrc.json             # ESLint configuration
├── .prettierrc                # Prettier configuration
├── jest.config.js             # Jest test configuration
├── next.config.js             # Next.js configuration
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Project documentation
```

## Key Directories Explained

### `/src/app/` - Next.js App Router
- Uses the new App Router with route groups for organization
- `(auth)` and `(dashboard)` are route groups for better organization
- API routes are co-located with the app structure

### `/src/components/` - React Components
- Organized by feature area (auth, dashboard, bot, ui, layout)
- Reusable UI components follow atomic design principles
- Each component includes TypeScript types and proper props

### `/src/services/` - External Integrations
- Reddit service for bot functionality and API interactions
- GitHub service for Copilot integration and repository management
- OpenAI service for enhanced AI capabilities

### `/src/lib/` - Shared Utilities
- Authentication configuration using NextAuth.js
- Database connection and utility functions
- Validation schemas using Zod
- Application constants and helper functions

### `/prisma/` - Database Management
- Prisma schema for type-safe database operations
- Migration files for database versioning
- Seed script for initial data population

### `/tests/` - Testing Infrastructure
- Component tests using React Testing Library
- Service tests for external API integrations
- API route tests for backend functionality
- Mock implementations for testing

## File Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Pages**: lowercase with hyphens (e.g., `user-profile/page.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE exported as const
- **Types**: PascalCase with descriptive names

## Import Organization

1. React and Next.js imports
2. Third-party library imports
3. Internal component imports
4. Internal utility imports
5. Type imports (using `import type`)

## Environment Variables

- Development: `.env.local`
- Production: Set in deployment platform
- Example file: `.env.example` with all required variables documented