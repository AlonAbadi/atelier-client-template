/**
 * CLIENT CONFIG — fill this file for each new client.
 * This is the ONLY file that changes between deployments.
 */

export const CLIENT = {

  // ─── Brand ────────────────────────────────────────────────────────────────
  name:          "הדר דנן",           // displayed in nav, emails, footer
  name_en:       "hadar-danan",       // used in slugs / class names
  legal_name:    "הדר דנן בע״מ",
  company_id:    "516791555",         // ח.פ / עוסק מורשה
  domain:        "beegood.online",
  whatsapp:      "972539566961",

  // ─── Meta & SEO ───────────────────────────────────────────────────────────
  meta: {
    title:       "הדר דנן | שיטת TrueSignal by BeeGood - שיווק אותנטי לעסקים",
    description: "הדר דנן, מומחית לשיווק אותנטי ויוצרת שיטת TrueSignal by BeeGood. קורסים, סדנאות וליווי אישי לבעלי עסקים שרוצים לשווק בלי לאבד את עצמם.",
    og_image:    "/og-image.jpg",
  },

  // ─── Colors ───────────────────────────────────────────────────────────────
  colors: {
    bg:          "#0D1018",
    bg_dark:     "#080C14",
    card:        "#141820",
    card_soft:   "#1D2430",
    border:      "#2C323E",
    accent:      "#C9964A",
    accent_light:"#E8B94A",
    accent_dark: "#9E7C3A",
    fg:          "#EDE9E1",
    fg_muted:    "#9E9990",
  },

  // ─── Hero ─────────────────────────────────────────────────────────────────
  hero: {
    image:       "/hadar1.jpg",
    image_alt:   "הדר דנן",
    headline_a:  "השיווק שלך לא נכשל בגלל הסרטונים",
    headline_b:  "תוכן שמוכר מגיע מבהירות - לא מעוד סרטונים",
    desc_a:      "אנחנו עוזרים לעסקים לאתר איפה הם חזקים באמת ולבנות שיווק שמגיע מהמקום הנכון.",
    desc_b:      "250+ עסקים כבר גילו מה באמת מייחד אותם וייצרו תוכן שמוכר בלי להרגיש מזויף.",
    cta_a:       "איפה אתה נמצא עכשיו? ←",
    cta_b:       "גלה את הבהירות שלך ←",
  },

  // ─── Social proof ─────────────────────────────────────────────────────────
  social_proof: {
    stat1: { number: "250+",  label: "עסקים" },
    stat2: { number: "4",     label: "שנים" },
    stat3: { number: "97%",   label: "ממליצים" },
    tagline: "עסקים כבר מצאו את הבהירות שלהם",
  },

  // ─── Funnel products ──────────────────────────────────────────────────────
  products: {
    training: {
      title:       "הדרכה חינמית",
      slug:        "/training",
      price:       0,
      description: "להבין למה השיווק שלך לא עובד",
      image:       "/hadarlesson.png",
      vimeo_id:    "1182657741",
    },
    challenge: {
      title:       "אתגר 7 ימים",
      slug:        "/challenge",
      price:       197,
      description: "ריאלס יומי שבונה נוכחות",
      image:       "/etgar.png",
      vimeo_id:    "1183365127",
    },
    workshop: {
      title:       "סדנה יום אחד",
      slug:        "/workshop",
      price:       1080,
      description: "יום אינטנסיבי שמשנה הכל",
      image:       "/sadna.png",
    },
    course: {
      title:       "קורס דיגיטלי",
      slug:        "/course",
      price:       1800,
      description: "16 שיעורים, 8 מודולים",
      image:       "/coursehadar.png",
    },
    strategy: {
      title:       "פגישת אסטרטגיה",
      slug:        "/strategy",
      price:       4000,
      description: "90 דקות שבונות את הדרך",
      image:       "/strategymeeting.png",
      vimeo_id:    "1183710499",
    },
    premium: {
      title:       "יום צילום פרמיום",
      slug:        "/premium",
      price:       14000,
      description: "16 וידאו ברמה מקצועית",
      image:       "/shooting.png",
    },
    partnership: {
      title:       "שותפות אסטרטגית",
      slug:        "/partnership",
      price:       10000,
      description: "ליווי חודשי מלא",
      image:       "/partnership.png",
    },
    hive: {
      title:       "הכוורת",
      slug:        "/hive",
      price_basic: 97,
      price_disc:  29,
      description: "קהילה חודשית של יוצרים",
      image:       "/hive.png",
    },
  },

  // ─── About ────────────────────────────────────────────────────────────────
  about: {
    title:    "על הדר דנן",
    tagline:  "מומחית לשיווק אותנטי",
    body:     "הדר דנן היא מומחית לשיווק אותנטי ויוצרת שיטת TrueSignal. עם ניסיון של מעל 4 שנים וליווי של 250+ עסקים, היא מלמדת כיצד לשווק מהמקום האמיתי שלך.",
    image:    "/hadar-about.jpg",
  },

  // ─── Email ────────────────────────────────────────────────────────────────
  email: {
    from_name:  "הדר דנן",
    from_email: "noreply@beegood.online",
    signature:  "הדר דנן בע״מ · ישראל",
  },

  // ─── Modules (toggle features on/off) ─────────────────────────────────────
  modules: {
    quiz:          true,
    hive:          true,
    challenge:     true,
    course:        true,
    workshop:      true,
    strategy:      true,
    premium:       true,
    partnership:   true,
    deals:         false,
    ab_testing:    true,
    video_analytics: true,
  },

} as const;

export type ClientConfig = typeof CLIENT;
