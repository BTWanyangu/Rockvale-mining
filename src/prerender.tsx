import { prerenderToNodeStream } from "react-dom/static";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App, { type PageComponents } from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Operations from "./pages/Operations";
import Commodities from "./pages/Commodities";
import CommodityDetail from "./pages/CommodityDetail";
import Sustainability from "./pages/Sustainability";
import Governance from "./pages/Governance";
import Gallery from "./pages/Gallery";
import Insights from "./pages/Insights";
import InsightDetail from "./pages/InsightDetail";
import Partners from "./pages/Partners";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";
const pages: PageComponents = {
  Home,
  About,
  Services,
  ServiceDetail,
  Operations,
  Commodities,
  CommodityDetail,
  Sustainability,
  Governance,
  Gallery,
  Insights,
  InsightDetail,
  Partners,
  Contact,
  Legal,
  NotFound,
};
export async function render(
  pathname: string,
): Promise<{ body: string; head: string }> {
  const errors: unknown[] = [];
  // The static API waits for lazy routes before emitting the completed tree.
  // Streaming SSR can leave hidden segments that require inline recovery code.
  const { prelude, postponed } = await prerenderToNodeStream(
    <HelmetProvider>
      <StaticRouter location={pathname}>
        <App pages={pages} />
      </StaticRouter>
    </HelmetProvider>,
    {
      signal: AbortSignal.timeout(15000),
      // Keep large, completed Suspense boundaries inline in the static page.
      progressiveChunkSize: Number.MAX_SAFE_INTEGER,
      onError(error) {
        errors.push(error);
      },
    },
  );
  let body = "";
  for await (const chunk of prelude) body += chunk.toString();
  if (errors.length) throw errors[0];
  if (postponed) throw new Error(`Incomplete static rendering: ${pathname}`);
  // React 19 hoists Helmet's native title, meta and link elements. Hydration
  // adopts them from the document head. JSON-LD keeps its body position.
  const head: string[] = [];
  body = body.replace(
    /<title\b[^>]*>[\s\S]*?<\/title>|<meta\b[^>]*\/?\s*>|<link\b[^>]*\/?\s*>/g,
    (element) => {
      head.push(element);
      return "";
    },
  );
  if (!head.some((element) => element.startsWith("<title")))
    throw new Error(`Missing page title on ${pathname}`);
  return { body, head: head.join("\n") };
}
