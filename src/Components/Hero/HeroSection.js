import Styles from "./HeroSection.module.css";
import img from "../../Assets/hero.jpg";
import { Button } from "@mui/material";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../Utils/LanguageContext";

const HeroSection = () => {
  let mystrings;
  const nav = useNavigate();
  mystrings = [""];
  useEffect(() => {
    mystrings.push(
      language === "en"
        ? "Exceptional flavors, perfected seasoning"
        : "نكهات استثنائية، توابل مثالية"
    );

    const typed = new Typed(el.current, {
      strings: mystrings,
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, [mystrings]);
  const el = useRef();

  const { language } = useLanguage();

  return (
    <header
      className={`${Styles.HeroSection} ${
        language === "ar" ? Styles.HeroSectionAR : ""
      }`}
    >
      <div
        className={`${Styles.left} ${language === "ar" ? Styles.leftAR : ""}`}
      >
        <p className={Styles.P}>
          {language === "en"
            ? "Our Best Of World Class Spices"
            : "أفضل أنواع البهارات العالمية لدينا"}
        </p>
        <div
          className={`${Styles.SloganContainer} ${
            language === "ar" ? Styles.SloganContainerAR : ""
          }`}
        >
          <h1 className={Styles.Slogan}>
            <span ref={el}>
              {language === "en"
                ? "Exceptional flavors, perfected seasoning"
                : "نكهات استثنائية، توابل مثالية"}
            </span>
          </h1>
        </div>
        <Button
          size="large"
          variant="contained"
          sx={{
            bgcolor: "#C86823",
            color: "white",
            fontSize: "1.3rem",
            ":hover": {
              bgcolor: "#A0471D",
            },
            textTransform: "none",
          }}
          onClick={() => {
            nav("/products");
          }}
        >
          {language === "en" ? "Discover Products" : "إستكشف منتجاتنا"}
        </Button>
      </div>
      <div className={Styles.right}>
        <img
          className={Styles.img}
          src={img}
          alt="Lalezar Logo"
          loading="lazy"
        />
      </div>
    </header>
  );
};

export default HeroSection;
