# Student Portfolio v2

A React-based student portfolio system with Supabase backend.

## Features

- 📁 File sharing (video, image, audio, documents)
- 💬 Chat system (general + private)
- 👥 User management (Admin, Teacher, Student roles)
- 📝 Comments & likes on files
- 🔔 Notifications
- 🌙 Dark mode
- ✨ Loading progress indicators

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Option 2: Netlify

```bash
# Build
npm run build

# Deploy
netlify deploy --prod --dir=build
```

### Option 3: Python Server + React

For the Python caching version:

1. Deploy React to Vercel/Netlify
2. Deploy Python server to Railway or Render
3. Update `src/utils/apiConfig.js` with your server URL

## Environment Variables

Create `.env.local` with:
```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_KEY=your_anon_key
```

## User Roles

| Role | Permissions |
|------|-------------|
| Admin | Manage users, view all files, settings |
| Teacher | View all student files, send files, chat |
| Student | Upload files, view own portfolio, chat |

## License

MIT
