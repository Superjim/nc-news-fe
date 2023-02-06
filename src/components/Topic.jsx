import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import Article from "./Article";

function Topic({ checkedTopics }) {
  let { topic_slug } = useParams();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
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
    };

    fetchArticles();
  }, [checkedTopics, topic_slug]);

  return (
    <div>
      {topic_slug ? (
        <h2>{topic_slug}</h2>
      ) : (
        <h2>{checkedTopics.join(" & ")}</h2>
      )}

      <ul>
        {articles.map((article) => (
          <Article key={article.article_id} props={article} />
        ))}
      </ul>
    </div>
  );
}

export default Topic;
