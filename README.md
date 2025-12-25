# Modern Next.js Quickstart Skeleton

This is a streamlined starter template designed for rapid development with **Next.js (App Router)** and **Cursor AI**. It is pre-configured with a modern stack and optimized for AI-assisted coding.

## 🛠 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** JavaScript (ES6+)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Client:** [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js:** Version 20.9.0 or later (required for Next.js 16)
- **npm:** Version 7 or later
- **Supabase Account:** Create a free account at [supabase.com](https://supabase.com/)

### First Time Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cursor-skeleton
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase project**
   - Create a new project at [supabase.com](https://supabase.com/)
   - Go to **Settings > API** to get your credentials

4. **Set up environment variables**
   - Create a `.env` file in the root directory
   - Add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="your-publishable-key"
   ```
   > Get these values from your Supabase project: **Settings > API**

5. **Create your database tables**
   - Use the Supabase SQL Editor or Table Editor to create your tables
   - Or use the Supabase Dashboard to manage your schema

## 🏃 Running the Application

This is a **full-stack Next.js application** where the frontend and backend run together in a single development server.

### Development Mode

Start the development server (runs both frontend and backend):
```bash
npm run dev
```

The application will be available at:
- **Frontend:** http://localhost:3000
- **API Routes (Backend):** http://localhost:3000/api/*

### Architecture Overview

- **Frontend:** React components in `src/app/` (Server Components by default)
- **Backend:** API Route Handlers in `src/app/api/` (e.g., `src/app/api/users/route.js`)
- **Database:** Supabase PostgreSQL with Supabase JS Client
- **Client:** Supabase client initialized in `src/lib/db.js`

### Creating API Routes

Create backend endpoints by adding route handlers:
```
src/app/api/users/route.js
```

Example API route:
```javascript
import { supabase } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const { data, error } = await supabase.from('users').select('*')
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data)
}
```

### Production Build

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

### Cloning from Repository

When cloning this project in the future, you only need to:

1. **Set up environment variables**
   - Create a `.env` file with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="your-publishable-key"
   ```
   - Get these from your Supabase project: **Settings > API**

2. **Install dependencies**
   ```bash
   npm install
   ```

That's it! No migrations or schema syncing needed - just connect to your Supabase project.

## 🔗 Supabase Integration

This project uses the **Supabase JS Client** for direct database access:

- **Client Setup:** Supabase client is initialized in `src/lib/db.js`
- **Environment Variables:** Uses `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- **Database Management:** Use Supabase Dashboard or SQL Editor to manage your schema
- **Health Check:** The home page automatically tests your Supabase connection on load

### Using Supabase Client

Import the Supabase client in your components or API routes:

```javascript
import { supabase } from '@/lib/db'

// Query data
const { data, error } = await supabase.from('users').select('*')

// Insert data
const { data, error } = await supabase.from('users').insert({ name: 'John' })

// Update data
const { data, error } = await supabase.from('users').update({ name: 'Jane' }).eq('id', 1)

// Delete data
const { data, error } = await supabase.from('users').delete().eq('id', 1)
```

For more examples and documentation, see the [Supabase JavaScript Client docs](https://supabase.com/docs/reference/javascript/introduction).
