import type { Metadata } from "next";
import ProductLandingPage from "@/components/landing/ProductLandingPage";
import { HivePricingSection } from "./HivePricingSection";
import { CLIENT } from "@/lib/client";

export const metadata: Metadata = {
  title: `${CLIENT.products.hive.title} | ${CLIENT.name}`,
  description: CLIENT.products.hive.description,
  alternates: { canonical: "/hive" },
};

export default function HivePage() {
  return (
    <ProductLandingPage
      productName={CLIENT.products.hive.title}
      price={CLIENT.products.hive.price_basic}
      checkoutHref="#cta"

      // TODO: replace all text below with real client copy
      headline={<><em>{CLIENT.products.hive.title}</em></>}
      heroSub={CLIENT.products.hive.description}
      stats={[
        { val: "1x",  label: "מפגש בחודש" },
        { val: String(CLIENT.products.hive.price_basic), label: "ש״ח/חודש" },
        { val: "0",   label: "התחייבות" },
      ]}

      problemItems={[
        { icon: "🔸", text: "TODO: בעיה ראשונה" },
        { icon: "🔸", text: "TODO: בעיה שנייה" },
        { icon: "🔸", text: "TODO: בעיה שלישית" },
      ]}
      agitationText="TODO: משפט אגיטציה"

      solutionTitle="מה כולל המנוי?"
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
        { val: CLIENT.social_proof.stat3.number, label: CLIENT.social_proof.stat3.label },
      ]}
      testimonials={[
        { text: "TODO: עדות ראשונה", author: "שם", role: "תפקיד" },
        { text: "TODO: עדות שנייה",  author: "שם", role: "תפקיד" },
      ]}

      faqs={[
        { q: "איך מבטלים את המנוי?",             a: "בכל עת — דרך האזור האישי (/my) או בוואטסאפ. ביטול תוך 14 ימים = החזר מלא." },
        { q: "האם יש התחייבות מינימלית?",         a: "לא. ניתן לביטול בכל עת ללא עלות." },
        { q: "TODO: שאלה נוספת?",                 a: "TODO: תשובה" },
      ]}

      finalTitle="TODO: כותרת סיום"
      finalSub="ניתן לביטול בכל עת."

      hideMicroCommitment

      priceSectionSlot={<HivePricingSection />}
    />
  );
}
