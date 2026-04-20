/**
 * CLIENT CONFIG — the ONLY file that changes per deployment.
 * Fill every field before running the site. All pages, emails,
 * nav, schema, and payments read from here.
 *
 * After filling: run `npx tsc --noEmit` to verify no type errors.
 */

export const CLIENT = {

  // ─── Brand ────────────────────────────────────────────────────────────────
  name:         "שם הלקוח",          // מוצג בניווט, אימיילים, פוטר
  name_en:      "client-slug",        // בשימוש ב-slugs / class names
  legal_name:   "שם הלקוח בע״מ",
  company_id:   "XXXXXXXXX",          // ח.פ / עוסק מורשה
  domain:       "example.com",
  whatsapp:     "972500000000",

  // ─── Meta & SEO ───────────────────────────────────────────────────────────
  meta: {
    title:       "שם הלקוח | תיאור קצר",
    description: "תיאור האתר לגוגל — עד 160 תווים.",
    og_image:    "/og-image.jpg",      // 1200×630 px
  },

  // ─── Colors ───────────────────────────────────────────────────────────────
  // עיין ב-CLAUDE.md לתיאור של כל טוקן
  colors: {
    bg:           "#FFFFFF",
    bg_dark:      "#F5F5F5",
    card:         "#FAFAFA",
    card_soft:    "#F0F0F0",
    border:       "#E0E0E0",
    accent:       "#000000",
    accent_light: "#333333",
    accent_dark:  "#000000",
    fg:           "#111111",
    fg_muted:     "#666666",
  },

  // ─── Hero ─────────────────────────────────────────────────────────────────
  hero: {
    image:       "/hero.jpg",          // תמונת hero ראשית
    image_alt:   "שם הלקוח",
    headline_a:  "כותרת ראשית — גרסה A",
    headline_b:  "כותרת ראשית — גרסה B",
    desc_a:      "תיאור קצר מתחת לכותרת — גרסה A.",
    desc_b:      "תיאור קצר מתחת לכותרת — גרסה B.",
    cta_a:       "קריאה לפעולה ←",
    cta_b:       "קריאה לפעולה ←",
  },

  // ─── Social proof ─────────────────────────────────────────────────────────
  social_proof: {
    stat1:   { number: "XXX+",  label: "תיאור" },
    stat2:   { number: "X",     label: "תיאור" },
    stat3:   { number: "XX%",   label: "תיאור" },
    tagline: "משפט social proof קצר",
  },

  // ─── Products ─────────────────────────────────────────────────────────────
  // כל מוצר שמופעל ב-modules חייב להיות מוגדר כאן
  products: {
    training: {
      title:       "שם הדרכה חינמית",
      slug:        "/training",
      price:       0,
      description: "תיאור קצר",
      image:       "/training.jpg",
      vimeo_id:    "",               // מזהה סרטון Vimeo (ריק = אין סרטון)
    },
    challenge: {
      title:       "שם האתגר",
      slug:        "/challenge",
      price:       197,
      description: "תיאור קצר",
      image:       "/challenge.jpg",
      vimeo_id:    "",
    },
    workshop: {
      title:       "שם הסדנה",
      slug:        "/workshop",
      price:       1000,
      description: "תיאור קצר",
      image:       "/workshop.jpg",
    },
    course: {
      title:       "שם הקורס",
      slug:        "/course",
      price:       1800,
      description: "תיאור קצר",
      image:       "/course.jpg",
    },
    strategy: {
      title:       "פגישת אסטרטגיה",
      slug:        "/strategy",
      price:       4000,
      description: "תיאור קצר",
      image:       "/strategy.jpg",
      vimeo_id:    "",
    },
    premium: {
      title:       "חבילה פרמיום",
      slug:        "/premium",
      price:       14000,
      description: "תיאור קצר",
      image:       "/premium.jpg",
    },
    partnership: {
      title:       "שותפות",
      slug:        "/partnership",
      price:       10000,
      description: "תיאור קצר",
      image:       "/og-image.jpg",
    },
    hive: {
      title:       "שם הקהילה",
      slug:        "/hive",
      price_basic: 97,
      price_discounted: 49,
      description: "תיאור קצר",
      image:       "/og-image.jpg",
    },
  },

  // ─── About ────────────────────────────────────────────────────────────────
  about: {
    title:   "על שם הלקוח",
    tagline: "כותרת מקצועית קצרה",
    body:    "פסקת אודות — מי הלקוח, ניסיון, גישה.",
    image:   "/about.jpg",
  },

  // ─── Email ────────────────────────────────────────────────────────────────
  email: {
    from_name:  "שם הלקוח",
    from_email: "noreply@example.com",
    signature:  "שם הלקוח · ישראל",
  },

  // ─── Modules — הפעלה/כיבוי פיצ׳רים ──────────────────────────────────────
  modules: {
    quiz:            true,
    hive:            true,
    challenge:       true,
    course:          false,
    workshop:        false,
    strategy:        false,
    premium:         false,
    partnership:     false,
    deals:           false,
    ab_testing:      false,
    video_analytics: false,
  },

} as const;

export type ClientConfig = typeof CLIENT;
