import Styles from "./BlogDetails.module.css";
import defaultLand from "../../Assets/blogHero.jpeg";
import defaultPort from "../../Assets/blogsHeroPort.jpg";
import { useEffect, useRef, useState } from "react";
import YoutubeVideo from "../../Components/YouTube/youtube.js";
import BlogMD from "../../Components/BlogMD/BlogMD";
import CommentSection from "../../Components/CommentSection/CommentSection";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import dateConverter from "../../Utils/DateConverter";
import parse from "html-react-parser";
import { useLanguage } from "../../Utils/LanguageContext.js";

export default function BlogDetails() {
  const [blogId, setBlogId] = useState("");
  const { slug } = useParams();

  const { language } = useLanguage();

  const { isPending, error, data } = useQuery({
    queryKey: ["blogdetails"],
    queryFn: async () => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BACKEND_ENDPOINT}blog/one`,
          { slug }
        );
        setBlogId(res.data._id);
        return res.data;
      } catch (error) {
        console.error("Error fetching blog:", error);
        throw error; // Re-throw the error to let React Query handle it
      }
    },
  });

  console.log(data);
  return (
    <>
      {data ? (
        <main className={Styles.blogOneMain}>
          <section
            className={`${Styles.blogOneTitleContainer} ${
              language === "ar" ? Styles.blogOneTitleContainerAR : ""
            }`}
          >
            <p
              className={`${Styles.selectedBlogOneSpiceName} ${
                language === "ar" ? Styles.selectedBlogOneSpiceNameAR : ""
              }`}
            >
              Lalezar
            </p>
            <h1 className={Styles.blogOneTitle}>
              {language === "en" ? `${data.title_en}` : `${data.title_ar}`}
            </h1>
            <p className={Styles.selectedBlogOneDate}>
              {data ? dateConverter(data.updatedAt, language) : "loading..."}
            </p>
          </section>
          <picture className={Styles.blogOnePicture}>
            <source
              srcSet={
                data && typeof data.images === Array ? data.images[0] : ""
              }
              media="(orientation: landscape)"
            />
            <img
              src={`${process.env.REACT_APP_IMAGE_PATH}${data.images[0]}`}
              alt="stock spices image"
            />
          </picture>
          <article className={Styles.articleValue}>
            {typeof data.description_en === "string"
              ? parse(data.description_en)
              : ""}
          </article>
          {data && data.video ? (
            <YoutubeVideo videoUrl={data ? data.video : null} />
          ) : (
            ""
          )}

          <CommentSection comments={data.comments} blogId={blogId} />
        </main>
      ) : isPending ? (
        <p>loading...</p>
      ) : error ? (
        <>
          {console.log("error!!! : ", error)}
          <p>error!</p>
        </>
      ) : (
        <p>this is weird...</p>
      )}
    </>
  );
}
