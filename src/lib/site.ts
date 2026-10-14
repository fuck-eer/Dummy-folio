export const SITE = {
  name: "Nishchay Chauhan",
  role: "Software Developer & Technical Consultant",
  email: "nishchaychauhan8@gmail.com",
  subject: "Consultation enquiry",
  github: "https://github.com/fuck-eer",
  githubName: "Nishchay",
  githubBio: "PS: these semicolons ain't loyal...",
  description:
    "Freelance software development and technical consultation. Web apps, APIs, MVPs, and architecture reviews by Nishchay Chauhan. Email to book a consultation.",
} as const

const mailBody = `Hi Nishchay,

I would like to talk about a project.

What I need:
Timeline:
Anything already built:
`

export const MAILTO = `mailto:${SITE.email}?subject=${encodeURIComponent(SITE.subject)}&body=${encodeURIComponent(mailBody)}`

export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit.replace(/\/$/, "")
  if (
    process.env.VERCEL_ENV === "production" &&
    process.env.VERCEL_PROJECT_PRODUCTION_URL
  ) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return "http://localhost:43123"
}

export const nav = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
] as const

export const mobileNav = [
  ...nav.slice(0, 3),
  { href: "#skills", label: "Toolkit" },
  ...nav.slice(3),
  { href: "#faq", label: "FAQ" },
] as const

export const services = [
  {
    index: "01",
    title: "Custom web and app development",
    body: "Product interfaces and the application behind them. A sharp marketing site when that is the job, and a web app when it has to do real work.",
  },
  {
    index: "02",
    title: "API and backend development",
    body: "Endpoints, data shape, and the parts people never see. Built so the interface has something stable to stand on.",
  },
  {
    index: "03",
    title: "Technical consultation and architecture reviews",
    body: "A structured look at a design, a codebase, or a decision in front of you. You get notes: what holds, what is risky, and what I would do next.",
  },
  {
    index: "04",
    title: "MVP building for startups",
    body: "A narrow first version meant to be shown to real people. The useful part is often what we agree to leave out.",
  },
] as const

export const steps = [
  {
    index: "01",
    title: "Listen",
    body: "We start with the problem, the constraint, and what done means. If those are fuzzy, the first job is to make them less fuzzy.",
  },
  {
    index: "02",
    title: "Shape",
    body: "A short written plan: the slice we will build, the risks, and what is explicitly out of scope. You can disagree before the long part starts.",
  },
  {
    index: "03",
    title: "Build",
    body: "Small increments you can click through. You will know what changed and what is still open. No silent weeks.",
  },
  {
    index: "04",
    title: "Hand off",
    body: "The code, the notes, and a way to run it. If you want another slice after that, we agree it separately.",
  },
] as const

export const skillGroups = [
  {
    title: "Languages",
    body: "What I write in most days.",
    items: ["TypeScript", "JavaScript"],
  },
  {
    title: "Interfaces",
    body: "What people actually use.",
    items: ["React", "Next.js", "Tailwind CSS", "Accessible HTML"],
  },
  {
    title: "Services",
    body: "The layer behind the screen.",
    items: ["Node.js", "REST APIs"],
  },
  {
    title: "Desktop",
    body: "Software that lives on the machine, not only in a tab.",
    items: ["Desktop apps", "Electron"],
  },
  {
    title: "Practice",
    body: "The part that keeps a project from wandering.",
    items: ["Scoping", "Architecture reviews", "Git", "Technical writing"],
  },
] as const

export type Project = {
  name: string
  href: string
  linkLabel: string
  site?: { href: string; label: string }
  status: string
  tags: readonly string[]
  summary: string
  note: string
}

export const projects: readonly Project[] = [
  {
    name: "CopyKat",
    href: "https://github.com/fuck-eer/copycat-releases",
    linkLabel: "Releases",
    site: { href: "https://copykat.xyz", label: "copykat.xyz" },
    status: "Beta",
    tags: ["Desktop", "Clipboard"],
    summary:
      "A clipboard manager with nine keyboard-driven slots and pinned items. It sits alongside the copy and paste habits you already have.",
    note: "The source is private. This public repository hosts the builds. Its releases page lists macOS 12+ as beta and Windows as not yet available.",
  },
  {
    name: "ConMan",
    href: "https://github.com/fuck-eer/conman-releases",
    linkLabel: "Releases",
    site: { href: "https://conman.live", label: "conman.live" },
    status: "Early beta",
    tags: ["Desktop", "TypeScript", "Electron"],
    summary:
      "A desktop command center for coordinating AI coding agents from one dashboard, instead of a pile of separate chat windows.",
    note: "The project’s own readme calls it an early beta and says to expect bugs. Releases are public; the readme also points at a separate source repository.",
  },
  {
    name: "react-page-loader",
    href: "https://github.com/fuck-eer/react-page-loader",
    linkLabel: "Repository",
    status: "Open source",
    tags: ["React"],
    summary:
      "A small React component. The repository description is exactly this: a full-page loader.",
    note: "Included as a modest public package, not dressed up as a case study.",
  },
  {
    name: "DSA notes",
    href: "https://github.com/fuck-eer/DSA",
    linkLabel: "Repository",
    status: "Notes",
    tags: ["Practice"],
    summary:
      "Personal data-structures and algorithms practice. The repository description reads: “This is just a DSA dump from me.”",
    note: "Part of the public record, not a product.",
  },
] as const

export const principles = [
  "A small scope you can see working",
  "Decisions written down, not implied",
  "Code the next person can read",
  "A plain answer when I am the wrong fit",
] as const

export const faqs = [
  {
    q: "How do I book a consultation?",
    a: "The buttons on this page open a draft email to nishchaychauhan8@gmail.com with the subject “Consultation enquiry”. Write a few lines about the problem, the timeline, and whether you need a build, a review, or both.",
  },
  {
    q: "What happens after I email?",
    a: "I read it and reply. If it looks like a fit, we schedule a conversation. If it does not, I will say so rather than stretch the work into a shape I cannot do well.",
  },
  {
    q: "Do you publish testimonials or client names?",
    a: "No. This site does not invent quotes, logos, or numbers. Public code is on GitHub. Private client work stays private unless you want it mentioned.",
  },
  {
    q: "What kinds of projects are a good fit?",
    a: "Custom web or app development, APIs and backends, a startup MVP with a tight scope, or a technical review of something already underway.",
  },
  {
    q: "What should I have ready?",
    a: "A description of the problem is enough. A repository, a sketch, or a constraint — a date, an existing API, a team of one — makes the first conversation sharper.",
  },
  {
    q: "Where do you work?",
    a: "Remotely. We will agree on hours that overlap. I do not publish a city on this site.",
  },
] as const
