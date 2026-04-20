export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import ProductLandingPage from "@/components/landing/ProductLandingPage";
import { AbandonCheckoutPopup } from "@/components/landing/AbandonCheckoutPopup";
import { CreditBanner } from "@/components/landing/CreditBanner";
import { getUserCredit } from "@/lib/credit";
import { PRODUCT_MAP } from "@/lib/products";
import { ProductSchema } from "@/components/ProductSchema";
import { FAQSchema } from "@/components/FAQSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { CLIENT } from "@/lib/client";

// TODO: replace with real client FAQs
const WORKSHOP_FAQS = [
  { question: "מה כולל הסדנה?",           answer: "TODO: תשובה אמיתית" },
  { question: "למי מתאים?",               answer: "TODO: תשובה אמיתית" },
  { question: "כמה זמן נמשכת הסדנה?",    answer: "TODO: תשובה אמיתית" },
  { question: "מה מדיניות ביטול?",        answer: "TODO: תשובה אמיתית" },
];

export const metadata: Metadata = {
  title: `${CLIENT.products.workshop.title} | ${CLIENT.name}`,
  description: CLIENT.products.workshop.description,
  alternates: { canonical: "/workshop" },
};

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? `https://${CLIENT.domain}`;

export default async function WorkshopPage({ searchParams }: { searchParams: Promise<{ email?: string }> }) {
  const { email = "" } = await searchParams;
  const price  = String(PRODUCT_MAP.workshop_1080.price);
  const credit = email ? await getUserCredit(email) : 0;

  return (
    <>
      <ProductSchema
        type="Course"
        name={CLIENT.products.workshop.title}
        description={CLIENT.products.workshop.description}
        url={`${APP_URL}/workshop`}
        price={CLIENT.products.workshop.price}
        imageUrl={`${APP_URL}${CLIENT.products.workshop.image}`}
      />
      <FAQSchema items={WORKSHOP_FAQS} />
      <BreadcrumbSchema crumbs={[
        { name: "דף הבית", url: APP_URL },
        { name: CLIENT.products.workshop.title, url: `${APP_URL}/workshop` },
      ]} />
      <AbandonCheckoutPopup product="workshop" />
      <ProductLandingPage
        productName={CLIENT.products.workshop.title}
        price={PRODUCT_MAP.workshop_1080.price}
        checkoutHref="#cta"

        // TODO: replace all text below with real client copy
        headline={<><em>{CLIENT.products.workshop.title}</em></>}
        heroSub={CLIENT.products.workshop.description}
        stats={[
          { val: "1",   label: "יום" },
          { val: price, label: "₪" },
          { val: CLIENT.social_proof.stat1.number, label: CLIENT.social_proof.stat1.label },
        ]}

        problemItems={[
          { icon: "🔸", text: "TODO: בעיה ראשונה" },
          { icon: "🔸", text: "TODO: בעיה שנייה" },
          { icon: "🔸", text: "TODO: בעיה שלישית" },
        ]}
        agitationText="TODO: משפט אגיטציה"

        solutionTitle="TODO: מה לומדים בסדנה?"
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
          { val: CLIENT.social_proof.stat3.number, label: CLIENT.social_proof.stat3.label },
        ]}
        testimonials={[
          { text: "TODO: עדות ראשונה", author: "שם", role: "תפקיד" },
          { text: "TODO: עדות שנייה",  author: "שם", role: "תפקיד" },
        ]}

        creditNote={credit > 0 ? `יש לך זיכוי של ${credit} ש״ח מרכישות קודמות` : undefined}

        faqSectionTitle="שאלות נפוצות"
        faqs={WORKSHOP_FAQS.map(f => ({ q: f.question, a: f.answer }))}

        finalTitle="TODO: כותרת סיום"
        finalSub="TODO: תת-כותרת סיום"

        ctaSlot={
          <CreditBanner credit={credit} listPrice={PRODUCT_MAP.workshop_1080.price} productName={CLIENT.products.workshop.title} dark />
        }
      />
    </>
  );
}
