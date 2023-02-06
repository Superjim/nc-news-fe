import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Topic() {
  let { topic_slug } = useParams();
  if (topic_slug === undefined) topic_slug = "";
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await axios.get(
        `https://nc-news-6g30.onrender.com/api/articles?topic=${topic_slug}`
      );
      setArticles(response.data.articles);
    };

    fetchArticles();
  }, [topic_slug]);
  return (
    <div>
      {topic_slug ? <h2>Topic {topic_slug}</h2> : <h2>All Topics</h2>}
      <ul>
        {articles.map((article) => (
          <li key={article.article_id}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Topic;
