import { useState, useEffect, useRef } from "react";

function Fade({ children, bottom, duration = 500, ...props }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible
      ? "translateY(0)"
      : bottom
        ? "translateY(30px)"
        : "translateY(0)",
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
  };

  return (
    <div ref={ref} style={style} {...props}>
      {children}
    </div>
  );
}

export default Fade;
