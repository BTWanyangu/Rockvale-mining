import { clsx } from "clsx";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { ButtonHTMLAttributes, ReactNode } from "react";
export function LinkButton({
  to,
  children,
  variant = "gold",
  arrow = true,
  className,
}: {
  to: string;
  children: ReactNode;
  variant?: "gold" | "dark" | "outline";
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link className={clsx("btn", variant, className)} to={to}>
      {children}
      {arrow && <ArrowUpRight size={17} aria-hidden="true" />}
    </Link>
  );
}
export default function Button({
  children,
  className,
  variant = "dark",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "gold" | "dark" | "outline";
}) {
  return (
    <button
      type="button"
      className={clsx("btn", variant, className)}
      {...props}
    >
      {children}
    </button>
  );
}
