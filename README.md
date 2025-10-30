🔥 Perfect — here’s a **complete `README.md`** for your new subdomain **`ai-tools.30tools.com`**, explaining its purpose, structure, tech stack, contribution guide, and OpenAI integration.

https://github.com/30tools/aii-tools


This version is written in a clean, developer-friendly tone with a touch of product polish — ideal for GitHub or internal documentation.

---

# 🤖 AI Tools – 30tools.com

**`ai-tools.30tools.com`** is a collection of lightweight, open-source AI-powered utilities built using the [OpenAI API](https://platform.openai.com/docs/), designed to make content creation, coding, writing, and ideation faster and smarter.

Each tool lives independently but shares a consistent design system, architecture, and user experience — powered by **Next.js + shadcn/ui + Tailwind CSS**.

---

## 🚀 Overview

> ⚡️ One platform. Many tiny AI tools.
> Fast, elegant, and instantly usable — powered by OpenAI.

`ai-tools.30tools.com` is part of the **[30tools.com](https://30tools.com)** ecosystem — a growing library of simple, no-login, instantly usable micro-apps.

This subdomain focuses entirely on **AI-powered tools**, like:

* 🧠 **AI Paraphraser** — rewrite text in any tone
* 💬 **Tweet Generator** — generate catchy tweets from ideas
* ✍️ **LinkedIn Formatter** — make posts professional and polished
* 💡 **Startup Idea Generator** — spark ideas instantly
* 🧩 **Code Explainer** — turn any snippet into simple English
* 📚 **Quiz Maker** — convert text into Q&A
* 🔍 **Summarizer** — TL;DR anything

---

## 🧩 Tech Stack

| Layer              | Technology                                                                        |
| ------------------ | --------------------------------------------------------------------------------- |
| Framework          | [Next.js 15 (App Router)](https://nextjs.org/docs)                                |
| UI System          | [shadcn/ui](https://ui.shadcn.com/) + [Tailwind CSS](https://tailwindcss.com/)    |
| Animations         | [Framer Motion](https://www.framer.com/motion/)                                   |
| Backend            | Edge Functions (Vercel)                                                           |
| AI Model           | [OpenAI API](https://platform.openai.com/docs/api-reference) (GPT-4o, GPT-4-mini) |
| Storage (Optional) | Supabase / Local JSON                                                             |
| Deployment         | [Vercel](https://vercel.com/)                                                     |
| Auth (Optional)    | Clerk / None (default no-auth tools)                                              |

---

## 🎨 Design System

All AI tools follow a unified design language defined in:

📁 `/config/design.json`

### Highlights:

* Rounded corners (`rounded-2xl`)
* Soft shadows & white cards
* Accent blue theme (`#3b82f6`)
* Framer Motion for subtle animations
* Reusable layout: Header → Input → Output

This ensures all tools feel **cohesive and branded** under the **30tools** identity.

---

## ⚙️ Architecture

```
ai-tools.30tools.com/
├── app/
│   ├── layout.tsx          # Common layout + design system wrapper
│   ├── (tools)/
│   │   ├── paraphraser/
│   │   │   ├── page.tsx    # Individual AI tool UI
│   │   │   └── api/route.ts # API endpoint using OpenAI
│   │   ├── tweet-generator/
│   │   │   ├── page.tsx
│   │   │   └── api/route.ts
│   │   └── ...
│   └── globals.css         # Tailwind styles
│
├── components/             # Reusable shadcn components
│   ├── ui/                 # Button, Card, Input, etc.
│   ├── layout/             # Header, Footer, Container
│   └── ai/                 # AIResponse, PromptBox, etc.
│
├── lib/
│   ├── openai.ts           # OpenAI API config
│   ├── utils.ts            # Helper functions
│
├── config/
│   └── design.json         # shadcn design system configuration
│
├── .env.local              # OPENAI_API_KEY
├── README.md
└── package.json
```

---

## 🔑 Environment Setup

Create a `.env.local` file in the root directory:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

You can get your API key from [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys).

---

## 🧠 Example API Route

```ts
// app/paraphraser/api/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  const { text, tone } = await req.json();

  const prompt = `Rephrase the following text in a ${tone} tone:\n\n${text}`;
  const completion = await client.responses.create({
    model: "gpt-4o-mini",
    input: prompt,
  });

  return NextResponse.json({
    output: completion.output[0].content[0].text,
  });
}
```

---

## 🧱 Adding a New Tool

To add a new AI tool:

1. **Create a folder** under `/app/(tools)/your-tool-name/`
2. Add a **`page.tsx`** for UI
3. Add a **`api/route.ts`** for backend logic (using OpenAI API)
4. Follow the design system JSON for consistent look
5. Done ✅

You can use a meta prompt like:

> “Using the 30tools design system (from `/config/design.json`), generate a Next.js page for a tool called ‘AI Summarizer’ with a textarea input, a generate button, and an output card.”

---

## 💡 Example Tools

| Tool               | Description                        | Status |
| ------------------ | ---------------------------------- | ------ |
| AI Paraphraser     | Rewrites text in different tones   | ✅      |
| Tweet Generator    | Writes engaging tweets from topics | ✅      |
| Code Explainer     | Explains code in simple English    | ✅      |
| LinkedIn Formatter | Beautifies posts with structure    | 🛠️    |
| Flashcard Maker    | Generates study cards from notes   | 🛠️    |

---

## 🤝 Contributing

We welcome contributions from developers, designers, and creators!

### Steps:

1. Fork the repo
2. Create a new branch
3. Add your tool (in `/app/(tools)/`)
4. Run locally → `npm run dev`
5. Submit a PR

Please ensure your tool:

* Loads instantly
* Uses `OpenAI` API responsibly
* Follows `/config/design.json` styling
* Doesn’t store user data

---

## 📜 License

MIT © [Shaswat Raj](https://shaswat.live) • [@SH20RAJ](https://twitter.com/SH20RAJ)

---

## 🌐 Links

* 🔗 Main site – [https://30tools.com](https://30tools.com)
* 🤖 AI tools – [https://ai-tools.30tools.com](https://ai-tools.30tools.com)
* 💻 GitHub – [https://github.com/SH20RAJ/30tools](https://github.com/SH20RAJ/30tools)
* 📧 Contact – [sh20raj@gmail.com](mailto:sh20raj@gmail.com)

---

Would you like me to create **a “Tool Template Generator” script** next — where you can just type
`npx create-ai-tool paraphraser`
and it auto-creates the `page.tsx`, `api/route.ts`, and `meta.json` files using your design.json?
