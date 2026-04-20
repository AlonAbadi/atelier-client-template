export const dynamic = "force-dynamic";
import ProductLandingPage from "@/components/landing/ProductLandingPage";
import { ChallengeCTA } from "./ChallengeCTA";
import { ChallengeGreeting } from "./ChallengeGreeting";
import { NextChallengeBadge } from "./NextChallengeBadge";
import { AbandonCheckoutPopup } from "@/components/landing/AbandonCheckoutPopup";
import { CreditBanner } from "@/components/landing/CreditBanner";
import { getUserCredit } from "@/lib/credit";
import { PRODUCT_MAP } from "@/lib/products";
import { ProductSchema } from "@/components/ProductSchema";
import { FAQSchema } from "@/components/FAQSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { CLIENT } from "@/lib/client";

// TODO: replace with real FAQs per client
const CHALLENGE_FAQS = [
  { question: "מה כולל האתגר?",     answer: "TODO: תשובה אמיתית" },
  { question: "למי מתאים האתגר?",   answer: "TODO: תשובה אמיתית" },
  { question: "כמה זמן ביום?",       answer: "TODO: תשובה אמיתית" },
  { question: "מה אם לא מתאים לי?", answer: "TODO: תשובה אמיתית" },
];

export const metadata = {
  title: `${CLIENT.products.challenge.title} | ${CLIENT.name}`,
  description: CLIENT.products.challenge.description,
  alternates: { canonical: "/challenge" },
};

export default async function ChallengePage({ searchParams }: { searchParams: Promise<{ email?: string }> }) {
  const { email = "" } = await searchParams;
  const price         = String(PRODUCT_MAP.challenge_197.price);
  const whatsappPhone = process.env.WHATSAPP_PHONE ?? CLIENT.whatsapp;
  const credit        = email ? await getUserCredit(email) : 0;
  const APP_URL       = process.env.NEXT_PUBLIC_APP_URL ?? `https://${CLIENT.domain}`;

  return (
    <>
      <ProductSchema
        type="Course"
        name={CLIENT.products.challenge.title}
        description={CLIENT.products.challenge.description}
        url={`${APP_URL}/challenge`}
        price={CLIENT.products.challenge.price}
        imageUrl={`${APP_URL}${CLIENT.products.challenge.image}`}
      />
      <FAQSchema items={CHALLENGE_FAQS} />
      <BreadcrumbSchema crumbs={[
        { name: "דף הבית", url: APP_URL },
        { name: CLIENT.products.challenge.title, url: `${APP_URL}/challenge` },
      ]} />
      <AbandonCheckoutPopup product="challenge" />
      <ProductLandingPage
        productName={CLIENT.products.challenge.title}
        price={PRODUCT_MAP.challenge_197.price}
        checkoutHref="#cta"

        headline={<><em>{CLIENT.products.challenge.title}</em></>}
        heroSub={CLIENT.products.challenge.description}
        stats={[
          { val: "7",   label: "ימי אתגר" },
          { val: CLIENT.social_proof.stat1.number, label: CLIENT.social_proof.stat1.label },
          { val: CLIENT.social_proof.stat2.number, label: CLIENT.social_proof.stat2.label },
          { val: "48h", label: "ערבות החזר" },
        ]}
        heroExtra={<><ChallengeGreeting /><NextChallengeBadge /></>}

        // TODO: replace all text below with real client copy
        problemItems={[
          { icon: "🔸", text: "TODO: בעיה ראשונה של הלקוח האידיאלי" },
          { icon: "🔸", text: "TODO: בעיה שנייה" },
          { icon: "🔸", text: "TODO: בעיה שלישית" },
        ]}
        agitationText="TODO: משפט אגיטציה"

        solutionTitle="TODO: כותרת הפתרון"
        solutionDesc="TODO: תיאור קצר של הפתרון"
        solutionItems={[
          { num: "1", title: "TODO: שלב 1", desc: "TODO" },
          { num: "2", title: "TODO: שלב 2", desc: "TODO" },
          { num: "3", title: "TODO: שלב 3", desc: "TODO" },
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
          { val: "4.9", label: "דירוג ממוצע" },
        ]}
        testimonials={[
          { text: "TODO: עדות ראשונה", author: "שם", role: "תפקיד" },
          { text: "TODO: עדות שנייה",  author: "שם", role: "תפקיד" },
        ]}

        questions={[
          { q: "TODO: שאלה?", options: ["TODO א", "TODO ב", "TODO ג", "TODO ד"] },
        ]}
        resultMessages={{ "TODO א": "TODO: תשובה מותאמת" }}

        creditNote={credit > 0 ? `יש לך זיכוי של ${credit} ש״ח מרכישות קודמות` : undefined}

        faqSectionTitle="שאלות נפוצות"
        faqs={CHALLENGE_FAQS.map(f => ({ q: f.question, a: f.answer }))}

        finalTitle="TODO: כותרת סיום"
        finalSub="TODO: תת-כותרת סיום"
        whatsappNumber={whatsappPhone}

        ctaSlot={
          <>
            <CreditBanner credit={credit} listPrice={PRODUCT_MAP.challenge_197.price} productName={CLIENT.products.challenge.title} dark />
            <ChallengeCTA price={price} whatsappPhone={whatsappPhone} credit={credit} />
          </>
        }
      />
    </>
  );
}
