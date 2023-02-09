import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { ArticleContext } from "../contexts/ArticleContext";
import { Link } from "react-router-dom";
import { FcCollapse, FcExpand } from "react-icons/fc";
import { AiOutlineComment } from "react-icons/ai";
import { api } from "../utils/api";
import Votes from "./Votes";
import TimeSince from "../utils/TimeSince";

function Article({ props, showAll = false }) {
  const { user } = useContext(UserContext);
  const { articles, setArticles } = useContext(ArticleContext);

  const {
    article_id,
    article_img_url,
    author,
    body,
    comment_count,
    created_at,
    title,
    topic,
    votes,
  } = props;

  const [expanded, setExpanded] = useState(false);

  const handleArticleBodyExpand = () => {
    setExpanded(!expanded);
  };

  const handleDelete = async () => {
    try {
      // optimistically remove article from local article array
      setArticles(
        articles.filter((article) => article.article_id !== article_id)
      );
      // delete article from backend
      await api.delete(`/articles/${article_id}`);
    } catch (error) {
      // if error, add article back to local array??
      console.error(error);
      setArticles([props, ...articles]);
    }
  };

  return (
    <div className="article-container">
      <Votes votes={votes} id={article_id} type="article" />
      <div className="article-content-container">
        <span className="article-content-title-container">
          <h4>/{topic}</h4>
          <h5>Author: {author}</h5>
          <TimeSince date={created_at} />
          <h5># {article_id}</h5>
          {user.username === author && (
            <button className="delete-article-button" onClick={handleDelete}>
              Delete Article [X]
            </button>
          )}
        </span>
        <h3>{title}</h3>
        <img src={article_img_url} alt={title}></img>
        {!showAll ? (
          <>
            <div className="article-content-body-container-collapse">
              {expanded ? (
                <span
                  className="article-content-body-container-collapse"
                  onClick={handleArticleBodyExpand}
                >
                  <p>{body}</p>
                  <FcCollapse size={32} />
                </span>
              ) : (
                <span
                  className="article-content-body-container"
                  onClick={handleArticleBodyExpand}
                >
                  {body && <p>{body.split(" ").slice(0, 10).join(" ")}...</p>}
                  <FcExpand size={32} />
                </span>
              )}
            </div>
            <span className="article-content-comment-container">
              <Link to={`/${topic}/articles/${article_id}`}>
                <button className="article-content-comment-button">
                  <h5>{comment_count} comments</h5>
                  <AiOutlineComment size={32} />
                </button>
              </Link>
            </span>
          </>
        ) : (
          <span style={{ textAlign: "left" }}>
            <p>{body}</p>
          </span>
        )}
      </div>
    </div>
  );
}

export default Article;
