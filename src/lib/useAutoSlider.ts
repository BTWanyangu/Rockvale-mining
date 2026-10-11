import { useCallback, useEffect, useState } from "react";
export function useAutoSlider({
  length,
  interval = 6000,
  paused = false,
}: {
  length: number;
  interval?: number;
  paused?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const goTo = useCallback(
    (n: number) => setIndex(length ? (n + length) % length : 0),
    [length],
  );
  useEffect(() => {
    if (paused || length < 2) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex((value) => (value + 1) % length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [length, interval, paused]);
  return { index: length ? index % length : 0, goTo };
}
