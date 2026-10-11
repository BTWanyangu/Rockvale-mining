import { useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
export default function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const element = useRef<HTMLDivElement>(null);
  const visible = useInView(element, { once: true, amount: 0.08 });
  return (
    <div
      ref={element}
      className={`reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
    >
      {children}
    </div>
  );
}
