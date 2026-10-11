import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import BackToTop from "../ui/BackToTop";
import { useLocation } from "react-router-dom";
export default function PageShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div className="site-shell">
      <a href="#main-content" className="skip">
        Skip to content
      </a>
      <Header key={pathname} />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
