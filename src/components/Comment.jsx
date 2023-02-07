import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";

function Comment({ props }) {
  const { comment_id, votes, created_at, author, body, article_id } = props;

  return (
    <div className="comment-container">
      <span className="comment-user-container">
        <AiOutlineUser size={32} />
      </span>
      <div className="comment-body-container">
        <span className="comment-title-container">
          <h5>{author}</h5>
          <h5>{created_at}</h5>
          <h5>#{comment_id}</h5>
        </span>
        <p>{body}</p>
        <span className="comment-vote-container">
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
      </div>
    </div>
  );
}

export default Comment;
