# Project Setup Guide

This project is a monorepo containing two main applications: a Sanity Studio and a Next.js web application. This guide will walk you through setting up the project and understanding the TypeScript type generation workflow.

## Prerequisites

- Node.js (v18 or later recommended)
- npm, yarn, pnpm, or bun package manager
- A Sanity account and project (for the Studio)

## Project Structure

```
ui-blocks-example/
├── sanity/          # Sanity Studio project
└── web/             # Next.js frontend application
```

## Environment Variables

This project requires environment variables to be configured for both the Sanity Studio and the Next.js application. Each project has its own environment configuration file.

### Sanity Studio Environment Variables

Create a `.env.local` file in the `sanity/` directory:

```bash
cd sanity
cp .env.example .env.local
```

Then edit `.env.local` with your Sanity project credentials:

```env
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
```

You can find your project ID in your [Sanity project settings](https://www.sanity.io/manage).

### Next.js Application Environment Variables

Create a `.env.local` file in the `web/` directory:

```bash
cd web
cp .env.example .env.local
```

Then edit `.env.local` with your Sanity project credentials:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

**Important Notes:**

- The `NEXT_PUBLIC_` prefix is required for Next.js to expose these variables to the browser
- The project ID and dataset must match between both applications
- The API version should be a date string in `YYYY-MM-DD` format
- For preview mode or authenticated requests, you may also need `SANITY_API_READ_TOKEN`

### Environment Variable Files

Each project should have:

- `sanity/.env.local` - Sanity Studio environment variables (not committed to git)
- `web/.env.local` - Next.js environment variables (not committed to git)
- `sanity/.env.example` - Example file for Sanity (committed to git)
- `web/.env.example` - Example file for Next.js (committed to git)

The `.env.local` files are gitignored and should never be committed. Use the `.env.example` files as templates.

## Installation

This is a monorepo with separate package.json files for each application. You need to install dependencies for both projects.

### 1. Install Sanity Studio Dependencies

Navigate to the sanity directory and install dependencies:

```bash
cd sanity
npm install
```

This will install all dependencies required for the Sanity Studio, including:

- Sanity CLI and Studio packages
- React and React DOM
- TypeScript and development tools

### 2. Install Web Application Dependencies

Navigate to the web directory and install dependencies:

```bash
cd web
npm install
```

This will install all dependencies required for the Next.js application, including:

- Next.js framework
- React and React DOM
- Sanity client libraries
- Tailwind CSS
- TypeScript and development tools

## Running the Applications

### Sanity Studio

To start the Sanity Studio development server:

```bash
cd sanity
npm run dev
```

The Studio will be available at `http://localhost:3333` by default.

### Web Application

To start the Next.js development server:

```bash
cd web
npm run dev
```

The web application will be available at `http://localhost:3000` by default.

## TypeScript Type Generation

This project uses [Sanity TypeGen](https://www.sanity.io/docs/apis-and-sdks/sanity-typegen) to generate TypeScript definitions from your Sanity Studio schema and GROQ queries. This ensures type safety when working with content from the Sanity Content Lake API.

### What is TypeGen?

Sanity TypeGen generates TypeScript type definitions in two ways:

1. **Schema Types**: Generates types based on your Sanity Studio schema definitions (e.g., `Post`, `Author`, etc.)
2. **GROQ Query Types**: Analyzes your GROQ queries in the frontend code and generates specific types for query results

This provides:

- Type safety when handling data from Sanity
- Autocomplete for fields available in query results
- Easier refactoring when schema changes
- Early detection of bugs from incorrect data handling

### TypeGen Configuration

The TypeGen configuration is located in `sanity/sanity.cli.ts`:

```typescript
typegen: {
  path: '../web/app/**/*.{ts,tsx,js,jsx}',  // Where to find GROQ queries
  schema: 'schema.json',                     // Extracted schema file
  generates: '../web/sanity.types.ts',      // Output file for generated types
  overloadClientMethods: true,               // Enable automatic type inference
}
```

### Generating Types

#### From the Web Directory

You can generate types from the web directory using:

```bash
cd web
npm run typegen
```

This command will:

1. Navigate to the sanity directory
2. Extract the schema from your Studio code (`sanity schema extract`)
3. Generate TypeScript types (`sanity typegen generate`)

The generated types will be available in `web/sanity.types.ts`.

#### From the Sanity Directory

Alternatively, you can generate types directly from the sanity directory:

```bash
cd sanity
npm run typegen
```

This performs the same operations but runs from the Sanity project root.

### Watch Mode

For active development, you can use watch mode to automatically regenerate types when changes are detected:

```bash
cd web
npm run typegen:watch
```

Watch mode monitors:

- Changes to GROQ queries in `web/app/**/*.{ts,tsx,js,jsx}`
- Changes to `sanity/schema.json` (when you run `sanity schema extract`)

When you modify a GROQ query or extract a new schema, the types will be regenerated automatically.

### Workflow

#### When You Modify the Schema

1. Make changes to your schema files in `sanity/schema-types/`
2. Extract the updated schema:
   ```bash
   cd sanity
   npx sanity schema extract
   ```
3. Generate updated types:
   ```bash
   cd web
   npm run typegen
   ```
   Or if watch mode is running, it will detect the schema.json change and regenerate automatically.

#### When You Create or Modify GROQ Queries

1. Create or modify GROQ queries in your frontend code (e.g., `web/app/page.tsx`)
2. If watch mode is running, types will be regenerated automatically
3. Otherwise, run:
   ```bash
   cd web
   npm run typegen
   ```

### Using Generated Types

Import and use the generated types in your frontend code:

```typescript
import { type Post } from "@/sanity.types";

const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] {
  _id,
  title,
  slug,
}`;

const posts = await client.fetch<Post[]>(POSTS_QUERY, {}, options);
```

The `overloadClientMethods: true` option enables automatic type inference for Sanity client methods, so you may not always need to explicitly type the fetch results.

### Important Notes

- The generated `sanity.types.ts` file should not be edited manually - it will be overwritten on the next generation
- Always run type generation after making schema changes to keep types in sync
- Watch mode is recommended during active development to maintain type accuracy
- For more detailed information, see the [official Sanity TypeGen documentation](https://www.sanity.io/docs/apis-and-sdks/sanity-typegen)

## Available Scripts

### Sanity Studio (`sanity/package.json`)

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run deploy` - Deploy Studio to Sanity
- `npm run typegen` - Extract schema and generate types

### Web Application (`web/package.json`)

- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typegen` - Generate TypeScript types from schema and queries
- `npm run typegen:watch` - Watch mode for automatic type regeneration

## Troubleshooting

### Types are out of date

If you notice type errors or missing fields:

1. Ensure you've extracted the latest schema:
   ```bash
   cd sanity
   npx sanity schema extract
   ```
2. Regenerate types:
   ```bash
   cd web
   npm run typegen
   ```

### Watch mode not detecting changes

- Ensure you're running watch mode from the `web` directory
- Check that the file paths in `sanity.cli.ts` match your project structure
- Restart the watch process if needed

### Type generation fails

- Verify that `sanity/schema.json` exists (run `sanity schema extract` first)
- Check that your GROQ queries use the `groq` template literal or `defineQuery`
- Ensure all queries are assigned to variables (inline queries are not supported)

## Additional Resources

- [Sanity TypeGen Documentation](https://www.sanity.io/docs/apis-and-sdks/sanity-typegen)
- [Sanity CLI Documentation](https://www.sanity.io/docs/cli)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Next.js Documentation](https://nextjs.org/docs)
