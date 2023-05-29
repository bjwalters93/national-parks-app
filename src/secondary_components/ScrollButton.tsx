import * as React from "react";
import scrollToTop from "../images/scrollToTop.png";
import "./ScrollButton.css";

const ScrollButton = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 300) {
        setVisible(true);
      } else if (scrolled <= 300) {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <button
      className={visible ? "scroll_to_top_visible" : "scroll_to_top_hide"}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
    >
      <img
        src={scrollToTop}
        alt="scroll to top"
        width={20}
        style={{
          display: "block",
        }}
      />
      Top
    </button>
  );
};

export default ScrollButton;
