# SR — Personal Portfolio

<div align="center">

```
███████╗██████╗
██╔════╝██╔══██╗
███████╗██████╔╝
╚════██║██╔══██╗
███████║██║  ██║
╚══════╝╚═╝  ╚═╝
```

**Shakur Ur Rahman — Full Stack Developer**

[![Live](https://img.shields.io/badge/Live-shakur.netlify.app-8B5CF6?style=for-the-badge&logo=netlify&logoColor=white)](https://shakur.netlify.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## ✦ Overview

A production-ready personal portfolio built as a horizontal scroll single-page application. Features a space-themed glassmorphism design, a hidden admin panel for live content management, server-rendered project case study pages, and full SMTP email integration.

---

## ✦ Features

- **Horizontal Scroll SPA** — smooth section-based navigation (Home → About → Projects → Experience → Contact)
- **Space Canvas Background** — animated starfield with shooting stars rendered on HTML5 canvas
- **Custom Cursor** — RAF-animated cursor with ring and dot
- **Project Drawer** — slide-in project detail panel with shareable URLs via search params
- **Static Project Pages** — SEO-friendly `/projects/[slug]` pages with full case study content
- **Admin Panel** — password-protected content management system with live editing
    - Home, About, Projects, Experience, Messages tabs
    - Drag-to-reorder projects and skills
    - Toggle skill visibility
    - Debounced auto-save to Supabase
- **Contact Form** — SMTP email via Brevo/Nodemailer with styled HTML email template
- **Loader** — space-themed animated intro loader with progress bar
- **Fully Responsive** — optimized for mobile, tablet, and desktop

---

## ✦ Tech Stack

| Category   | Technology                      |
| ---------- | ------------------------------- |
| Framework  | Next.js 15 (App Router)         |
| Language   | TypeScript                      |
| Styling    | Tailwind CSS + Custom CSS       |
| Database   | Supabase (PostgreSQL + JSONB)   |
| Email      | Nodemailer + Brevo SMTP         |
| Fonts      | Syne (display) + DM Mono (mono) |
| Deployment | Netlify                         |

---

## ✦ Project Structure

```
app/
├── @modal/                    # Parallel route slot (reserved)
├── api/
│   ├── auth/                  # Admin login/logout/check
│   ├── contact/               # SMTP email handler
│   └── data/                  # Supabase GET/POST
├── components/
│   ├── admin/                 # Admin panel components
│   │   ├── admin-panel.tsx
│   │   ├── admin-home.tsx
│   │   ├── admin-about.tsx
│   │   ├── admin-projects.tsx
│   │   ├── admin-experience.tsx
│   │   └── admin-messages.tsx
│   ├── drawer-subcomponents/  # Project drawer parts
│   ├── project/               # Shared project components
│   ├── about-section.tsx
│   ├── contact-section.tsx
│   ├── experience-section.tsx
│   ├── home-section.tsx
│   ├── loader.tsx
│   ├── nav.tsx
│   ├── portfolio-main.tsx
│   ├── project-drawer.tsx
│   ├── projects-section.tsx
│   └── space-background.tsx
├── projects/
│   └── [slug]/                # Static project case study pages
├── globals.css
├── layout.tsx
└── page.tsx                   # Server component, fetches from Supabase
lib/
└── getData.ts                 # Shared Supabase data fetcher
data/
└── data.json                  # Local dev fallback
```

---

## ✦ Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project with a `portfolio` table
- A [Brevo](https://brevo.com) account for SMTP email

### Supabase Setup

Run this in your Supabase SQL editor:

```sql
CREATE TABLE portfolio (
  id text PRIMARY KEY,
  data jsonb,
  updated_at timestamp
);

INSERT INTO portfolio (id, data)
VALUES ('main', '{"home":{},"about":{},"projects":[],"experience":[],"messages":[]}'::jsonb);

ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON portfolio FOR SELECT USING (true);
CREATE POLICY "Allow service role write" ON portfolio FOR ALL USING (auth.role() = 'service_role');
```

### Installation

```bash
git clone https://github.com/ShakurUrRahman/my-portfolio.git
cd my-portfolio
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
ADMIN_PASSWORD=your_admin_password
BREVO_SMTP_USER=your_brevo_smtp_user
BREVO_SMTP_KEY=your_brevo_smtp_key
CONTACT_EMAIL=your_email@gmail.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## ✦ Admin Panel

The portfolio includes a hidden admin panel for managing all content without touching code.

**Access:** Click the **SR** logo **5 times within 2 seconds**

**Features:**

- Edit home section (name, title, description)
- Edit about section (bio, skills with drag-to-reorder, social links, availability toggle)
- Manage projects (add/edit/delete, drag-to-reorder, visibility toggle)
- Manage experience entries
- View contact messages

All changes auto-save to Supabase within 800ms.

---

## ✦ Deployment

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add all environment variables in **Site Settings → Environment Variables**
5. Install the `@netlify/plugin-nextjs` plugin

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

<div align="center">
  <p>Designed & built by <strong>Shakur Ur Rahman</strong></p>
  <p>
    <a href="https://shakur.netlify.app">Portfolio</a> ·
    <a href="https://github.com/ShakurUrRahman">GitHub</a> ·
    <a href="https://linkedin.com/in/shakururrahman">LinkedIn</a>
  </p>
</div>
