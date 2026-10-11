import { NavLink, useLocation } from "react-router-dom";
import { X, ChevronDown, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { nav } from "../../data/site";
import { useDialog } from "../../lib/useDialog";
import Logo from "../layout/Logo";
export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const ref = useDialog(open);
  const reduce = useReducedMotion();
  const { pathname } = useLocation();
  return (
    <dialog
      ref={ref}
      className="mobile-dialog"
      aria-label="Main menu"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right) onClose();
      }}
    >
      <motion.div
        initial={false}
        animate={{ x: open ? 0 : 40 }}
        transition={{ duration: reduce ? 0 : 0.2 }}
      >
        <div className="mobile-menu-top">
          <Logo onClick={onClose} />
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close menu"
            autoFocus
          >
            <X aria-hidden="true" />
          </button>
        </div>
        <nav className="mobile-nav" aria-label="Main navigation">
          {nav.map((item) =>
            item.children ? (
              <details
                key={item.label}
                open={[item.to, ...item.children.map((child) => child.to)].some(
                  (route) =>
                    pathname === route || pathname.startsWith(`${route}/`),
                )}
              >
                <summary>
                  {item.label}
                  <ChevronDown size={19} aria-hidden="true" />
                </summary>
                <div>
                  {item.children.map((child) => (
                    <NavLink key={child.to} to={child.to} end onClick={onClose}>
                      {child.label}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </NavLink>
                  ))}
                </div>
              </details>
            ) : (
              <NavLink key={item.to} to={item.to} onClick={onClose}>
                {item.label}
                <ArrowUpRight size={18} aria-hidden="true" />
              </NavLink>
            ),
          )}
          <NavLink to="/partners" onClick={onClose}>
            Suppliers & partners
            <ArrowUpRight size={18} aria-hidden="true" />
          </NavLink>
          <NavLink to="/contact" className="mobile-contact" onClick={onClose}>
            Let’s work together
            <ArrowUpRight size={18} aria-hidden="true" />
          </NavLink>
        </nav>
        <p className="mobile-tagline">
          Natural resources.
          <br />
          Lasting value.
        </p>
      </motion.div>
    </dialog>
  );
}
