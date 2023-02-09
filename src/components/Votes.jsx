import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";

//something needs to be done about the vote styles being passed on to next pages rendering
function Votes({ votes, id, type }) {
  const [upVoteColor, setUpVoteColor] = useState("");
  const [downVoteColor, setDownVoteColor] = useState("");
  const [localVotes, setLocalVotes] = useState(votes);
  const [currentVote, setCurrentVote] = useState(0);

  //reset upvote and downvote elements to prevent styles passing onto newly rendered components (still arnt clickable)
  useEffect(() => {
    setUpVoteColor("");
    setDownVoteColor("");
    setLocalVotes(votes);
  }, [votes]);

  //type can be article or comment
  const patchVote = async (amount, id, type) => {
    try {
      const response = await api.patch(`/${type}s/${id}`, {
        inc_votes: amount,
      });
      return response.data.votes;
    } catch (error) {
      alert("Connection error");
      console.log(error);
      return false;
    }
  };

  const upVote = () => {
    if (currentVote === 0) {
      patchVote(1, id, type);
      setLocalVotes(localVotes + 1);
      setDownVoteColor("");
      setUpVoteColor("green");
      setCurrentVote(1);
    } else if (currentVote === -1) {
      patchVote(2, id, type);
      setLocalVotes(localVotes + 2);
      setDownVoteColor("");
      setUpVoteColor("green");
      setCurrentVote(1);
    }
  };

  const downVote = () => {
    if (currentVote === 0) {
      patchVote(-1, id, type);
      setLocalVotes(localVotes - 1);
      setDownVoteColor("red");
      setUpVoteColor("");
      setCurrentVote(-1);
    } else if (currentVote === 1) {
      patchVote(-2, id, type);
      setLocalVotes(localVotes - 2);
      setDownVoteColor("red");
      setUpVoteColor("");
      setCurrentVote(-1);
    }
  };

  return (
    <span className={`${type}-vote-container`}>
      <BsFillArrowUpCircleFill
        className="vote-button"
        style={{ color: upVoteColor }}
        size={32}
        onClick={upVote}
      />
      <p>{localVotes}</p>
      <BsFillArrowDownCircleFill
        className="vote-button"
        style={{ color: downVoteColor }}
        size={32}
        onClick={downVote}
      />
    </span>
  );
}

export default Votes;
