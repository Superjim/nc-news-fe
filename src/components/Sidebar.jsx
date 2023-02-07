import React from "react";
import NavBarTopic from "./NavBarTopic";
import SortBarArticles from "./SortBarArticles";

function Sidebar() {
  return (
    <div className="sidebar">
      <NavBarTopic />
      <SortBarArticles />
    </div>
  );
}

export default Sidebar;
