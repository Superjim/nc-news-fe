import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { api } from "../utils/api";
import AddComment from "./AddComment";
import Article from "./Article";
import Comment from "./Comment";

function ArticlePage() {
  //dont move this to context, this should be local to the page
  const commentsRef = useRef();
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);

  // if (!article.article_id) maybe return 404 article not found?

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
          <h1>Error 404: Article not found</h1>
        </div>
      )}
    </>
  );
}

export default ArticlePage;
