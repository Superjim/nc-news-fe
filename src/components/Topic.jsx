import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ArticleContext } from "../contexts/ArticleContext";
import Article from "./Article";

function Topic() {
  let { topic_slug } = useParams();

  const {
    articles,
    fetchArticles,
    checkedTopics,
    sortBy,
    order,
    limit,
    page,
    setNavbarAll,
  } = useContext(ArticleContext);

  //this useEffect gets the articles, so only values that change the api query should be in here
  //if you add the recommended stuff it'll get itself stuck in a topic_slug loop or 10 and isnt very performant
  //basically DONT ADD TOPIC_SLUG BECAUSE IT WILL RUN EVERY RENDER
  useEffect(() => {
    //this SHOULD set the sidebar to all if theres no params, ie if the user presses back to return from a single topic to the all page
    if (topic_slug === undefined) {
      setNavbarAll(true);
    } else {
      setNavbarAll(false);
    }
    fetchArticles(topic_slug);
  }, [checkedTopics, sortBy, order, limit, page, articles]);

  return (
    <div className="content">
      {articles.map((article, index) => (
        <Article props={article} key={index} />
      ))}
    </div>
  );
}

export default Topic;
