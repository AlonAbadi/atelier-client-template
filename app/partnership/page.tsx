import type { Metadata } from "next";
import ProductLandingPage from "@/components/landing/ProductLandingPage";
import { CLIENT } from "@/lib/client";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
  title: `${CLIENT.products.partnership.title} | ${CLIENT.name}`,
  description: CLIENT.products.partnership.description,
  alternates: { canonical: "/partnership" },
};

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? `https://${CLIENT.domain}`;

// TODO: replace all text below with real client copy for partnership offering
export default function PartnershipPage() {
  return (
    <>
      <BreadcrumbSchema crumbs={[
        { name: "דף הבית", url: APP_URL },
        { name: CLIENT.products.partnership.title, url: `${APP_URL}/partnership` },
      ]} />
      <ProductLandingPage
        productName={CLIENT.products.partnership.title}
        price={CLIENT.products.partnership.price}
        checkoutHref="#cta"

        headline={<><em>{CLIENT.products.partnership.title}</em></>}
        heroSub={CLIENT.products.partnership.description}
        stats={[
          { val: "TODO", label: "TODO" },
          { val: "TODO", label: "TODO" },
          { val: "TODO", label: "TODO" },
        ]}

        problemItems={[
          { icon: "🔸", text: "TODO: בעיה ראשונה" },
          { icon: "🔸", text: "TODO: בעיה שנייה" },
          { icon: "🔸", text: "TODO: בעיה שלישית" },
        ]}
        agitationText="TODO: משפט אגיטציה"

        solutionTitle="TODO: מה כוללת השותפות?"
        solutionItems={[
          { num: "1", title: "TODO: רכיב ראשון", desc: "TODO" },
          { num: "2", title: "TODO: רכיב שני",   desc: "TODO" },
          { num: "3", title: "TODO: רכיב שלישי", desc: "TODO" },
        ]}

        notForItems={["TODO: למי לא מתאים"]}
        forItems={["TODO: למי מתאים"]}

        whoName={CLIENT.name}
        whoRole={CLIENT.about.tagline}
        whoText={CLIENT.about.body}

        proofStats={[
          { val: CLIENT.social_proof.stat1.number, label: CLIENT.social_proof.stat1.label },
          { val: CLIENT.social_proof.stat2.number, label: CLIENT.social_proof.stat2.label },
        ]}
        testimonials={[
          { text: "TODO: עדות ראשונה", author: "שם", role: "תפקיד" },
          { text: "TODO: עדות שנייה",  author: "שם", role: "תפקיד" },
        ]}

        faqs={[
          { q: "TODO: שאלה?", a: "TODO: תשובה" },
        ]}

        finalTitle="TODO: כותרת סיום"
        finalSub="TODO: תת-כותרת סיום"

        hideMicroCommitment
      />
    </>
  );
}
