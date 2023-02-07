import React, { useState } from "react";
import { api } from "../utils/api";
import { AiOutlineUser } from "react-icons/ai";

function AddComment({ article_id, comments, setComments }) {
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await api.post(`/articles/${article_id}/comments`, {
        username: "grumpy19",
        body: comment,
      });
      setSubmitSuccess(true);
      setComments([response.data.comment, ...comments]);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      setComment("");
    }
  };

  return (
    <div className="comment-container">
      <span className="comment-user-container">
        <AiOutlineUser size={32} />
      </span>
      <form className="comment-body-container" onSubmit={handleSubmit}>
        <textarea
          className="add-comment-text"
          id="comment"
          placeholder="What do you think?"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          required
        />
        <button
          className="add-comment-button"
          type="submit"
          disabled={submitting}
        >
          Add Comment
        </button>
        {submitSuccess && <p>Comment posted!</p>}
      </form>
    </div>
  );
}

export default AddComment;
