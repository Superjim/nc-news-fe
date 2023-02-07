import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { api } from "../utils/api";
import Article from "./Article";
import Comment from "./Comment";

function ArticlePage() {
  const commentsRef = useRef();
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);

  // fetch article and comments
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

  //smooth scroll to comments
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
      <Article props={article} showAll={true} />
      <div ref={commentsRef} className="comments-container">
        {comments.map((article, index) => (
          <Comment props={article} key={index} />
        ))}
      </div>
    </div>
  );
}

export default ArticlePage;
