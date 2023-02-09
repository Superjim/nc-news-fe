import React, { useContext } from "react";
import { ArticleContext } from "../contexts/ArticleContext";
import Profile from "./Profile";

function Header() {
  const { checkedTopics } = useContext(ArticleContext);
  let title = "";
  if (checkedTopics.length === 0) {
    title = `NC-News/`;
  } else if (checkedTopics.length === 1) {
    title = `NC-News/${checkedTopics[0]}`;
  } else if (checkedTopics.length > 1) {
    let topics =
      checkedTopics.slice(0, -1).join(", ") +
      " and " +
      checkedTopics[checkedTopics.length - 1];
    title = `NC-News/${topics}`;
  }

  return (
    <div className="header">
      <h1>{title}</h1>
      <h1>search</h1>
      <Profile />
    </div>
  );
}

export default Header;
