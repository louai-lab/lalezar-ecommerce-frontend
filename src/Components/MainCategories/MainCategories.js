import React from "react";
import Styles from "./MainCategories.module.css";
import image1 from "../../Assets/category1.jpg";
import image2 from "../../Assets/category2.jpg";
import { Button } from "@mui/material";
import Spices from "../../Assets/Spices.png";
import Organic from "../../Assets/Organic.png";
import { useNavigate } from "react-router-dom";
import { Reveal } from "../../RevealAnimation";
import Loading from "../../Pages/Loading/Loading";
import { useLanguage } from "../../Utils/LanguageContext";

const MainCategories = ({ categories, loading }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  return (
    <article className={Styles.container}>
      {loading ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "20vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              color: "black",
              fontWeight: "700",
            }}
          >
            <Loading />
          </p>
        </div>
      ) : (
        categories.map((item, index) => {
          return (
            <Reveal key={index}>
              <section
                to={`/products`}
                className={`${Styles.section} ${Styles.spin} ${Styles.circle}`}
              >
                <img src={Spices} alt={item.name} className={Styles.img} />
                <p className={Styles.p}>
                  {language === "en" ? `${item.name}` : `${item.name_AR}`}
                </p>
                <span className={Styles.btn}>
                  <Button
                    onClick={() => navigate(`/products`)}
                    variant="contained"
                    sx={{
                      zIndex: 1,
                      bgcolor: "#C86823",
                      ":hover": {
                        bgcolor: "#A0471D",
                      },
                    }}
                  >
                    {language === "en" ? "View More" : "عرض المزيد"}
                  </Button>
                </span>
              </section>
            </Reveal>
          );
        })
      )}
    </article>
  );
};

export default MainCategories;
