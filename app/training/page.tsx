import type { Metadata } from "next";
import ProductLandingPage from "@/components/landing/ProductLandingPage";
import { SignupForm } from "@/components/landing/SignupForm";
import { TrainingViewCounter } from "@/app/training/watch/TrainingViewCounter";
import { getTrainingViewCount } from "@/lib/training-views";
import { CLIENT } from "@/lib/client";

export const metadata: Metadata = {
  title: `${CLIENT.products.training.title} | ${CLIENT.name}`,
  description: CLIENT.products.training.description,
  alternates: { canonical: "/training" },
};

export default async function TrainingPage() {
  const viewCount = await getTrainingViewCount();

  return (
    <ProductLandingPage
      productName={CLIENT.products.training.title}
      price={0}
      checkoutHref="#cta"

      // TODO: set real vimeo_id in CLIENT.products.training.vimeo_id
      vimeoId={CLIENT.products.training.vimeo_id || undefined}

      // TODO: replace all text below with real client copy
      headline={<><em>{CLIENT.products.training.title}</em></>}
      heroSub={CLIENT.products.training.description}
      stats={[
        { val: "20", label: "דקות" },
        { val: "0",  label: "עלות" },
        { val: <TrainingViewCounter initialCount={viewCount} />, label: "צפו" },
      ]}

      problemItems={[
        { icon: "🔸", text: "TODO: בעיה ראשונה שהלקוח מזדהה איתה" },
        { icon: "🔸", text: "TODO: בעיה שנייה" },
        { icon: "🔸", text: "TODO: בעיה שלישית" },
      ]}
      agitationText="TODO: משפט אגיטציה — מה גורם לבעיה להיות חמורה יותר?"

      solutionTitle="TODO: מה לומדים בהדרכה?"
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

      faqs={[
        { q: "האם זה באמת חינם?",        a: "כן. ללא תשלום עכשיו ואחר כך." },
        { q: "כמה זמן ההדרכה?",           a: "20 דקות. בקצב שלך." },
        { q: "מה קורה אחרי ההדרכה?",     a: "ממשיכים לשלב הבא בקצב שלך. אין לחץ." },
      ]}

      finalTitle="TODO: כותרת סיום"
      finalSub="20 דקות. חינם לגמרי. ללא התחייבות."

      hideMicroCommitment

      priceSectionSlot={
        <section style={{ padding: "48px 20px", maxWidth: 480, margin: "0 auto" }}>
          <div style={{
            background: CLIENT.colors.card, border: `1px solid ${CLIENT.colors.border}`,
            borderRadius: 20, padding: "32px 28px",
          }}>
            <p style={{ fontWeight: 900, fontSize: 20, textAlign: "center", color: CLIENT.colors.fg, margin: "0 0 24px" }}>
              שלח/י לי את ההדרכה
            </p>
            <SignupForm ctaLabel="שלח לי את ההדרכה" />
            <p style={{ textAlign: "center", fontSize: 12, color: CLIENT.colors.fg_muted, marginTop: 14 }}>
              ללא ספאם. ניתן להסרה בכל עת.
            </p>
          </div>
        </section>
      }
    />
  );
}
