import Styles from "./Hero.module.css";
import img from "../../Assets/aboutUs.jpg";
import { useLanguage } from "../../Utils/LanguageContext";

const Hero = () => {
  const { language } = useLanguage();

  return (
    <article className={Styles.blogsContainer}>
      <main className={Styles.blogsMain}>
        <figure className={Styles.blogsHero}>
          <div className={Styles.centeredImage}>
            <picture>
              <source srcSet={img} media="(orientation: portrait)" />
              <source srcSet={img} media="(orientation: landscape)" />

              <img src={img} alt="Descriptive Alt Text" />
            </picture>
          </div>
          <h1 className={Styles.blogsTitle}>
            {language === "en"
              ? "Providing the best experience to make your"
              : "توفير أفضل تجربة للقيام"}{" "}
            <span className={Styles.span}>
              {language === "en" ? "Online Shopping" : "بالتسوق عبر الإنترنت"}
            </span>
          </h1>
        </figure>
      </main>
    </article>
  );
};

export default Hero;
