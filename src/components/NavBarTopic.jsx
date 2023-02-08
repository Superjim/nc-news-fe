import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArticleContext } from "../contexts/ArticleContext";

function NavBarTopic() {
  const { checkedTopics, setCheckedTopics, topics, fetchTopics } =
    useContext(ArticleContext);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  const topicHandler = (topic) => {
    if (checkedTopics.includes(topic)) {
      setCheckedTopics(
        checkedTopics.filter((checkedTopic) => checkedTopic !== topic)
      );
    } else {
      setCheckedTopics([...checkedTopics, topic]);
    }
  };

  const topicLinkHandler = (topic) => {
    setCheckedTopics([topic]);
  };

  return (
    <>
      <h2>Topic Sort</h2>
      <ul>
        <li>
          <input
            type="checkbox"
            id="All"
            checked={checkedTopics.length === 0}
            onChange={() => setCheckedTopics([])}
          />
          <label htmlFor="All">
            <Link
              onClick={() => {
                setCheckedTopics([]);
              }}
              to="/"
            >
              All
            </Link>
          </label>
        </li>
        {topics.map((topic, index) => (
          <li key={index}>
            <input
              type="checkbox"
              id={topic.slug}
              value={topic.slug}
              checked={checkedTopics.includes(topic.slug)}
              onChange={() => topicHandler(topic.slug)}
            />
            <label htmlFor={topic.slug}>
              <Link
                onClick={() => topicLinkHandler(topic.slug)}
                to={topic.slug}
              >
                {topic.slug}
              </Link>
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}

export default NavBarTopic;
