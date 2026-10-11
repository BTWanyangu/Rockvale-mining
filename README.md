# RockValle Resources

A complete, multipage corporate website based on the supplied WiseWastes architecture and RR HTML design. It includes 27 public routes, 65 supplied images, substantive business and industry guides, a searchable gallery with a keyboard-enabled lightbox, and a secure configurable enquiry service. The source and a prebuilt production distribution are included.

**RockValle Resources** is the final name selected by the owner. The logo, navigation, page copy, metadata and enquiry templates use that spelling. This revision removes the top utility strip and public content disclaimers, and adds the 11 newly supplied images. All supplied imagery and content were approved by the user.

## Quick start

Use Node.js 22.12 or later and npm.

```bash
npm ci
cp .env.example .env
npm run dev
```

Run `npm ci` before `npm run dev`: the ZIP excludes `node_modules`, and Vite is installed as a local development dependency. If an install omits development dependencies, use `npm ci --include=dev`.

The development site is served by Vite. For development against the enquiry service, run `npm start` in a second terminal; Vite proxies `/api` to port 8080. Enquiry delivery stays disabled until SMTP configuration passes verification. Do not put secrets in any `VITE_` variable.

## Build and serve production

```bash
npm run check
npm start
```

The production server listens on port 8080 by default and serves the pre-rendered pages and the enquiry API together. Put it behind an HTTPS reverse proxy on your hosting platform. All known routes have their own static HTML file, so direct links and refreshes have meaningful content before JavaScript loads. Unknown addresses receive a 404 response from the included server.

For a build without running the full QA sequence:

```bash
npm run build
```

`dist/` is included for an immediate review deployment. Rebuild after editing source or public environment settings. Open the site through an HTTP server; opening `index.html` directly as a local file is not supported.

## Owner configuration

Edit `.env` using the placeholders in `.env.example`:

| Setting                                            | Purpose                                                                                                            |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `VITE_SITE_URL`                                    | Confirmed `https://` origin, without a trailing path; used for canonicals, structured data and sitemap generation. |
| `VITE_PUBLIC_INDEXING`                             | Leave `false` for review. Set `true` only when content and domain are ready for public indexing, then rebuild.     |
| `VITE_CONTACT_EMAIL`, `VITE_CONTACT_PHONE`         | Confirmed public company contact details.                                                                          |
| `VITE_CONTACT_ADDRESS`, `VITE_CONTACT_HOURS`       | Confirmed address and hours; omitted from the UI when blank.                                                       |
| `VITE_API_BASE`                                    | Leave empty for same-origin hosting. A separate API origin may be used with matching CORS configuration.           |
| `CONTACT_ENABLED`                                  | Set `true` only to activate the configured SMTP service.                                                           |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Server-only SMTP connection credentials. Port 465 uses immediate TLS; other ports require STARTTLS.                |
| `MAIL_FROM`, `MAIL_TO`                             | Verified sender and the company recipient. Visitor input cannot override them.                                     |
| `SITE_URL`, `CONTACT_ALLOWED_ORIGINS`              | Confirmed origins allowed to submit enquiries. For split hosting, include the frontend origin.                     |
| `TRUST_PROXY_HOPS`                                 | Leave zero for direct access; set the exact number of trusted reverse-proxy hops if applicable.                    |

`VITE_` settings are public and embedded at build time. SMTP credentials are runtime-only and stay on the server. No populated `.env`, reference credentials, Git history or dependency directory is included in the ZIP.

The form checks `/api/contact-config`. When delivery is disabled, visitors can validate and download a local enquiry file; the UI states clearly that the file has not been sent. A submission returns success only when the verified mail transport reports an accepted recipient. This is SMTP acceptance, not a guarantee of inbox placement. Live delivery needs an end-to-end check using your actual email service.

## Docker deployment

```bash
cp .env.example .env
# Fill the verified public settings and server-only credentials as needed.
docker compose -f docker-compose.prod.yml up -d --build
```

The service binds to `127.0.0.1:8080` so an HTTPS reverse proxy can expose it. The container uses a non-root user, a read-only filesystem, dropped capabilities and a health check. Public settings are build arguments; private email settings are runtime variables. The Docker configuration is supplied but was not executed in the authoring environment.

Static-only hosting is also possible by publishing `dist/`. Vercel, Netlify and an Nginx example are included. These do not run the Express enquiry service automatically; without a separate API, the contact page provides enquiry downloads. For the least setup, use the included Node or Docker production server.

## Routes

| Area                 | Routes                                                                                                                                                                                                                      |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Introduction         | `/`, `/about`                                                                                                                                                                                                               |
| Business             | `/services`, `/services/exploration-and-development`, `/services/mining-and-processing`, `/services/trading-and-distribution`, `/services/recycling-and-recovery`                                                           |
| Resource chain       | `/operations`                                                                                                                                                                                                               |
| Commodity guide      | `/commodities`, `/commodities/copper`, `/commodities/cobalt`, `/commodities/nickel`, `/commodities/zinc-and-lead`, `/commodities/ferroalloys`, `/commodities/precious-metals-and-gemstones`, `/commodities/energy-and-coal` |
| Responsible business | `/sustainability`, `/governance`                                                                                                                                                                                            |
| Photography          | `/gallery`                                                                                                                                                                                                                  |
| Insights             | `/insights`, `/insights/why-copper-matters`, `/insights/from-mine-to-market`, `/insights/a-second-life-for-materials`                                                                                                       |
| Connections          | `/partners`, `/contact`                                                                                                                                                                                                     |
| Website information  | `/privacy`, `/terms`                                                                                                                                                                                                        |

The wildcard route supplies a not-found view. `dist/404.html` is included for static hosting.

## Architecture

- `src/pages/`: dedicated route components and reusable detail templates.
- `src/components/layout/`: shared header, native mobile dialog, logo and footer.
- `src/components/ui/`: transitions, images, page heroes, SEO, carousels, lightbox and common controls.
- `src/components/home/`, `services/`, `contact/`: bounded feature compositions.
- `src/data/`: typed business, commodity and insight content plus the asset inventory and route list.
- `src/lib/images.ts`: the central Vite image glob and descriptive image registry, following WiseWastes’ pattern.
- `shared/enquiry.mjs`: common client/server validation and enquiry formatting.
- `server/`: Express app, delivery semantics and rate limiting.
- `scripts/`: static rendering, build checks and production HTTP smoke checks.
- `tests/`: meaningful enquiry, API and gallery checks.
- `source-assets/originals/`: all 65 original JPEGs, excluded from the production web build and Docker image.
- `docs/`: architecture, asset inventory, content decisions, QA results and deployment checklist.

The retained stack is React 19, TypeScript 5.9, Tailwind CSS 4 with PostCSS, React Router 7, Framer Motion 12, Embla 8, Lucide, clsx, React Helmet, Express and Nodemailer. The reference’s Vite-compatible `rolldown-vite` 7.2.5 alias is retained. Nodemailer is upgraded to 10.0.16 because the dependency audit identified a high-severity issue in the supplied version. Prettier is an added development-only formatting tool; no replacement UI framework is introduced.

## Styling, content and assets

The central design tokens in `src/index.css` retain the RR HTML’s charcoal, gold, white and muted palette, editorial hierarchy and responsive compositions. Reused WiseWastes conventions include shared layout/ui boundaries, typed data, central image discovery, route transitions, carousels, sticky navigation and a server-side email integration.

Add or edit content in `src/data/services.ts`, `commodities.ts` and `insights.ts`. The asset registry has meaningful alt text and all supplied files appear in the gallery. Optimized WebP images and thumbnails sit under `src/assets/pages/gallery/gallery/`. Original images are retained separately. The expanded collection includes specimen photographs, mineral charts, gold guides and a copper-mineral guide. Charts preserve their full composition in the gallery and relevant editorial sections. All originals remain available in the package.

All detailed pages are pre-rendered and use unique titles and descriptions. With a configured domain, the build writes canonicals and a sitemap. Review builds default to `noindex` and `robots.txt` disallows indexing. Privacy and terms pages use their own indexing settings.

## Checks and limits

```bash
npm run lint
npm test
npm run build
node scripts/check-build.mjs
node scripts/check-server.mjs
```

See `docs/QA-REPORT.md` for actual results. These checks verify typing, lint, gallery logic, validation, abuse controls, SMTP acceptance/failure semantics, rendered routes, internal links, image paths and production HTTP serving. Browser interaction, visual viewport testing, Docker execution and live SMTP delivery were not available and are not reported as passed.

Before public launch, complete `docs/DEPLOYMENT-CHECKLIST.md`. It separates owner-supplied facts and external credentials from verification that still needs a real browser or your actual hosting/email setup.
