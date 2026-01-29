# AI Coding Instructions for my-nuxt-app

## Project Overview
A **Nuxt 4 blog application** that fetches content from a headless WordPress GraphQL API. The app displays blog posts with featured images, news items, and topics from a remote WordPress instance (`arg56sa184.cloudfree.jp`).

## Architecture & Data Flow

### Frontend Stack
- **Framework**: Nuxt 4 (Vue 3) with TypeScript support
- **Styling**: Tailwind CSS + typography plugin
- **GraphQL Client**: `nuxt-graphql-client` (v0.2.46)
- **Data Fetching**: `useAsyncData()` with direct `$fetch()` calls to GraphQL endpoint

### Component Structure
```
app.vue (root layout wrapper)
├── layouts/default.vue (header, footer, slot for pages)
│   ├── AppHeader.vue
│   ├── AppFooter.vue
│   └── <slot /> (page content)
└── pages/ (file-based routing)
    ├── index.vue (home: posts list, news, topics)
    └── post/[id].vue (individual post detail)
```

### Data Fetching Pattern
All pages directly query the external WordPress GraphQL endpoint:
- **Home page** (`pages/index.vue`): Fetches 4 featured posts, 5 news items, 5 topics in parallel
- **Post detail** (`pages/post/[id].vue`): Fetches single post by database ID with variables

**Key Detail**: Database IDs come from URL params (e.g., `/post/123`) and are passed as GraphQL variables to the `post()` query with `idType: DATABASE_ID`.

## Configuration & Secrets

### GraphQL Host Management
- Defined in `nuxt.config.ts` under `runtimeConfig.public.gqlHost`
- **Environment Variable**: `GQL_HOST` (for Vercel deployment)
- **Default Fallback**: `https://arg56sa184.cloudfree.jp/blog/graphql/`
- Must have trailing slash (required by WordPress endpoint)

Access in components: `useRuntimeConfig().public.gqlHost`

## Development Commands
```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run generate # Static site generation
npm run preview  # Preview production build locally
npm run postinstall  # Auto-run by npm (nuxt prepare)
```

## Critical Patterns & Conventions

### Data Fetching
1. **Always use `useAsyncData()`** with unique keys for caching:
   ```typescript
   const { data, error } = await useAsyncData('unique-key-name', () => 
     $fetch(url, { method: 'POST', body: { query, variables } })
   )
   ```
2. Date strings are processed server-side: `new Date(dateStr).toLocaleDateString('ja-JP')`
3. Featured images are optional; always check with `v-if` before rendering

### Routing
- File-based routing in `/pages` directory
- Dynamic routes use bracket syntax: `[id].vue` (accessible via `useRoute().params.id`)
- Navigation uses `<NuxtLink>` component

### Styling
- Tailwind CSS with responsive utilities (e.g., `min-h-screen`, `flex-grow`, `max-w-3xl`)
- Typography plugin loaded for prose content
- Japanese content layout defaults (e.g., `flex flex-col` for column layouts)

## File Organization
- **pages/**: Page components (auto-routed)
- **layouts/**: Layout wrappers (default.vue is implicit)
- **components/**: Reusable Vue components (auto-imported)
- **public/**: Static assets (robots.txt)

## Japanese Content Notes
- UI text uses Japanese (記事一覧に戻る = "Back to article list")
- All date formatting targets Japanese locale: `toLocaleDateString('ja-JP')`
- RSS/SEO elements assume Japanese blog content

## Tailwind Configuration
All Vue files are scanned: `./components/**/*.{js,vue,ts}`, `./layouts/**/*.vue`, `./pages/**/*.vue`, `./app.vue`

## When Adding Features

1. **New GraphQL queries**: Add to component `<script setup>` block, always assign unique key to `useAsyncData()`
2. **New components**: Place in `/components` (auto-imported by Nuxt)
3. **New pages**: Create in `/pages` using file-based routing
4. **Server-side logic**: Use `/server` directory (not yet in project; follow Nuxt guidelines)
5. **Environment config**: Update `runtimeConfig` in `nuxt.config.ts`, reference via `useRuntimeConfig()`
