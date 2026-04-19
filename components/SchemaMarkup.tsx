import { CLIENT } from "@/lib/client";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? `https://${CLIENT.domain}`;

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": `BeeGood - ${CLIENT.name}`,
  "url": APP_URL,
  "inLanguage": "he",
};

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": CLIENT.name,
  "url": APP_URL,
  "jobTitle": CLIENT.about.tagline,
  "description": CLIENT.about.body,
  "knowsAbout": ["שיווק דיגיטלי", "אסטרטגיה עסקית", "יצירת תוכן", "מיתוג אישי"],
  "worksFor": {
    "@type": "Organization",
    "name": "BeeGood",
    "url": APP_URL,
  },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "BeeGood",
  "url": APP_URL,
  "logo": `${APP_URL}/beegood_logo.png`,
  "description": CLIENT.meta.description,
  "founder": { "@type": "Person", "name": CLIENT.name },
};

export function SchemaMarkup() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
    </>
  );
}
