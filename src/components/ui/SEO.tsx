import { Helmet } from "react-helmet-async";
import { site } from "../../data/site";
export default function SEO({
  title,
  description,
  canonical,
  noindex = false,
}: {
  title: string;
  description: string;
  canonical: string;
  noindex?: boolean;
}) {
  const pageTitle =
    title === site.name
      ? `${site.name} | Exploration, mining & trading`
      : `${title} | ${site.name}`;
  const url = site.url
    ? `${site.url}${canonical === "/" ? "/" : canonical}`
    : "";
  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={
          noindex || !site.indexing ? "noindex, nofollow" : "index, follow"
        }
      />
      {url && <link rel="canonical" href={url} />}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      {url && <meta property="og:url" content={url} />}
      {site.url && (
        <meta
          property="og:image"
          content={`${site.url}/assets/branding/rockvalle-resources.png`}
        />
      )}
      <meta name="twitter:card" content="summary" />
      {site.url && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.name,
            url: site.url,
            logo: `${site.url}/assets/branding/rockvalle-resources.png`,
          })}
        </script>
      )}
    </Helmet>
  );
}
