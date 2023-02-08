import React, { useState, useContext, useEffect } from "react";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { UserContext } from "../contexts/UserContext";

function Comment({ props }) {
  const { comment_id, votes, created_at, author, body, article_id } = props;
  const { userList } = useContext(UserContext);
  const [commentUser, setCommentUser] = useState({});

  //this feels kinda expensive so maybe look for another way in the future, but atm its contained to a single page so w/e
  useEffect(() => {
    const findUserObject = (username) => {
      const userObject = userList.find((user) => user.username === username);
      setCommentUser(userObject);
    };

    findUserObject(author);
  }, [author, userList]);

  return (
    <div className="comment-container">
      <span className="comment-user-container">
        <img
          className="avatar-url"
          src={commentUser.avatar_url}
          alt={author}
        ></img>
      </span>
      <div className="comment-body-container">
        <span className="comment-title-container">
          <h5>{author}</h5>
          <h5>{created_at}</h5>
          <h5>#{comment_id}</h5>
          <AiFillCloseCircle size={32} />
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
