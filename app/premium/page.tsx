import type { Metadata } from "next";
import ProductLandingPage from "@/components/landing/ProductLandingPage";
import { PRODUCT_MAP } from "@/lib/products";
import { ProductSchema } from "@/components/ProductSchema";
import { FAQSchema } from "@/components/FAQSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { CLIENT } from "@/lib/client";

// TODO: replace with real client FAQs
const PREMIUM_FAQS = [
  { question: "מה כולל המוצר?",          answer: "TODO: תשובה אמיתית" },
  { question: "למי מתאים?",              answer: "TODO: תשובה אמיתית" },
  { question: "מה לוח הזמנים?",          answer: "TODO: תשובה אמיתית" },
  { question: "מה מדיניות ביטול?",       answer: "TODO: תשובה אמיתית" },
];

export const metadata: Metadata = {
  title: `${CLIENT.products.premium.title} | ${CLIENT.name}`,
  description: CLIENT.products.premium.description,
  alternates: { canonical: "/premium" },
};

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? `https://${CLIENT.domain}`;

export default function PremiumPage() {
  return (
    <>
      <ProductSchema
        type="Service"
        name={CLIENT.products.premium.title}
        description={CLIENT.products.premium.description}
        url={`${APP_URL}/premium`}
        price={CLIENT.products.premium.price}
        imageUrl={`${APP_URL}${CLIENT.products.premium.image}`}
      />
      <FAQSchema items={PREMIUM_FAQS} />
      <BreadcrumbSchema crumbs={[
        { name: "דף הבית", url: APP_URL },
        { name: CLIENT.products.premium.title, url: `${APP_URL}/premium` },
      ]} />
      <ProductLandingPage
        productName={CLIENT.products.premium.title}
        price={CLIENT.products.premium.price}
        checkoutHref="#cta"

        // TODO: replace all text below with real client copy
        headline={<><em>{CLIENT.products.premium.title}</em></>}
        heroSub={CLIENT.products.premium.description}
        stats={[
          { val: String(CLIENT.products.premium.price), label: "₪" },
          { val: CLIENT.social_proof.stat1.number, label: CLIENT.social_proof.stat1.label },
          { val: "TODO", label: "TODO" },
        ]}

        problemItems={[
          { icon: "🔸", text: "TODO: בעיה ראשונה" },
          { icon: "🔸", text: "TODO: בעיה שנייה" },
          { icon: "🔸", text: "TODO: בעיה שלישית" },
        ]}
        agitationText="TODO: משפט אגיטציה"

        solutionTitle="TODO: מה כולל המוצר?"
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

        faqSectionTitle="שאלות נפוצות"
        faqs={PREMIUM_FAQS.map(f => ({ q: f.question, a: f.answer }))}

        finalTitle="TODO: כותרת סיום"
        finalSub="TODO: תת-כותרת סיום"
      />
    </>
  );
}
