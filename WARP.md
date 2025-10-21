# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- Stack: Next.js 14 (App Router) with TypeScript, Prisma ORM targeting MongoDB, NextAuth, Tailwind CSS (with uploadthing integration), Radix UI and MUI components.
- Package manager: npm (package-lock.json present).
- Images: next/image is configured to allow external images from utfs.io.

Key commands
- Install deps
  ```bash path=null start=null
  npm install
  ```
- Dev server
  ```bash path=null start=null
  npm run dev
  ```
- Build
  ```bash path=null start=null
  npm run build
  ```
- Start production server
  ```bash path=null start=null
  npm run start
  ```
- Lint
  ```bash path=null start=null
  npm run lint
  ```
- Prisma (requires MONGODB_URL)
  - Generate client after schema changes
    ```bash path=null start=null
    export MONGODB_URL={{MONGODB_URL}}
    npx prisma generate
    ```
  - Apply schema to the database (MongoDB)
    ```bash path=null start=null
    npx prisma db push
    ```
  - Inspect/edit data
    ```bash path=null start=null
    npx prisma studio
    ```

What exists versus what doesn’t
- Tests: No test runner/scripts are defined in package.json. If you need tests, choose a runner (e.g., Vitest/Jest) and add the appropriate scripts before expecting test commands.

High-level architecture
- Routing and UI (Next.js App Router)
  - The app directory is organized with route groups for distinct surfaces: (admin), (auth), (dashboard). Pages and components live under these groups, e.g. HR features under dashboard and admin sections.
  - Styling uses Tailwind CSS tokens via CSS variables and components from Radix UI and MUI.
  - Path aliases: TypeScript is configured with @/* for root-relative imports.
  - Relevant snippets:
    - next.config.mjs image remote patterns
      ```js path=/home/kronos/Projects/next-hr/next.config.mjs start=1
      /** @type {import('next').NextConfig} */
      const nextConfig = {
          images: {
              remotePatterns: [
                  {
                      protocol: 'https',
                      hostname: 'utfs.io'
                  }
              ]
          }
      };

      export default nextConfig;
      ```
    - Tailwind content scanning and plugins
      ```ts path=/home/kronos/Projects/next-hr/tailwind.config.ts start=4
      const config = {
        darkMode: ["class"],
        content: [
          './pages/**/*.{ts,tsx}',
          './components/**/*.{ts,tsx}',
          './app/**/*.{ts,tsx}',
          './src/**/*.{ts,tsx}',
        ],
        ...
        plugins: [
          require("tailwindcss-animate"),
          require('@tailwindcss/forms')
        ],
      } satisfies Config
      export default withUt(config)
      ```
    - TypeScript path alias
      ```json path=/home/kronos/Projects/next-hr/tsconfig.json start=24
      "paths": {
        "@/*": [
          "./*"
        ]
      }
      ```
- API layer (route handlers under app/api)
  - REST-like endpoints for HR workflows such as interviews, leave, loans, payslips, etc. Dynamic routes handle entity IDs and status transitions.
  - Client-side requests typically go through a small helper in lib/apiRequest.ts, which prefixes /api and standardizes errors/toasts.
    ```ts path=/home/kronos/Projects/next-hr/lib/apiRequest.ts start=3
    export async function makeApiRequest(
      setLoading: (loading: boolean) => void,
      url: string,
      data: any = {},
      resourceName: string,
      reset: () => void,
      method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'POST'
    ) {
      ...
      const response = await fetch(`/api/${url}`, options);
      ...
    }
    ```
- Data model (Prisma + MongoDB)
  - Prisma schema targets MongoDB via MONGODB_URL. The domain spans HR (User, Employee, Leave, Loans, Payslip, Interview, Review, InterviewAccess, HrReport), Inventory (Item, Category, Unit, Brand, Supplier, Warehouse, stock adjustments), Fleet (Vehicle, Driver, FleetInvoice, FleetReport, Tracking), Sales/Purchases (SalesReport, PurchaseReport, Payments, PaymentsReport), and Projects.
  - Relationships are modeled with ObjectId references and onDelete behaviors where applicable.
  - Relevant snippet:
    ```prisma path=/home/kronos/Projects/next-hr/prisma/schema.prisma start=7
    generator client {
      provider = "prisma-client-js"
    }

    datasource db {
      provider = "mongodb"
      url      = env("MONGODB_URL")
    }
    ```
- Authentication
  - next-auth and @auth/prisma-adapter are present in dependencies, indicating a Prisma-backed auth setup. Login UI exists under app/(auth)/auth/login. If you add providers or callbacks, ensure the Prisma adapter aligns with the User model in schema.prisma.

Package scripts (source of truth)
```json path=/home/kronos/Projects/next-hr/package.json start=5
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

Operational notes for Warp
- Prefer npm (package-lock.json exists). Avoid mixing package managers.
- Database operations require MONGODB_URL to be set in the environment before running Prisma commands or the app server.
- When adding new external image hosts, update next.config.mjs images.remotePatterns accordingly.
- Use the @/* path alias for imports instead of long relative paths.
