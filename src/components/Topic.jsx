import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import Article from "./Article";
import NavBarTopic from "./NavBarTopic";

function Topic({ checkedTopics }) {
  let { topic_slug } = useParams();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let topics;
        if (topic_slug) {
          topics = topic_slug;
        } else {
          topics = checkedTopics.join(",");
        }

        const response = await api.get(`/articles`, {
          params: {
            topic: topics,
          },
        });
        setArticles(response.data.articles);
      } catch (err) {
        console.log(err);
      }
    };

    fetchArticles();
  }, [checkedTopics, topic_slug]);

  return (
    <div className="content">
      {topic_slug ? (
        <h2>{topic_slug}</h2>
      ) : (
        <h2>{checkedTopics.join(" & ")}</h2>
      )}
      {articles.map((article, index) => (
        <Article props={article} key={index} />
      ))}
    </div>
  );
}

export default Topic;
