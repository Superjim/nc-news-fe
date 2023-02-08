import React, { useState, useContext, useEffect } from "react";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";
import { UserContext } from "../contexts/UserContext";
import { api } from "../utils/api";

function Comment({ props, comments, setComments }) {
  const { comment_id, votes, created_at, author, body, article_id } = props;
  const { user, userList } = useContext(UserContext);
  const [commentUser, setCommentUser] = useState({});

  const handleDelete = async () => {
    try {
      // optimistically remove comment from local comment array
      setComments(
        comments.filter((comment) => comment.comment_id !== comment_id)
      );
      // delete comment from backend
      await api.delete(`/comments/${comment_id}`);
    } catch (error) {
      // if error, add comment back to local array??
      console.error(error);
    }
  };

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
        </span>
        <p>{body}</p>
        {user.username === author ? (
          <button
            className="add-comment-button"
            // disabled={deleting}
            onClick={handleDelete}
          >
            Delete Comment
          </button>
        ) : (
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
        )}
      </div>
    </div>
  );
}

export default Comment;
