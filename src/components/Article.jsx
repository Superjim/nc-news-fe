import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FcCollapse, FcExpand } from "react-icons/fc";
import { AiOutlineComment } from "react-icons/ai";
import ArticleVotes from "./ArticleVotes";

function Article({ props, showAll = false }) {
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

  return (
    <div className="article-container">
      <ArticleVotes votes={votes} article_id={article_id} />
      <div className="article-content-container">
        <span className="article-content-title-container">
          <h4>/{topic}</h4>
          <h5>Author: {author}</h5>
          <h5>Created at: {created_at}</h5>
          <h5># {article_id}</h5>
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
