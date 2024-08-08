import React, { useState, useRef, useContext, useEffect } from "react";
import Styles from "./CommentSection.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { useLanguage } from "../../Utils/LanguageContext.js";
import axiosInstance from "../../Utils/AxiosInstance.js";
import { formatDistanceToNow } from "date-fns";
import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import BasicModal from "../Modal/BasicModal.js";

export default function CommentSection({ initialComments, blogId }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [comments, setComments] = useState(initialComments || []);
  const [comment, setComment] = useState("");
  const textAreaRef = useRef();

  const [isDeleting, setIsDeleting] = useState(false);

  // console.log(user);

  const { language } = useLanguage();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    setComments(initialComments || []);
  }, [initialComments, blogId]);

  // console.log(initialComments);
  // console.log(blogId);

  const commentSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post("/comment", {
        userId: user.id,
        blogId: blogId,
        description: comment,
      });

      if (response) {
        // console.log("Comment added successfully:", response.data);
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
    return isNaN(parsedDate) ? new Date() : parsedDate;
  };

  const handleDelete = async (commentId) => {
    // console.log("hello");
    // console.log(blogId);
    // console.log(commentId);

    try {
      const response = await axiosInstance.delete(`/comment`, {
        data: { blogId, commentId },
      });

      if (response) {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId)
        );
        console.log("Comment deleted successfully");
      } else {
        console.error("Failed to delete comment:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting comment:", error.message);
    }
  };

  return (
    <>
      {/* <BasicModal /> */}
      <div className={Styles.mainContainer}>
        <article className={Styles.commentsMainContainer}>
          <form className={Styles.addComment} onSubmit={commentSubmitHandler}>
            <textarea
              ref={textAreaRef}
              type="text"
              className={Styles.commentInput}
              onChange={(e) => setComment(e.target.value)}
              placeholder={
                language === "en" ? "Leave a comment" : "اترك تعليقا"
              }
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
                        <div className={Styles.containerDelete}>
                          <p className={Styles.name}>
                            {comment?.userId?.firstName}{" "}
                            {comment?.userId?.lastName}
                          </p>
                          {user?.id === comment?.userId?._id ||
                          user?.role === "Admin" ? (
                            <BasicModal
                              handleDeleteComment={() =>
                                handleDelete(comment._id)
                              }
                            />
                          ) : (
                            ""
                          )}
                        </div>
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
    </>
  );
}
