import React from "react";
import NavBarTopic from "./NavBarTopic";
import Topic from "./Topic";

function Home({ checkedTopics, setCheckedTopics }) {
  return (
    <div>
      <NavBarTopic
        checkedTopics={checkedTopics}
        setCheckedTopics={setCheckedTopics}
      />
      <Topic checkedTopics={checkedTopics} />
    </div>
  );
}

export default Home;
