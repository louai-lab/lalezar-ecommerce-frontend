import React, { useState, useRef, useEffect, useContext } from "react";
import Styles from "./CommentSection.module.css";
import Comment from "../Comment/Comment";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { useLanguage } from "../../Utils/LanguageContext.js";

export default function CommentSection({ comments, blogId }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [commentParentId, setCommentParentId] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [replyState, setReplyState] = useState("");

  // console.log(comment);
  // console.log(blogId)

  const textAreaRef = useRef();

  const { language } = useLanguage();

  const { isPending, error, data } = useQuery({
    queryKey: ["commentData"],
    queryFn: async () => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BACKEND_ENDPOINT}comment/getMany`,
          { array: comments }
        );

        setAllComments(res.data);
        return res.data;
      } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
      }
    },
  });

  const focusOnTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  const commentSubmitHandler = async (event) => {
    if (event) event.preventDefault();

    textAreaRef.current.blur();
    if (comment && !replyState) {
      const addedComment = {
        name: `${user?.firstName} ${user?.lastName}` || "username",
        description: comment,
        type: "comment",
        replies: [],
        id: blogId,
        createdAt: Date.now(),
      };
      try {
        setAllComments((prev) => [...prev, addedComment]);
      } catch (error) {
        console.log("Error: ", error.message);
      }
      setComment("");
    } else {
      /////////////////////////////////////////////////////////////////////
      const addedReply = {
        name: `${user.firstName} ${user.lastName}` || "username",
        description: comment,
        type: "reply",
        replies: [],
        parentName: commentParentId,
        createdAt: Date.now(),
      };
      console.log("added reply: ", addedReply);
      /////////////////////////////////////////////////////////////////
      setAllComments((prevData) => {
        return prevData.map((item) => {
          if (item._id === commentParentId) {
            // Update the reply array of the specific element
            return { ...item, replies: [...item.replies, addedReply] };
          }
          return item;
        });
      });
      /////////////////////////////////////////////////////////////////
      try {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_ENDPOINT}comment/reply`,
          {
            id: commentParentId,
            description: comment,
            name: `${user.firstName} ${user.lastName}`,
          }
        );
      } catch (error) {
        console.log("Error: ", error.message);
      }
      setComment("");
      setCommentParentId();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      commentSubmitHandler();
    }
  };

  return (
    <>
      <p
        className={`${Styles.commentsHeader} ${
          language === "ar" ? Styles.commentsHeaderAR : ""
        }`}
      >
        {language === "en" ? "Comments" : "التعليقات"}
      </p>
      {data ? (
        <>
          <span
            onClick={() => setReplyState("")}
            className={Styles.replyCancel}
          >
            {replyState}
          </span>
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
                  onClick={(e) => setComment("")}
                  disabled={comment ? false : true}
                >
                  {language === "en" ? "Cancel" : "إلغاء"}
                </button>
                <button className={Styles.buttonSubmit} type="submit">
                  {language === "en" ? "Post" : "انشر"}
                </button>
              </div>
            </form>
          </article>

          <div className={Styles.allComments}>
            {allComments && allComments.length > 0 ? (
              allComments.map((element, index) => {
                // console.log("element: ", element)
                return (
                  <Comment
                    key={index}
                    element={element}
                    parentName={element.name}
                    focusOnTextArea={focusOnTextArea}
                    setReplyState={setReplyState}
                    setCommentParentId={setCommentParentId}
                  />
                );
              })
            ) : (
              <p className={Styles.noComments}>
                {language === "en" ? "No comments yet" : "لا تعليقات حتى الآن"}
              </p>
            )}
            d-
          </div>
        </>
      ) : isPending ? (
        <p>loading...</p>
      ) : error ? (
        <p>error!</p>
      ) : (
        <p>this should never appear</p>
      )}
    </>
  );
}
