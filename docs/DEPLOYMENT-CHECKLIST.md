# Deployment checklist

## Hosting and contact configuration

- The owner has selected RockValle Resources and approved the supplied imagery and editorial content.
- Complete the public contacts in `.env` when available.
- Set the real `VITE_SITE_URL`/`SITE_URL`, configure DNS and HTTPS, and select the Node/Docker or static hosting route.
- Enable gzip or Brotli at the HTTPS reverse proxy or hosting edge for JavaScript, CSS and HTML.
- If email is required, set SMTP and sender/recipient variables, enable `CONTACT_ENABLED`, and perform a real end-to-end enquiry test. Check inbox/spam placement separately from SMTP acceptance.
- For a reverse proxy, configure the exact trusted hop count. For multiple API processes, replace the in-memory request limiter with a shared store or edge rate limiting.
- Set `VITE_PUBLIC_INDEXING=true` only when ready for public indexing, then rebuild to emit final canonicals, robots rules and sitemap URLs.

## Verification still required in the target environment

- Check mobile and desktop layouts, including 320px, 375px, 768px and a full desktop viewport, in a real browser.
- Exercise keyboard dropdowns, mobile dialog, gallery filtering/lightbox, carousel controls, enquiry validation/download and reduced-motion preferences.
- Check browser console and network errors, keyboard focus, contrast over actual images and screen-reader labels.
- If using Docker, build/run the supplied container and verify the health check and reverse proxy.
- If using static hosting, confirm directory-index route serving and 404 behaviour; configure an API separately if email delivery is needed.

The code build, automated logic tests, pre-rendered route/link/image checks and included production-server HTTP checks are recorded in QA-REPORT.md. Browser, Docker and live-email checks are not represented as already executed.
