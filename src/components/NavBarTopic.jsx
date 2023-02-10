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

  //get a nice fresh list of topics
  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  //updates the state of checked topics (for multiple topic sorting)
  const topicHandler = (topic) => {
    if (checkedTopics.includes(topic)) {
      setCheckedTopics(
        checkedTopics.filter((checkedTopic) => checkedTopic !== topic)
      );
    } else {
      setCheckedTopics([...checkedTopics, topic]);
    }
  };

  //when user clicks a topic link, set topic to the single value (for all articles of one topic)
  const topicLinkHandler = (topic) => {
    setCheckedTopics([topic]);
  };

  //get the description of the single selected topic
  const getDescription = (slug) => {
    const topic = topics.find((topic) => topic.slug === slug);
    return topic ? topic.description : null;
  };

  return (
    <>
      {navbarAll ? (
        //checkboxes for each topic
        <div className="navbar-topic-sort">
          <h3>Topics</h3>
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
            <hr></hr>
          </ul>
        </div>
      ) : (
        //or just link to other topics (no longer add checkboxes)
        <div className="navbar-topic-sort">
          <h2>{checkedTopics}</h2>
          <h4>{getDescription(checkedTopics[0])}</h4>
          <hr></hr>
          <h3>Topics</h3>
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

          <h3> </h3>
          <hr></hr>
        </div>
      )}
    </>
  );
}

export default NavBarTopic;
