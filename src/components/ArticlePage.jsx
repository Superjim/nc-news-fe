import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { api } from "../utils/api";
import AddComment from "./AddComment";
import Article from "./Article";
import Comment from "./Comment";
import NotFound from "./NotFound";

function ArticlePage() {
  //dont move this to context, this should be local to the page
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

  return (
    <>
      {article.article_id ? (
        <div className="content">
          <Article props={article} showAll={true} />
          <div ref={commentsRef} className="comments-container">
            <AddComment
              article_id={article_id}
              comments={comments}
              setComments={setComments}
            />
            {comments.map((article, index) => (
              <Comment
                props={article}
                key={index}
                comments={comments}
                setComments={setComments}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="content">
          <NotFound title="Article" />
        </div>
      )}
    </>
  );
}

export default ArticlePage;
