# Identia - Brand Identity Platform

A modern platform connecting emerging brands with premium retail spaces through intelligent matching.

## Features

- **Brand Passport Creation**: AI-powered brand profile generation
- **Smart Matching**: Intelligent algorithm matching brands with retail spaces
- **Authentication**: Secure user authentication with role-based access
- **Dashboard**: Comprehensive brand and landlord dashboards
- **Responsive Design**: Mobile-first, accessible interface

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Better Auth
- **AI**: OpenAI GPT-4
- **Vector DB**: Pinecone
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- PostgreSQL database
- OpenAI API key
- Pinecone API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/propertymatch1/property-match-container.git
cd property-match-container
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
- `DATABASE_URL`: Your PostgreSQL connection string
- `OPENAI_API_KEY`: Your OpenAI API key
- `PINECONE_API_KEY`: Your Pinecone API key
- `BETTER_AUTH_SECRET`: Generate with `openssl rand -base64 32`
- `NEXT_PUBLIC_BETTER_AUTH_URL`: Your app URL (http://localhost:3000 for dev)

4. Set up the database:
```bash
npm run db:push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm test` - Run tests with Vitest
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Prisma Studio

## Project Structure

```
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── (auth)/       # Authentication pages
│   │   ├── (home)/       # Landing page
│   │   ├── dashboard/    # Dashboard pages
│   │   ├── onboarding/   # Onboarding flows
│   │   └── api/          # API routes
│   ├── components/       # React components
│   │   ├── ui/           # UI components
│   │   └── ai-elements/  # AI-powered components
│   ├── lib/              # Utility libraries
│   ├── server/           # Server-side code
│   │   ├── matching/     # Matching algorithm
│   │   └── external_api/ # External API integrations
│   └── styles/           # Global styles
├── prisma/               # Database schema
└── public/               # Static assets
```

## Environment Variables

See `.env.example` for all required environment variables.

**Security Note**: Never commit `.env` files or expose API keys in your code.

## Deployment

This app is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Contributing

This is a private project. For questions or issues, please contact the maintainers.

## License

Proprietary - All rights reserved

---

Built with ❤️ by the Identia team
