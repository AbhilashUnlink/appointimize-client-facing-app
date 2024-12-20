import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);

  // Toggle visibility based on scroll
  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    show && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-3 right-6  bg-purple-600 text-white p-3 rounded-full shadow-md hover:bg-purple-800"
      >
        <FaArrowUp />
      </button>
    )
  );
};

export default ScrollToTopButton;
