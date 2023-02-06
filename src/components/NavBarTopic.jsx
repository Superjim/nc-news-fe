import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function NavBarTopic() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const response = await axios.get(
        "https://nc-news-6g30.onrender.com/api/topics"
      );
      setTopics(response.data.topics);
    };

    fetchTopics();
  }, []);
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`/`}>All</Link>
        </li>
        {topics.map((topic, index) => (
          <li key={index}>
            <Link to={`/${topic.slug}`}>{topic.slug}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NavBarTopic;
