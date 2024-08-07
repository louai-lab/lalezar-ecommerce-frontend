import React, { useState, useRef, useContext } from "react";
import Styles from "./CommentSection.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { useLanguage } from "../../Utils/LanguageContext.js";
import axiosInstance from "../../Utils/AxiosInstance.js";
import { formatDistanceToNow } from "date-fns";

export default function CommentSection({ initialComments, blogId }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [comments, setComments] = useState(initialComments || []);
  const [comment, setComment] = useState("");
  const textAreaRef = useRef();

  const { language } = useLanguage();

  const focusOnTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  const commentSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post("/comment", {
        userId: user.id,
        blogId: blogId,
        description: comment,
      });

      if (response) {
        console.log("Comment added successfully:", response.data);
        // Add the new comment to the comments state
        setComments((prevComments) => [response.data, ...prevComments]);
        setComment("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      commentSubmitHandler();
    }
  };

  const parseDate = (date) => {
    const parsedDate = new Date(date);
    return isNaN(parsedDate) ? new Date() : parsedDate; // Fallback to current date if invalid
  };

  return (
    <div className={Styles.mainContainer}>
      <article className={Styles.commentsMainContainer}>
        <form className={Styles.addComment} onSubmit={commentSubmitHandler}>
          <textarea
            ref={textAreaRef}
            type="text"
            className={Styles.commentInput}
            onChange={(e) => setComment(e.target.value)}
            placeholder={language === "en" ? "Leave a comment" : "اترك تعليقا"}
            rows="10"
            onKeyDown={handleKeyDown}
            value={comment}
          />
          <div className={Styles.commentButtonContainer}>
            <button
              className={Styles.buttonReset}
              type="reset"
              onClick={() => setComment("")}
              disabled={!comment}
            >
              {language === "en" ? "Cancel" : "إلغاء"}
            </button>
            <button className={Styles.buttonSubmit} type="submit">
              {language === "en" ? "Post" : "انشر"}
            </button>
          </div>
        </form>
      </article>

      <div>
        {comments.length > 0 ? (
          <>
            <p
              style={{
                marginBottom: "20px",
                color: "black",
                fontWeight: "bold",
              }}
            >
              {comments.length} {language === "en" ? "comments" : "تعليقات"}
            </p>
            <div className={Styles.containerComments}>
              {comments.map((comment) => (
                <div key={comment._id} className={Styles.singleComment}>
                  <img
                    src={
                      comment?.userId?.image &&
                      !comment.userId.image.startsWith("http") &&
                      !comment.userId.image.startsWith("https")
                        ? `${process.env.REACT_APP_IMAGE_PATH}${comment.userId.image}`
                        : comment?.userId?.image
                    }
                    className={Styles.imagePerson}
                    alt="user"
                  />
                  <div className={Styles.timeDescription}>
                    <div className={Styles.nameDescription}>
                      <p className={Styles.name}>
                        {comment?.userId?.firstName} {comment?.userId?.lastName}
                      </p>
                      <p className={Styles.description}>
                        {comment?.description}
                      </p>
                    </div>
                    <p>
                      {formatDistanceToNow(parseDate(comment?.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  {user?.id === comment?.userId?._id && (
                    <div className={Styles.containerActions}>
                      <p>edit</p>
                      <p>delete</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className={Styles.noComments}>
            {language === "en" ? "No comments yet" : "لا تعليقات حتى الآن"}
          </p>
        )}
      </div>
    </div>
  );
}
