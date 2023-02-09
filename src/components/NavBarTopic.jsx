import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArticleContext } from "../contexts/ArticleContext";

function NavBarTopic() {
  const {
    checkedTopics,
    setCheckedTopics,
    topics,
    fetchTopics,
    navbarAll,
    setNavbarAll,
  } = useContext(ArticleContext);

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

  const getDescription = (slug) => {
    const topic = topics.find((topic) => topic.slug === slug);
    return topic ? topic.description : null;
  };

  return (
    <>
      {navbarAll ? (
        <div className="navbar-topic-sort">
          <h2>Sort Topics</h2>
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
                    setNavbarAll(true);
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
                    onClick={() => {
                      topicLinkHandler(topic.slug);
                      setNavbarAll(false);
                    }}
                    to={topic.slug}
                  >
                    {topic.slug}
                  </Link>
                </label>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="navbar-topic-sort">
          <h2>Quick Links</h2>
          <Link
            onClick={() => {
              setCheckedTopics([]);
              setNavbarAll(true);
            }}
            to="/"
          >
            <h2>Back to All</h2>
          </Link>
          <ul>
            {topics.map((topic, index) => (
              <li key={index}>
                <Link
                  onClick={() => {
                    topicLinkHandler(topic.slug);
                    setNavbarAll(false);
                  }}
                  to={topic.slug}
                >
                  {topic.slug}
                </Link>
              </li>
            ))}
          </ul>
          <h2>{checkedTopics}</h2>
          <h4>{getDescription(checkedTopics[0])}</h4>
        </div>
      )}
    </>
  );
}

export default NavBarTopic;
