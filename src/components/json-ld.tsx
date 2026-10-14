import { SITE, getSiteUrl } from "@/lib/site"

export function JsonLd() {
  const url = getSiteUrl()
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    jobTitle: SITE.role,
    email: SITE.email,
    url,
    description: SITE.description,
    sameAs: [SITE.github],
    knowsAbout: [
      "Software development",
      "Technical consulting",
      "Web applications",
      "API design",
      "MVP development",
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
