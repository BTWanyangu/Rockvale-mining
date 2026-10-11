import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Container from "../ui/Container";
import MobileMenu from "../ui/MobileMenu";
import Logo from "./Logo";
import { nav } from "../../data/site";
import type { NavItem } from "../../data/site";
import { useScrollThreshold } from "../../lib/useScrollThreshold";
function Dropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  const active = [
    item.to,
    ...(item.children?.map((child) => child.to) ?? []),
  ].some((route) => pathname === route || pathname.startsWith(`${route}/`));
  useEffect(() => {
    const close = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);
  const id = `nav-${item.to.slice(1)}`;
  return (
    <div
      className="nav-group"
      ref={ref}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          button.current?.focus();
        }
      }}
    >
      <button
        ref={button}
        className={`nav-link ${active ? "is-active" : ""}`}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
      >
        {item.label}
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={open ? "rotate" : ""}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id={id}
            className="nav-dropdown"
            initial={reduce ? false : { y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? undefined : { y: -5, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {item.children?.map((child) => (
              <NavLink
                to={child.to}
                end
                key={child.to}
                onClick={() => setOpen(false)}
              >
                {child.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrollThreshold(8);
  return (
    <>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <Container className="nav-row">
          <Logo />
          <nav className="main-nav" aria-label="Main navigation">
            {nav.map((item) =>
              item.children ? (
                <Dropdown key={item.to} item={item} />
              ) : (
                <NavLink
                  to={item.to}
                  key={item.to}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "is-active" : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>
          <Link className="nav-cta" to="/contact">
            Let’s work together
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-label="Open main menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <span>Menu</span>
            <Menu size={19} aria-hidden="true" />
          </button>
        </Container>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
