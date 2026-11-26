import { useEffect, useRef, useState } from "react";

export default function ScrollProgress({ className = "" }) {
  const barRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = doc.scrollHeight - window.innerHeight;
      const nextProgress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

      setProgress(Math.min(Math.max(nextProgress, 0), 1));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className={className}
      style={{ width: `${progress * 100}%` }}
    />
  );
}