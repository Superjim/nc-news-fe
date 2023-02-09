import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { api } from "../utils/api";

function AddComment({ comments, setComments, article_id }) {
  const [comment, setComment] = useState("");
  const { user } = useContext(UserContext);

  //add comment
  const handleAddComment = async (commentBody) => {
    // create new comment with temp values
    const newComment = {
      comment_id: -202,
      votes: 0,
      created_at: new Date().toISOString(),
      author: user.username,
      body: commentBody,
      article_id: article_id,
    };
    //optimistically add new comment to state immediately
    setComments([newComment, ...comments]);

    //post the comment to the backend
    try {
      const response = await api.post(`/articles/${article_id}/comments`, {
        username: user.username,
        body: commentBody,
      });
      // update the temp values of comment if response recieved
      const updatedComment = {
        ...newComment,
        comment_id: response.data.comment.comment_id,
        created_at: response.data.comment.created_at,
      };
      setComments([
        updatedComment,
        ...comments.filter((comment) => comment.comment_id !== -202),
      ]);
    } catch (error) {
      // if it fails to add, change body of comment to notify user
      console.log(error);
      const updatedComment = {
        ...newComment,
        comment_id: -503,
        body: "Network Error sending message to the database",
      };
      setComments([
        updatedComment,
        ...comments.filter((comment) => comment.comment_id !== -202),
      ]);
    }
  };

  return (
    <div className="comment-container">
      <span className="comment-user-container">
        <img
          className="avatar-url"
          src={user.avatar_url}
          alt={user.username}
        ></img>
      </span>
      <form
        className="comment-body-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddComment(comment);
          setComment("");
        }}
      >
        <textarea
          className="add-comment-text"
          id="comment"
          placeholder="What do you think?"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          required
        />
        <button className="add-comment-button" type="submit">
          Add Comment
        </button>
      </form>
    </div>
  );
}

export default AddComment;
