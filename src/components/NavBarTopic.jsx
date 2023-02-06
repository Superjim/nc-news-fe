import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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

  useEffect(() => {
    const fetchTopics = async () => {
      const response = await api.get(`/topics`);
      setTopics(response.data.topics);
    };

    fetchTopics();
  }, []);

  return (
    <div>
      <h2>Topic Sort</h2>
      <ul>
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
              <Link to={topic.slug}>{topic.slug}</Link>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NavBarTopic;
