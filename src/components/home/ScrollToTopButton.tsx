import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { UpOutlined } from "@ant-design/icons";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 10) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      type="primary"
      shape="circle"
      icon={<UpOutlined />}
      size="large"
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        zIndex: 1000,
        color: "white",
        border: "none",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
        transition: "transform 0.3s ease, opacity 0.3s ease",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : "scale(0.8)",
      }}
      className="scroll-to-top"
    />
  );
};

export default ScrollToTopButton;
