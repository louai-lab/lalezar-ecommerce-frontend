import { Button } from "@mui/material";
import Styles from "./BlogCard.module.css";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../Utils/LanguageContext";

const BlogCard = ({
  title,
  title_ar,
  image,
  description,
  description_ar,
  slug,
}) => {
  const navigate = useNavigate();

  const { language } = useLanguage();

  // console.log(image);

  const createMarkup = () => {
    // Split the description into words
    // const words = description.split(" ");

    const desc = language === "ar" ? description_ar : description;

    // Split the description into words
    const words = desc.split(" ");
    // Take the first 4 words
    const truncatedWords = words.slice(0, 6);

    // Join the words back together
    const truncatedDescription = truncatedWords.join(" ");

    // Add 3 dots if there are more words
    const finalDescription =
      words.length > 4 ? `${truncatedDescription}...` : truncatedDescription;

    return { __html: finalDescription };
  };

  return (
    <section className={Styles.container}>
      <img
        src={`${process.env.REACT_APP_IMAGE_PATH}${image}`}
        alt=""
        className={Styles.img}
      />
      <div className={Styles.bottom}>
        <span className={Styles.bottomFirst}>
          <h3 className={Styles.title}>
            {language === "en" ? title : title_ar}
          </h3>
          <span className={Styles.btn1}>
            <Button
              onClick={() => navigate(`/blogs/${slug}`)}
              sx={{
                bgcolor: "var(--color1)",
                color: "white",
                border: "1.5px solid transparent",
                transition: "opacity 0.3s ease-in-out",
                // ":hover": {
                //   border: "1.5px solid #c86823",
                // },
                "&:hover": {
                  opacity: 0.7,
                  bgcolor: "var(--color1)",
                },
              }}
            >
              {language === "en" ? "Read more" : "اقرأ المزيد"}
            </Button>
          </span>
        </span>
        <div
          className={Styles.p}
          dangerouslySetInnerHTML={createMarkup()}
        ></div>
        <span className={Styles.btn2}>
          <Button
            onClick={() => navigate(`/blogs/${slug}`)}
            sx={{
              bgcolor: "var(--color1)",
              color: "white",
              border: "1.5px solid transparent",
              transition: "opacity 0.3s ease-in-out",
              // ":hover": {
              //   border: "1.5px solid #c86823",
              // },
              "&:hover": {
                opacity: 0.7,
                bgcolor: "var(--color1)",
              },
            }}
          >
            {language === "en" ? "Read more" : "اقرأ المزيد"}
          </Button>
        </span>
      </div>
    </section>
  );
};

export default BlogCard;
