import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CheckboxContext } from "../contexts/CheckboxContext";
import api from "../utils/api";
import Article from "./Article";

function Topic() {
  let { topic_slug } = useParams();
  const [articles, setArticles] = useState([]);
  const { checkedTopics } = useContext(CheckboxContext);

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
      {articles.map((article, index) => (
        <Article props={article} key={index} />
      ))}
    </div>
  );
}

export default Topic;
