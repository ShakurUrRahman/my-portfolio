# Portfolio Next.js Conversion

This is a complete Next.js conversion of the original React portfolio.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Features

- **Home**: Landing page with hero section
- **About**: Skills and bio
- **Projects**: Project showcase
- **Contact**: Contact form
- **Admin**: Content management (/admin)

## Admin Access

Visit `/admin` or click "Admin" in the navigation.
No password required (for demo purposes).

## Editing Content

All content is stored in `data/content.json` and can be edited through the admin panel or directly in the file.

## File Structure

```
portfolio-nextjs/
├── app/
│   ├── page.tsx          # Main application
│   ├── layout.tsx        # Root layout
│   ├── globals.css       # Global styles
│   └── api/content/      # API for data management
├── data/
│   └── content.json      # All portfolio content
└── package.json
```

## Customization

Edit `data/content.json` to update:
- Your name, bio, and availability
- Skills and proficiency levels
- Projects
- Social links

## Deployment

This is a standard Next.js app. Deploy to:
- Vercel (recommended)
- Netlify
- Any Node.js hosting

```bash
npm run build
npm start
```
