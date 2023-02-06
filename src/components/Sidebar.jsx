import React from "react";
import NavBarTopic from "./NavBarTopic";

function Sidebar({ checkedTopics, setCheckedTopics }) {
  return (
    <div className="sidebar">
      <NavBarTopic
        checkedTopics={checkedTopics}
        setCheckedTopics={setCheckedTopics}
      />
    </div>
  );
}

export default Sidebar;
