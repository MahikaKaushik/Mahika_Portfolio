import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash.replace("#", ""));
        if (el) {
          el.scrollIntoView({ behavior: "instant" });
        }
      }, 50);
    } else if (pathname !== "/") {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
