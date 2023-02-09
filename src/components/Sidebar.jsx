import React from "react";
import { Link } from "react-router-dom";
import NavBarTopic from "./NavBarTopic";
import SortBarArticles from "./SortBarArticles";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <NavBarTopic />
        <SortBarArticles />
        <Link to="/add-article">
          <h2>Add new article</h2>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
