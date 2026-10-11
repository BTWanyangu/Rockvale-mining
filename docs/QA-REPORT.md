# RockValle Resources verification report

Revision: 11 October 2026. The owner selected RockValle Resources, approved the supplied images/content, and requested removal of the top header strip and public content disclaimers.

## Completed checks

| Check | Result | Evidence |
| --- | --- | --- |
| Final brand | PASS | Logo wordmark, navigation, copy, metadata, package identity and enquiry templates use RockValle Resources. The updated logo PNG was visually inspected. The exact RR monogram is preserved in a clipped SVG viewport. |
| Requested removals | PASS | All 28 rendered pages were checked for the removed utility strip and content-note banners. Public draft, ownership and commodity-availability caveats are removed. |
| TypeScript and ESLint | PASS | `npm run check` completed lint and strict build checks. |
| Application logic | PASS — 18 tests | Enquiry validation, abuse controls, mail acceptance/failure semantics, gallery filters/search and lightbox wrapping. |
| Production render | PASS — 27 routes + 404 | Unique metadata, one visible main heading per page, completed HTML before JavaScript, and no inline executable recovery scripts. |
| Links and assets | PASS | 1,167 internal link references and 665 asset references resolved in rendered production pages. |
| Expanded gallery | PASS — 65 images | All 65 originals are preserved with SHA-256 verification; all 65 images appear in the gallery. The 11 new records include mineral charts, gold/copper guides and specimen images. One supplied exact duplicate pair is retained. |
| HTML structure | PASS — 28 pages | HTML parser found no duplicate IDs; every image has alt text and explicit dimensions. |
| Solid colour contrast | PASS — 9 pairs | Body, secondary text, gold labels and buttons meet the normal-text AA threshold for the tested solid colour pairs. |
| Production HTTP serving | PASS | All known routes, nested URL refresh, trailing slash, unknown-route 404, health, asset MIME/cache behaviour and security headers. |
| Mail state without credentials | PASS | Readiness reports disabled; submission returns 503. No false sent receipt is displayed. |
| Dependency audit | PASS — zero known findings | Fresh `npm audit --json` reported no low, moderate, high or critical findings. |

Machine-readable details are in build-check-results.json, server-check-results.json, static-html-check-results.json, contrast-check-results.json, bundle-size-results.json, dependency-audit-results.json and asset-inventory.json.

## Package reproducibility

PASS: the archive was extracted to a fresh directory, `npm ci --include=dev --no-audit --no-fund` and `npm run check` completed, and all 196 rebuilt distribution files matched the included output byte-for-byte. Application source also matched. Complete ZIP integrity passed. The results are recorded in package-check-results.json. Source, lockfile, deployment settings, documentation, all original images and the complete production distribution are included. Dependency directories, private environment files, caches and temporary logs are excluded. Run `npm ci` before `npm run dev`; this installs the local Vite dependency.

## Build size

The production entry JavaScript is 495,040 bytes (149,171 measured gzip bytes). Entry CSS is 48,143 bytes (10,947 measured gzip bytes). Page modules remain separate chunks. Images use proportional WebP variants, explicit dimensions and lazy loading below the fold. Originals stay outside the production web build.

## Target-environment checks

Interactive browser/viewport and screen-reader checks, Docker execution and live SMTP/inbox delivery were not run in this authoring environment. Verify these on the intended host. Domain, HTTPS, contact details and email settings are documented in DEPLOYMENT-CHECKLIST.md and `.env.example`. Automated checks and the reviewed logo render are reported above; they do not claim those separate checks were completed.
