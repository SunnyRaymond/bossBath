# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- **No login required**: Just open the app and start tracking!
- **Apple-style mode switcher**: Toggle between Raymond (record) and Hannah (stats) modes.
- **Raymond Mode**:
  - Record a shower: date, start time, end time, location (auto or manual), notes, mark as featured.
  - View all previous showers, with featured and location/notes highlights.
- **Hannah Mode**:
  - See how many showers Raymond took today.
  - See last shower details: when, where, how long, notes.
  - See which day had the most showers, and which locations.
  - Fun stats: average per day, most common location, most recent featured shower, and more.
- **Responsive design**: Looks great on both mobile and laptop screens.
- **Lovely, attractive UI**: Uses TailwindCSS for a modern, colorful, and non-minimalist look.

## Usage

1. Clone the repo and install dependencies:
   ```
   npm install
   ```
2. Create a `.env.local` file as described above.
3. Start the dev server:
   ```
   npm run dev
   ```
4. Open the app in your browser. Use the switch at the top to toggle between Raymond and Hannah modes.

---

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

## Environment Variables

Create a `.env.local` file in the project root with the following format:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Replace `your-supabase-url` and `your-supabase-anon-key` with your actual Supabase project credentials.

## Dependencies

Install the required dependency:

```
npm install @supabase/supabase-js
```

---

Built with ❤️ using React Router.
