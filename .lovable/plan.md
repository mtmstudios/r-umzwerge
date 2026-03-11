

## Homepage CRO Alignment Plan

### Overview
Update the Homepage to align with the "Phone Call Closing" lead strategy by updating CTAs, copy, process steps, service card routing, and adding a new "About Us" trust section.

### Changes

**1. HeroSection.tsx** — Copy & CTA update
- Change subheadline to: "Kostenlose Ersteinschätzung am Telefon – schnell, diskret und unverbindlich."
- Change primary CTA text from "Angebot berechnen" to "Rückruf anfordern"

**2. ProcessSection.tsx** — Step 2 update & CTA alignment
- Update Step 2: title → "Telefonische Einschätzung", description → "Wir rufen Sie umgehend an, besprechen die Details und nennen Ihnen oft direkt einen Festpreis."
- Change CTA text to "Rückruf anfordern"
- Add secondary phone CTA button (Dual-CTA system)

**3. FinalCTASection.tsx** — Headline update
- Change H2 to "Kostenlose Ersteinschätzung anfordern"
- Change primary CTA text to "Rückruf anfordern"

**4. PricingSection.tsx** — CTA alignment
- Change button text from "Angebot berechnen" to "Rückruf anfordern"
- Update description text to match phone-callback focus

**5. BentoCard.tsx** — Link text update
- Change "Zur Lösung" to "Mehr erfahren"

**6. ServicesSection.tsx** — Route updates
- Map specific service slugs to landing page routes:
  - `wohnungsentruempelung` → `/lp/entruempelung`
  - `haushaltsaufloesung` → `/lp/haushaltsaufloesung`
  - `messie-wohnungen` → `/lp/messie-hilfe`
  - Others keep `/leistungen/{slug}` pattern

**7. New: AboutSection.tsx** — Trust/team section
- 2-column layout (image left, text right), stacking on mobile
- H2: "Wer sind die Räumzwerge?"
- Empathetic paragraph about regional trustworthiness, discretion, punctuality
- Signature-style text (e.g., "– Ihr Team der Räumzwerge")
- Placeholder for team photo using existing `hero-team.jpg` asset

**8. Index.tsx** — Insert AboutSection
- Add the new section after PricingSection, before BeforeAfterSection
- Include appropriate SectionDivider

### Mobile Responsiveness
- AboutSection: `grid md:grid-cols-2`, stacks vertically on mobile with 48px padding
- All Dual-CTAs: `flex-col w-full` on mobile, `sm:flex-row sm:w-auto` on desktop
- Consistent with existing responsive patterns

