import { lazy, Suspense, type ComponentType, type ComponentProps } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import PageShell from "./components/layout/PageShell";
import ScrollToTop from "./components/ui/ScrollToTop";
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Operations = lazy(() => import("./pages/Operations"));
const Commodities = lazy(() => import("./pages/Commodities"));
const CommodityDetail = lazy(() => import("./pages/CommodityDetail"));
const Sustainability = lazy(() => import("./pages/Sustainability"));
const Governance = lazy(() => import("./pages/Governance"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Insights = lazy(() => import("./pages/Insights"));
const InsightDetail = lazy(() => import("./pages/InsightDetail"));
const Partners = lazy(() => import("./pages/Partners"));
const Contact = lazy(() => import("./pages/Contact"));
const Legal = lazy(() => import("./pages/Legal"));
const NotFound = lazy(() => import("./pages/NotFound"));
const browserPages = {
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
export type PageComponents = {
  [Name in keyof typeof browserPages]: ComponentType<
    ComponentProps<(typeof browserPages)[Name]>
  >;
};
export default function App({
  pages = browserPages,
}: { pages?: PageComponents } = {}) {
  const {
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
  } = pages;
  const location = useLocation();
  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <PageShell>
        <Suspense
          fallback={
            <div className="route-loading wrap" role="status">
              Loading page…
            </div>
          }
        >
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/operations" element={<Operations />} />
              <Route path="/commodities" element={<Commodities />} />
              <Route path="/commodities/:slug" element={<CommodityDetail />} />
              <Route path="/sustainability" element={<Sustainability />} />
              <Route path="/governance" element={<Governance />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/insights/:slug" element={<InsightDetail />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Legal kind="privacy" />} />
              <Route path="/terms" element={<Legal kind="terms" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </PageShell>
    </MotionConfig>
  );
}
