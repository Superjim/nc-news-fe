import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

function NavBarTopic({ checkedTopics, setCheckedTopics }) {
  const [topics, setTopics] = useState([]);

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

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await api.get(`/topics`);
        setTopics(response.data.topics);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTopics();
  }, []);

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
