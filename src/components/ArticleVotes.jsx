import React, { useState, useEffect } from "react";
import { patchArticleVote } from "../utils/api";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";

function ArticleVotes({ votes, article_id }) {
  const [upVoteColor, setUpVoteColor] = useState("");
  const [downVoteColor, setDownVoteColor] = useState("");
  const [localVotes, setLocalVotes] = useState(votes);

  //idk why but its setting useState(votes) when passing from articlepage > article > articlevotes
  //so ive set it to update it when it renders
  useEffect(() => {
    setLocalVotes(votes);
  }, [votes]);

  return (
    <span className="article-vote-container">
      <BsFillArrowUpCircleFill
        className="article-vote-button"
        style={{ color: upVoteColor }}
        size={32}
        onClick={() => {
          patchArticleVote(1, article_id).then((votes) => {
            setLocalVotes(votes);
            setDownVoteColor("");
            setUpVoteColor("green");
          });
        }}
      />
      <p>{localVotes}</p>
      <BsFillArrowDownCircleFill
        className="article-vote-button"
        style={{ color: downVoteColor }}
        size={32}
        onClick={() => {
          patchArticleVote(-1, article_id).then((votes) => {
            setLocalVotes(votes);
            setDownVoteColor("red");
            setUpVoteColor("");
          });
        }}
      />
    </span>
  );
}

export default ArticleVotes;
