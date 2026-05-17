![CI](https://github.com/syedsaadaliaskari/mystrymsg/actions/workflows/ci.yml/badge.svg)

# MystryMessage — Anonymous Feedback Platform

A full-stack web application that lets users receive anonymous messages and feedback through a shareable public link — no account required for senders. Built with Next.js, TypeScript, MongoDB, and NextAuth.

## 🔗 Live Demo

[https://your-mystrymsg-url.vercel.app](https://your-mystrymsg-url.vercel.app)

**Test login:**

- Email: `test@example.com`
- Password: `password`

---

## 🏗️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose ODM
- **Auth:** NextAuth v5 (JWT, bcrypt password hashing)
- **Validation:** Zod schema validation
- **UI:** shadcn/ui, Tailwind CSS
- **Email:** Resend
- **Deployment:** Vercel

---

## ✨ Features

- **Anonymous Messaging** — shareable public URLs let anyone send feedback without creating an account
- **User Dashboard** — private inbox showing all received anonymous messages
- **Message Controls** — toggle message acceptance on/off at any time
- **Optimistic UI** — instant message deletion with scoped re-renders, no full component remount
- **Secure Auth** — session management via NextAuth with bcrypt-hashed passwords
- **Input Validation** — Zod schema validation on all server-side inputs, no unvalidated data reaches the database
- **Email Verification** — account verification via Resend on signup
- **AI Suggestions** — AI-generated message suggestions for senders

---

## 🚀 Running Locally

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Resend account for emails

### Setup

1. Clone the repository:

```bash
git clone https://github.com/syedsaadaliaskari/mystrymsg.git
cd mystrymsg
```

2. Install dependencies:

```bash
npm install --legacy-peer-deps
```

3. Create `.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
AUTH_SECRET=your_random_secret_key
NEXTAUTH_URL=http://localhost:3000
RESEND_API_KEY=your_resend_api_key
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

src/
├── app/
│ ├── (auth)/ # Login and signup pages
│ ├── (app)/
│ │ └── dashboard/ # User message inbox
│ ├── api/ # API routes
│ └── user/
│ └── [username]/ # Public anonymous message page
├── components/ # Reusable UI components
├── lib/ # Database connection
├── models/ # Mongoose schemas
└── schemas/ # Zod validation schemas

---

## 🔐 Security

- Passwords hashed with bcrypt before storage
- JWT session strategy via NextAuth
- Zod validation on all API inputs
- No plain-text credentials stored at any layer
- Messages fully isolated per user — no cross-user data access

---

## 👨‍💻 Developer

**Syed Saad Ali Askari**

- GitHub: [syedsaadaliaskari](https://github.com/syedsaadaliaskari)
- LinkedIn: www.linkedin.com/in/syed-saad-ali-askari-0934263ab
- Portfolio: [\[your portfolio url\]](https://portfolio-ebon-one-k7poyb641w.vercel.app/)
