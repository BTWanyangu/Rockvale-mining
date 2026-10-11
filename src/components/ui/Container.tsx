import { clsx } from "clsx";
import type { HTMLAttributes } from "react";
export default function Container({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("wrap", className)} {...props} />;
}
