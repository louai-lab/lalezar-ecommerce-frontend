import Styles from "./Blogs.module.css";
// import defaultPort from './port.jpeg';
import defaultLand from "../../Assets/blogHero.jpeg";
import defaultPort from "../../Assets/blogsHeroPort.jpg";
import BlogCard from "../../Components/BlogCard/BlogCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../Utils/LanguageContext";

export default function Blogs() {
  const [latestBlog, setLatestBlog] = useState({});

  const { language } = useLanguage();
  const createdAtDate = new Date(latestBlog.createdAt);

  const formatDate = (date, lang) => {
    if (lang === "ar") {
      const months = [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
      ];
      return `${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()}`;
    } else {
      return `${date.getDate()} ${date.toLocaleString("default", {
        month: "long",
      })} ${date.getFullYear()}`;
    }
  };

  const {
    isPending: isBlogPending,
    error: blogError,
    data: blogData,
  } = useQuery({
    queryKey: ["blogData"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_ENDPOINT}blog`
        );
        if (res.data.length > 0) {
          setLatestBlog(res.data[0]);
        }
        // console.log(res.data);
        return res.data;
      } catch (error) {
        console.error("Error fetching blog:", error);
        throw error;
      }
    },
  });

  return (
    <>
      {blogData ? (
        <article className={Styles.blogsContainer}>
          <main className={Styles.blogsMain}>
            <Link
              to={`/blogs/${latestBlog.slug}`}
              className={Styles.linkStyles}
            >
              <figure className={Styles.blogsHero}>
                <div className={Styles.centeredImage}>
                  <picture>
                    <source
                      srcSet={defaultPort}
                      media="(orientation: portrait)"
                    />
                    <source
                      srcSet={defaultLand}
                      media="(orientation: landscape)"
                    />
                    <img src={defaultLand} alt="Descriptive Alt Text" />
                  </picture>
                </div>
                <div className={Styles.blogsTitleContainer}>
                  <span className={Styles.selectedBlogSpiceName}>
                    {language === "en" ? "Spice" : "توابل"}
                  </span>
                  <h1 className={Styles.blogsTitle}>
                    {language === "en"
                      ? `${latestBlog.title_en}`
                      : `${latestBlog.title_ar}`}
                  </h1>
                  <div className={Styles.continueContainer}>
                    <p className={Styles.selectedBlogDate}>
                      {formatDate(createdAtDate, language)}
                    </p>
                    <span className={Styles.continueButton}>
                      {language === "en"
                        ? "Continue reading"
                        : "استمر بالقراءة"}
                    </span>
                  </div>
                </div>
              </figure>
            </Link>
            <h2
              className={`${Styles.latestPosts} ${
                language === "ar" ? Styles.latestPostsAR : ""
              }`}
            >
              {language === "en" ? "Latest Posts:" : "آخر المشاركات:"}
            </h2>
            <section className={Styles.blogsCardContainer}>
              {blogData &&
                blogData.map((element, index) => {
                  return <BlogCard key={index} element={element} />;
                })}
            </section>
            <button className={Styles.viewMoreButton}>
              {language === "en" ? "View More" : "عرض المزيد"}
            </button>
          </main>
        </article>
      ) : isBlogPending ? (
        <div className={Styles.containerLoading}>
          <div className={Styles.loadingIndicator}></div>
          <div className={Styles.loadingIndicator}></div>
          <div className={Styles.loadingIndicator}></div>
        </div>
      ) : blogError ? (
        <p>error...</p>
      ) : (
        <p>this should not show...</p>
      )}
    </>
  );
}
