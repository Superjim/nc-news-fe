import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";
import Comment from "./Comment";

function ArticlePage() {
  const commentsRef = useRef();

  let { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);

  const {
    article_img_url,
    author,
    body,
    comment_count,
    created_at,
    title,
    topic,
    votes,
  } = article;

  useEffect(() => {
    const fetchArticle = async () => {
      const response = await api.get(`/articles/${article_id}`);
      setArticle(response.data.article);
    };

    const fetchComments = async () => {
      const response = await api.get(`/articles/${article_id}/comments`);
      setComments(response.data.comments);
    };

    fetchComments();
    fetchArticle();
  }, [article_id]);

  useEffect(() => {
    setTimeout(() => {
      commentsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 500);
  }, [comments]);

  return (
    <div className="content">
      <div className="article-container">
        <span className="article-vote-container">
          <BsFillArrowUpCircleFill
            size={32}
            onClick={() => console.log("upvote")}
          />
          <p>{votes}</p>
          <BsFillArrowDownCircleFill
            size={32}
            onClick={() => console.log("downvote")}
          />
        </span>
        <div className="article-content-container">
          <span className="article-content-title-container">
            <h4>/{topic}</h4>
            <h5>Author: {author}</h5>
            <h5>Created at: {created_at}</h5>
            <h5># {article_id}</h5>
          </span>
          <h3>{title}</h3>
          <img src={article_img_url} alt={title}></img>
          <div className="article-content-body-container">
            <p>{body}</p>
          </div>
          <span className="article-page-comment-container"></span>
        </div>
      </div>
      <div ref={commentsRef} className="comments-container">
        {comments.map((article, index) => (
          <Comment props={article} key={index} />
        ))}
      </div>
    </div>
  );
}

export default ArticlePage;
