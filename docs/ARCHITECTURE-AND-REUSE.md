# Architecture and reuse

## Sources of truth

The delivered `Wisewastes.zip` source was extracted and inspected, including package and TypeScript configuration, application entry points and routes, layout/navigation/mobile-menu components, hero and service compositions, detail-page patterns, shared carousel and image utilities, SEO, contact form, Express mail service and deployment rewrite. The original archive passed integrity testing.

The RR HTML supplied the visual direction; its single-page anchors and modal information panels were converted into dedicated routes. The owner selected **RockValle Resources** as the final spelling. The original RR monogram is retained with an updated wordmark. Glencore was reviewed for corporate hierarchy, commodity information, physical supply-chain explanations, sustainability topics and recovery context. Its company assets, scale, performance and claims are not attributed to RR.

## Retained and adapted

| Reference pattern                          | RR implementation                                                                                                    |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| React + TypeScript + Tailwind 4/PostCSS    | Same core language and styling system, with strict TypeScript checks.                                                |
| Vite-compatible rolldown-vite 7.2.5 alias  | Retained build ecosystem, minification enabled and production source maps disabled.                                  |
| BrowserRouter, Routes and shared PageShell | Dedicated routes, shared Header/Footer, route-level lazy loading and a 404 view.                                     |
| AnimatePresence and motion page wrappers   | Route transitions, restrained movement, image/card interactions and reduced-motion support.                          |
| Central `import.meta.glob` image registry  | A single registry maps 65 described assets to pages, responsive sources and thumbnails.                              |
| Shared ImageCarousel and Embla             | Accessible manual carousels, drag controls and labelled previous/next buttons.                                       |
| `useAutoSlider` hero behaviour             | Rotating hero photographs with pause, focus/hover pause and reduced-motion suppression.                              |
| Click dropdowns and mobile drawer          | Click/keyboard dropdowns, outside/Escape closing and a native modal dialog for the mobile drawer.                    |
| Helmet page metadata                       | Unique metadata, conditional domain-based canonicals and minimal verified Organization data.                         |
| Express + Nodemailer email flow            | Same server approach with shared validation, configured recipients, TLS, origin checks and rate limiting.            |
| Vercel SPA fallback                        | Static rendering improves direct routes; known pages receive real HTML rather than all being served as the homepage. |

The RR visual system follows the supplied HTML instead of reusing the green WiseWastes brand. Typography uses the reference’s system-font approach without remote font dependencies. Small gold text is darkened for contrast while the warm gold accent and charcoal compositions are retained.

## Improvements and deliberate choices

Pre-rendering supplies content, headings and links before JavaScript. The build passes an eager page registry to the same route component; the browser retains lazy page imports and hydrates the completed HTML. React's static rendering API keeps completed Suspense boundaries inline, including large pages, so the output needs no inline recovery scripts. React 19 metadata is placed in the document head and adopted during hydration. This uses the existing Vite module pipeline and React rendering, without introducing Next.js or another framework.

All photo originals are retained but excluded from the published build. The registry records descriptive subjects, dimensions and image categories. No photo is excluded; visual near duplicates remain available.

The reference did not include established RR contacts, project histories, certifications or policy disclosures. The revised site uses approved editorial content and supplied imagery without public draft or content-warning banners. News, team and careers pages were not created without their underlying facts.

Nodemailer was moved from the reference’s v8 range to 10.0.16 after npm audit identified a high-severity advisory. It remains the same mail library and its send/verify API is validated by the included tests. Prettier is added only for readable source formatting. The reference’s optional ecosystem packages are retained in the package manifest; unused libraries do not enter the frontend bundle.

The production service uses same-origin hosting by default. SMTP settings stay private, readiness is verified at startup and success requires an accepted mail recipient. Static-only hosting has an explicit enquiry-download fallback. No accounts, tracking or fabricated integrations were added.
