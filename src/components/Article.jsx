import React, { useState } from "react";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";
import { AiOutlineComment } from "react-icons/ai";

function Article({ props }) {
  const [expanded, setExpanded] = useState(false);

  const handleArticleClick = () => {
    setExpanded(!expanded);
  };

  console.log(props);

  return (
    <div className="article-container" onClick={handleArticleClick}>
      <span className="article-votes-container">
        <BsFillArrowUpCircleFill
          size={32}
          onClick={() => console.log("upvote")}
        />
        <p>{props.votes}</p>
        <BsFillArrowDownCircleFill
          size={32}
          onClick={() => console.log("downvote")}
        />
      </span>
      <span className="article-content-container">
        <span className="article-topic-title-created-container">
          <h4>/{props.topic}</h4>
          <p>Created at: {props.created_at}</p>
        </span>
        <h3>{props.title}</h3>
        <img src={props.article_img_url} alt={props.title}></img>
        <span className="article-author-comments-container">
          <h5>Author: {props.author}</h5>
          <h5>
            {props.comment_count}
            <AiOutlineComment size={32} />
          </h5>
        </span>
        <span className="article-body-container">
          {expanded && <p>{props.body}</p>}
        </span>
      </span>
    </div>
  );
}

export default Article;
