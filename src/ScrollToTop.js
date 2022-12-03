// ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router";

// component to force react router links go to top of page when revisited instead of their normal behavior
// of going back to last scroll position

const ScrollToTop = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <> {children} </>
};

export default ScrollToTop;