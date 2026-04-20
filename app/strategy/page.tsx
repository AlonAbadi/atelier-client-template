import type { Metadata } from "next";
import ProductLandingPage from "@/components/landing/ProductLandingPage";
import { PRODUCT_MAP } from "@/lib/products";
import { ProductSchema } from "@/components/ProductSchema";
import { FAQSchema } from "@/components/FAQSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { CLIENT } from "@/lib/client";

// TODO: replace with real client FAQs
const STRATEGY_FAQS = [
  { question: "מה כולל המפגש?",          answer: "TODO: תשובה אמיתית" },
  { question: "למי זה מתאים?",           answer: "TODO: תשובה אמיתית" },
  { question: "איך מתקיים המפגש?",       answer: "TODO: תשובה אמיתית" },
  { question: "מה מדיניות ביטול?",       answer: "TODO: תשובה אמיתית" },
];

export const metadata: Metadata = {
  title: `${CLIENT.products.strategy.title} | ${CLIENT.name}`,
  description: CLIENT.products.strategy.description,
  alternates: { canonical: "/strategy" },
};

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? `https://${CLIENT.domain}`;

export default async function StrategyPage() {
  const price = String(PRODUCT_MAP.strategy_4000.price);

  return (
    <>
      <ProductSchema
        type="Service"
        name={CLIENT.products.strategy.title}
        description={CLIENT.products.strategy.description}
        url={`${APP_URL}/strategy`}
        price={CLIENT.products.strategy.price}
        imageUrl={`${APP_URL}${CLIENT.products.strategy.image}`}
      />
      <FAQSchema items={STRATEGY_FAQS} />
      <BreadcrumbSchema crumbs={[
        { name: "דף הבית", url: APP_URL },
        { name: CLIENT.products.strategy.title, url: `${APP_URL}/strategy` },
      ]} />
      <ProductLandingPage
        productName={CLIENT.products.strategy.title}
        price={PRODUCT_MAP.strategy_4000.price}
        checkoutHref="#cta"

        // TODO: replace all text below with real client copy
        headline={<><em>{CLIENT.products.strategy.title}</em></>}
        heroSub={CLIENT.products.strategy.description}
        stats={[
          { val: "90", label: "דקות" },
          { val: price, label: "₪" },
          { val: "100%", label: "ערבות" },
        ]}

        problemItems={[
          { icon: "🔸", text: "TODO: בעיה ראשונה" },
          { icon: "🔸", text: "TODO: בעיה שנייה" },
          { icon: "🔸", text: "TODO: בעיה שלישית" },
        ]}
        agitationText="TODO: משפט אגיטציה"

        solutionTitle="TODO: מה מקבלים בפגישה?"
        solutionItems={[
          { num: "1", title: "TODO: נושא ראשון", desc: "TODO" },
          { num: "2", title: "TODO: נושא שני",   desc: "TODO" },
          { num: "3", title: "TODO: נושא שלישי", desc: "TODO" },
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
        faqs={STRATEGY_FAQS.map(f => ({ q: f.question, a: f.answer }))}

        finalTitle="TODO: כותרת סיום"
        finalSub="TODO: תת-כותרת סיום"
      />
    </>
  );
}
