import type { Metadata } from "next"
import Link from "next/link"

import { MailtoLink } from "@/components/mailto-link"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="flex flex-1 outline-none">
      <div className="mx-auto flex w-full max-w-3xl flex-col justify-center px-5 py-24 sm:px-8">
        <p className="font-mono text-xs tracking-[0.18em] text-copper uppercase">
          404
        </p>
        <h1 className="mt-3 font-heading text-5xl tracking-tight sm:text-6xl">
          This page is not here.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          The link may be mistyped. The work, the services, and the email
          button all live on the home page.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-5 text-[15px] font-medium text-primary-foreground hover:bg-primary/80"
          >
            Back home
          </Link>
          <MailtoLink variant="outline" className="w-full sm:w-auto">
            Email me
          </MailtoLink>
        </div>
      </div>
    </main>
  )
}
