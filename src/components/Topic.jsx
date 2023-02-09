import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArticleContext } from "../contexts/ArticleContext";
import { api } from "../utils/api";
import Article from "./Article";

function Topic() {
  let { topic_slug } = useParams();

  //this is where i store my array of articles, in the topic component, not the article context

  const {
    checkedTopics,
    sortBy,
    order,
    limit,
    page,
    setPage,
    setPageAmount,
    articles,
    setArticles,
  } = useContext(ArticleContext);

  const navigate = useNavigate();

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
            sort_by: sortBy,
            order: order,
            limit: limit,
            p: page,
          },
        });
        setArticles(response.data.articles);
        // if changing the page amount would push user out of range of the pages, put them on the last page
        const pageCalc = Math.ceil(response.data.total_count / limit);
        if (pageCalc < page) {
          setPage(pageCalc);
        }
        setPageAmount(pageCalc);
      } catch (error) {
        console.log(error);
        navigate("/page-not-found");
      }
    };

    fetchArticles();
  }, [
    checkedTopics,
    limit,
    navigate,
    order,
    page,
    setPage,
    setPageAmount,
    sortBy,
    topic_slug,
  ]);

  return (
    <div className="content">
      {articles.map((article, index) => (
        <Article props={article} key={index} />
      ))}
    </div>
  );
}

export default Topic;
