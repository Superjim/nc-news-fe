import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";

function ArticleVotes({ votes, article_id }) {
  const [upVoteColor, setUpVoteColor] = useState("");
  const [downVoteColor, setDownVoteColor] = useState("");
  const [localVotes, setLocalVotes] = useState(votes);
  const [currentVote, setCurrentVote] = useState(0);

  //idk why but its setting useState(votes) when passing from articlepage > article > articlevotes
  //so ive set it to update it when it renders
  useEffect(() => {
    setLocalVotes(votes);
  }, [votes]);

  const patchArticleVote = async (amount, article_id) => {
    try {
      const response = await api.patch(`/articles/${article_id}`, {
        inc_votes: amount,
      });
      return response.data.article.votes;
    } catch (error) {
      alert("Connection error");
      console.log(error);
      return false;
    }
  };

  const upVote = () => {
    //if user hasnt voted
    if (currentVote === 0) {
      patchArticleVote(1, article_id);
      setLocalVotes(localVotes + 1);
      setDownVoteColor("");
      setUpVoteColor("green");
      setCurrentVote(1);
      //if user has previously downvoted
    } else if (currentVote === -1) {
      patchArticleVote(2, article_id);
      setLocalVotes(localVotes + 2);
      setDownVoteColor("");
      setUpVoteColor("green");
      setCurrentVote(1);
    }
  };

  const downVote = () => {
    if (currentVote === 0) {
      patchArticleVote(-1, article_id);
      setLocalVotes(localVotes - 1);
      setDownVoteColor("red");
      setUpVoteColor("");
      setCurrentVote(-1);
    } else if (currentVote === 1) {
      patchArticleVote(-2, article_id);
      setLocalVotes(localVotes - 2);
      setDownVoteColor("red");
      setUpVoteColor("");
      setCurrentVote(-1);
    }
  };

  return (
    <span className="article-vote-container">
      <BsFillArrowUpCircleFill
        className="article-vote-button"
        style={{ color: upVoteColor }}
        size={32}
        onClick={upVote}
      />
      <p>{localVotes}</p>
      <BsFillArrowDownCircleFill
        className="article-vote-button"
        style={{ color: downVoteColor }}
        size={32}
        onClick={downVote}
      />
    </span>
  );
}

export default ArticleVotes;
