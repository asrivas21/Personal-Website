# Portfolio Redesign — Implementation Plan
**Site:** amansrivastava.com  
**Stack:** Next.js + TypeScript + Tailwind CSS + Framer Motion  
**Target:** FAANG / Tier-1 fintech recruiters, Fall 2026 internship cycle

---

## Pre-build checklist (do these first, before touching code)

- [ ] Fix HTTPS — your site currently shows "Not Secure" in the browser. If hosted on Vercel, this is automatic. If on another host, provision an SSL cert immediately. This is a trust signal problem before anyone reads a word.
- [ ] Remove your phone number from the site. It's publicly indexed by Google. Email only.
- [ ] Delete `bias-lens-improvement-plan.md` from the BiasLens repo root.
- [ ] Deploy BiasLens to Vercel before launch so the "Live" badge on the projects section actually links somewhere.

---

## Design system

Keep your existing aesthetic DNA — don't blow it up. The serif type, minimal chrome, and white base are right. The changes are additive and structural, not a full rebrand.

### Typography
```
Headings:       Playfair Display or your current serif — keep it
Body / UI:      Inter or Geist (already in Next.js default)
Monospace:      JetBrains Mono — for tech stack pills and code accents
```

### Color palette
```
Background:     #FFFFFF (keep white)
Text primary:   #0A0A0A
Text secondary: #6B6B6B
Border:         #E5E5E5
Accent — ML/AI:     #3B5BDB (blue)
Accent — Fintech:   #2F9E44 (green)
Accent — Infra/AWS: #E67700 (amber)
Accent — Systems:   #7048E8 (purple)
Live badge:     #2F9E44
```
Category accents are used on project card left borders only. Everything else stays monochrome.

### Motion
Install Framer Motion:
```bash
npm install framer-motion
```
Rules:
- Scroll-triggered fade-up on every section (0.4s ease, 24px Y offset)
- Hero name animation: keep existing, just make sure it fires on load not on scroll
- No infinite loops, no auto-playing carousels
- Timeline nodes: draw-in animation as user scrolls to that point (use `useInView`)
- Project cards: subtle lift on hover (`y: -4`, `boxShadow` increase), 150ms

---

## Section-by-section implementation

---

### Section 0 — Nav

**Current:** None visible  
**New:** Minimal fixed top bar, appears after scrolling 80px

```tsx
// components/Nav.tsx
// Sits fixed at top, transparent until scroll threshold
// Items: logo (AS monogram) | work · projects · now | GitHub icon | resume PDF link

const navItems = ["work", "projects", "now"];
```

- Logo: "AS" in your serif font, links to `#hero`
- Right side: GitHub icon + "resume" as a small outlined pill that opens your PDF in a new tab
- Background: `rgba(255,255,255,0.85)` with `backdrop-filter: blur(12px)` on scroll
- No hamburger on desktop. Mobile: simple overlay.

---

### Section 1 — Hero

**Current:** Name + rotating skill wheel in a void  
**New:** Name + one-line positioning statement + three links + optional live ticker

#### Layout
```
[large vertical whitespace]

  Aman Srivastava          ← keep existing serif animation, exact same

  I build systems — RAG pipelines, financial data infrastructure,
  media bias detection. Rising senior at UMD. Currently at IBM.

  [GitHub]  [LinkedIn]  [Email]

[large vertical whitespace]
```

#### Copy (exact text)
```
I build systems — RAG pipelines, financial data infrastructure,
media bias detection. Rising senior at UMD. Currently at IBM.
```
One sentence. No bullet points. No "Hi I'm a passionate developer." The period after IBM is intentional — confident, clipped.

#### Implementation
```tsx
// app/page.tsx — Hero section
<section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center px-6">
  
  {/* Keep your existing name animation exactly as-is */}
  <AnimatedName />   

  {/* Subtitle — fade in 0.3s after name animation completes */}
  <motion.p
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8, duration: 0.5 }}
    className="mt-6 text-lg text-[#6B6B6B] max-w-lg leading-relaxed font-[Inter]"
  >
    I build systems — RAG pipelines, financial data infrastructure,
    media bias detection. Rising senior at UMD. Currently at IBM.
  </motion.p>

  {/* Links — fade in 0.2s after subtitle */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.2, duration: 0.4 }}
    className="mt-8 flex gap-6 items-center"
  >
    <a href="https://github.com/asrivas21" target="_blank">
      <GitHubIcon className="w-5 h-5 text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors" />
    </a>
    <a href="https://linkedin.com/in/aman-srivastava-88652a210" target="_blank">
      <LinkedInIcon className="w-5 h-5 text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors" />
    </a>
    <a href="mailto:amansrivastava13572@gmail.com">
      <MailIcon className="w-5 h-5 text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors" />
    </a>
  </motion.div>

</section>
```

#### Optional: Live Bias Ticker (high-impact add, do after everything else works)
Below the three links, a thin horizontal strip:
```
LIVE  |  "Politicians are failing the country" → BIASED 94%  |  powered by BiasLens ↗
```
- Pulls a hardcoded set of 5–6 example sentences (don't call the API on every page load — rate limits)
- Rotates through them every 6 seconds with a crossfade
- Links to your BiasLens live URL
- Subtle green dot pulsing next to "LIVE"
- This communicates the project without requiring the visitor to scroll to it

```tsx
// components/BiasTicker.tsx
const EXAMPLES = [
  { text: "Politicians are destroying the country with reckless policy.", result: "BIASED", score: 94 },
  { text: "The Federal Reserve raised interest rates by 25 basis points.", result: "NEUTRAL", score: 8 },
  { text: "Radical activists are tearing apart our communities.", result: "BIASED", score: 97 },
  { text: "The bill passed with 68 votes in the Senate.", result: "NEUTRAL", score: 5 },
  { text: "Globalist elites continue to undermine working families.", result: "BIASED", score: 99 },
];
// Rotate with setInterval every 6000ms, crossfade with Framer Motion AnimatePresence
```

---

### Section 2 — Projects

**Current:** Three macOS window cards with walls of text, no links, no stack pills, no visual hierarchy  
**New:** Full-width cards with left accent border, one-line hook, stack pills, live/GitHub links

#### Card anatomy
```
┌─[colored left border 3px]────────────────────────────────┐
│                                                           │
│  [LIVE ●]  [FINTECH]              [↗ Demo]  [< GitHub]   │
│                                                           │
│  Bias Lens                                                │
│  One sentence that captures what makes this interesting.  │
│                                                           │
│  [Next.js] [TypeScript] [Python] [FastAPI] [D3.js]        │
│  [Whisper] [HuggingFace] [Supabase] [Playwright]          │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

#### Project order and content

**1. Bias Lens** `accent: #3B5BDB (blue)`
```
hook:   "Multi-signal bias detection for news and short-form video — 
         TikTok, YouTube Shorts, Reels, X."
stack:  Next.js · TypeScript · Python · FastAPI · OpenAI · HuggingFace · 
        Whisper · D3.js · Supabase · Playwright · Vercel + Render
badge:  LIVE
```

**2. IBM RAG Platform** `accent: #7048E8 (purple)`
```
hook:   "Enterprise RAG knowledge platform demoed to 40–60 C-suite 
         clients. 762-chunk hybrid retrieval on LinuxONE."
stack:  FastAPI · pgvector · Qwen · Ollama · Next.js · LinuxONE · IBM MQ
badge:  IBM INTERNSHIP
note:   No public repo (enterprise). Add "private — available on request" 
        where the GitHub button would be.
```

**3. Serverless Financial Data Pipeline** `accent: #2F9E44 (green)`
```
hook:   "Event-driven stock and crypto ingestion pipeline — Kinesis to 
         DynamoDB to a live React dashboard."
stack:  AWS Lambda · Kinesis · DynamoDB · S3 · API Gateway · 
        React · TypeScript · Recharts · GitHub Actions · Python
badge:  IN PROGRESS
```

**4. FGC — Bond Portfolio Optimizer** `accent: #2F9E44 (green)`
```
hook:   "SciPy Differential Evolution optimizer enforcing budget, 
         duration, and credit constraints across live bond portfolios."
stack:  Python · SciPy · Pandas · NumPy
badge:  FINTECH INTERNSHIP
note:   No public repo (proprietary). Same treatment as IBM — 
        "private — available on request."
```

**5. Autonomous AI Research Agent** `accent: #3B5BDB (blue)`
```
hook:   "LangChain agent that decomposes research queries, runs 
         sub-tasks in parallel, and emits structured JSON reports."
stack:  Python · LangChain · OpenAI · ChromaDB · PyMuPDF · arXiv API
```

#### Implementation

```tsx
// components/ProjectCard.tsx
interface Project {
  title: string;
  hook: string;
  stack: string[];
  accent: string;
  badge?: string;
  badgeType?: "live" | "wip" | "work" | "private";
  demoUrl?: string;
  githubUrl?: string;
  privateRepo?: boolean;
}

// Badge colors:
// "live"    → bg-green-50 text-green-700 border-green-200  + pulsing dot
// "wip"     → bg-amber-50 text-amber-700 border-amber-200
// "work"    → bg-purple-50 text-purple-700 border-purple-200
// "private" → bg-gray-50 text-gray-500 border-gray-200
```

```tsx
// Full card structure
<motion.div
  whileHover={{ y: -4 }}
  transition={{ duration: 0.15 }}
  className="relative border border-[#E5E5E5] rounded-xl overflow-hidden
             hover:shadow-lg transition-shadow"
>
  {/* Left accent border */}
  <div className="absolute left-0 top-0 bottom-0 w-[3px]" 
       style={{ backgroundColor: project.accent }} />

  <div className="px-8 py-7 ml-1">
    {/* Top row: badges + links */}
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-2">
        {project.badge && <Badge type={project.badgeType}>{project.badge}</Badge>}
      </div>
      <div className="flex gap-3">
        {project.demoUrl && (
          <a href={project.demoUrl} target="_blank" 
             className="text-xs text-[#6B6B6B] hover:text-[#0A0A0A] flex items-center gap-1">
            <ExternalLinkIcon className="w-3 h-3" /> Demo
          </a>
        )}
        {project.githubUrl && !project.privateRepo && (
          <a href={project.githubUrl} target="_blank"
             className="text-xs text-[#6B6B6B] hover:text-[#0A0A0A] flex items-center gap-1">
            <GitHubIcon className="w-3 h-3" /> Code
          </a>
        )}
        {project.privateRepo && (
          <span className="text-xs text-[#9B9B9B] italic">private — on request</span>
        )}
      </div>
    </div>

    {/* Title */}
    <h3 className="text-xl font-semibold text-[#0A0A0A] mb-2 font-[Playfair]">
      {project.title}
    </h3>

    {/* Hook */}
    <p className="text-[#6B6B6B] text-sm leading-relaxed mb-5">
      {project.hook}
    </p>

    {/* Stack pills */}
    <div className="flex flex-wrap gap-2">
      {project.stack.map(tech => (
        <span key={tech} 
              className="text-xs font-mono px-2.5 py-1 bg-[#F5F5F5] 
                         text-[#3D3D3D] rounded-md border border-[#E5E5E5]">
          {tech}
        </span>
      ))}
    </div>
  </div>
</motion.div>
```

Layout: **single column, full-width cards** on all screen sizes. Not a grid. Cards are wide, scannable left-to-right, and the left border color gives instant visual grouping without being loud.

---

### Section 3 — Work / Career Timeline

**Current:** Good bones — distinctive snake path, clean typography  
**Keep:** The snake path SVG animation exactly as-is  
**Add:** One achievement line under each role, on-scroll draw animation for the path

#### Content additions

```
SUMMER 2026
IBM — Z Infrastructure Solutions Architect Intern
+ RAG platform demoed live to 40–60 C-suite clients. 75% reduction in truncated LLM outputs.

SUMMER 2025
Fintech Global Center — SWE Intern
+ Bond optimizer cutting allocation decision time by 40%. Automated portfolio audit pipeline.

SUMMER 2024
Fintech Global Center — SWE Intern
+ Yield simulator reducing fixed-income pricing error 15% vs industry benchmark models.

SUMMER 2022
ManTech — SWE Intern
+ PowerApps audit automation pipeline.

AUG 2023
University of Maryland — BS Computer Science
+ Dean's List. Minor in Philosophy.
```

#### Animation enhancement
```tsx
// Use Framer Motion's useInView + pathLength to animate the SVG path drawing in
// as the user scrolls to the timeline section

import { useInView } from "framer-motion";

const pathRef = useRef(null);
const isInView = useInView(pathRef, { once: true, margin: "-100px" });

<motion.path
  ref={pathRef}
  d={snakePath}
  initial={{ pathLength: 0, opacity: 0 }}
  animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
  transition={{ duration: 1.8, ease: "easeInOut" }}
  stroke="#0A0A0A"
  strokeWidth={1.5}
  fill="none"
/>
```

---

### Section 4 — Now (new section)

**Current:** Doesn't exist  
**New:** Thin strip between Projects and Timeline

Three items in a horizontal row. Updates every few months — treat it like a living section.

```tsx
// components/NowStrip.tsx

const NOW_ITEMS = [
  {
    label: "building",
    value: "Deploying BiasLens — short-form video bias detection",
  },
  {
    label: "at",
    value: "IBM LinuxONE, NYC — RAG platform for enterprise clients",
  },
  {
    label: "trading",
    value: "Watching rate cut expectations and semis positioning",
  },
];
```

Visual treatment:
```
┌──────────────────────────────────────────────────────────┐
│  building ·  Deploying BiasLens — short-form video...    │
│  at ·        IBM LinuxONE, NYC — RAG platform for...     │
│  trading ·   Watching rate cut expectations and semis... │
└──────────────────────────────────────────────────────────┘
```
- Left labels in monospace, gray, small caps: `font-mono text-xs text-[#9B9B9B] uppercase tracking-wider`
- Values in regular weight, slightly larger
- Thin top and bottom border, no fill background
- Full-width, contained within the same max-width as everything else
- Section heading: `now` in your existing lowercase serif style

---

### Section 5 — Interests (new section, optional but recommended)

One short row near the footer. Not a bulleted list — a single comma-separated sentence styled as a pull quote.

```
Financial markets · Cardistry · Balisongs · Watches · 
Hip hop dance · Bouldering · Star Wars
```

Visual treatment: centered, serif italic, `text-[#6B6B6B]`, slightly larger than body. Separators as `·`. No heading above it — just the text, enough whitespace around it to breathe. This is the element that makes you a person instead of a PDF.

---

### Section 6 — Footer

**Current:** Four contact cards including phone number  
**New:** Minimal one-line footer

```tsx
// components/Footer.tsx
<footer className="border-t border-[#E5E5E5] py-8 flex items-center 
                   justify-between text-sm text-[#9B9B9B]">
  <span>Aman Srivastava</span>
  <div className="flex gap-6">
    <a href="mailto:amansrivastava13572@gmail.com">email</a>
    <a href="https://github.com/asrivas21" target="_blank">github</a>
    <a href="https://linkedin.com/in/aman-srivastava-88652a210" target="_blank">linkedin</a>
  </div>
</footer>
```

No phone number. No cards. No "let's connect!" No exclamation points.

---

## Page structure (final scroll order)

```
1. Nav (fixed, appears on scroll)
2. Hero
   — Name animation (keep)
   — Positioning statement (new)
   — Three icon links (new)
   — [Optional] Bias Lens live ticker (new)
3. Projects
   — 5 full-width accent-bordered cards
4. Now strip (new)
5. Career Timeline
   — Keep snake path
   — Add achievement lines
   — Add scroll-draw animation
6. Interests pull quote (new)
7. Footer (simplified)
```

---

## Component file structure

```
app/
├── page.tsx                    ← assembles all sections
├── layout.tsx                  ← font imports, metadata
components/
├── Nav.tsx                     ← fixed nav, appears on scroll
├── AnimatedName.tsx            ← keep existing, extract if not already
├── BiasTicker.tsx              ← optional hero ticker
├── ProjectCard.tsx             ← single card component
├── ProjectsSection.tsx         ← maps over PROJECT_DATA array
├── NowStrip.tsx                ← three-item now section
├── CareerTimeline.tsx          ← keep existing SVG, add draw animation
├── InterestsQuote.tsx          ← one-line pull quote
└── Footer.tsx                  ← simplified footer
data/
├── projects.ts                 ← PROJECT_DATA array (all project content lives here)
└── now.ts                      ← NOW_ITEMS array (update this every few months)
```

Keeping content in `data/` files means you never touch component code to update copy.

---

## SEO and metadata

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  title: "Aman Srivastava",
  description: "Software engineer. RAG pipelines, financial data infrastructure, media bias detection. Rising senior at UMD, interning at IBM.",
  openGraph: {
    title: "Aman Srivastava",
    description: "Software engineer. RAG pipelines, financial infrastructure, media bias detection.",
    url: "https://amansrivastava.com",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Aman Srivastava",
  },
};
```

---

## Implementation order

Do these in sequence. Each step is independently shippable.

| Step | Task | Time estimate |
|------|------|---------------|
| 1 | Fix HTTPS, remove phone number, delete improvement-plan.md | 15 min |
| 2 | Set up Framer Motion, define design tokens in Tailwind config | 30 min |
| 3 | Rebuild hero — add positioning statement + icon links | 45 min |
| 4 | Rebuild projects section — ProjectCard component + PROJECT_DATA | 2–3 hrs |
| 5 | Add achievement lines to career timeline | 30 min |
| 6 | Add scroll-draw animation to timeline SVG path | 1 hr |
| 7 | Add Now strip | 30 min |
| 8 | Add Interests pull quote | 15 min |
| 9 | Rebuild footer | 15 min |
| 10 | Add Nav component | 45 min |
| 11 | SEO metadata + OpenGraph | 20 min |
| 12 | Deploy BiasLens → add live URL to project card | — |
| 13 | Add Bias Lens live ticker to hero | 1 hr |
| 14 | Full QA: mobile, tablet, desktop | 30 min |

Total excluding ticker: ~8 hours of focused work across 2 sessions.

---

## What a recruiter should experience

Landing on the site:
1. Name animates in — **familiar, sleek, keeps the existing vibe**
2. Reads one sentence — immediately knows what you do and that you're at IBM **right now**
3. Sees the ticker showing a live bias score — **curiosity, clicks BiasLens link**
4. Scrolls to projects — scans five cards in 20 seconds, sees IBM + FGC work + live deployed tool
5. Sees the Now strip — **realizes you're actively building and trading, not just job-hunting**
6. Hits the timeline — already knew the companies, now sees the concrete numbers
7. Reads the interests line — **remembers you**

The site should feel like it was built by someone who pays attention to detail and has opinions — because that's who you are.
