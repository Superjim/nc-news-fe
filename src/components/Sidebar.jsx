import React from "react";
import NavBarTopic from "./NavBarTopic";
import SortBarArticles from "./SortBarArticles";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <NavBarTopic />
        <SortBarArticles />
      </div>
    </div>
  );
}

export default Sidebar;
