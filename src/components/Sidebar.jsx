import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import NavBarTopic from "./NavBarTopic";
import SortBarArticles from "./SortBarArticles";
import { ArticleContext } from "../contexts/ArticleContext";

function Sidebar() {
  const { setCheckedTopics, setNavbarAll } = useContext(ArticleContext);
  const [visible, setVisible] = useState(true);

  return (
    <div className="sidebar">
      <button
        onClick={() => setVisible(!visible)}
        className="generic-button sidebar-button"
      >
        Toggle Sidebar
      </button>
      {visible && (
        <div className="sidebar-container">
          <NavBarTopic />
          <SortBarArticles />
          <span className="add-container">
            <Link
              onClick={() => {
                setCheckedTopics([]);
                setNavbarAll(true);
              }}
              to="/"
            >
              <button className="generic-button">Back to All</button>
            </Link>
            <br></br>
            <Link to="/add-article">
              <button className="generic-button">Add new article</button>
            </Link>
            <br></br>
            <Link to="/add-topic">
              <button className="generic-button">Add new topic</button>
            </Link>
          </span>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
