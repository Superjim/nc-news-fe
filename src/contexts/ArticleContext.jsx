import React, { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";

const ArticleContext = createContext();

const ArticleProvider = (props) => {
  //article search querys
  const [checkedTopics, setCheckedTopics] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [pageAmount, setPageAmount] = useState(1);

  //array of articles to render
  const [articles, setArticles] = useState([]);

  //array of topics
  const [topics, setTopics] = useState([]);

  //sidebar states
  const [navbarAll, setNavbarAll] = useState(true);

  const navigate = useNavigate();

  const fetchTopics = async () => {
    try {
      const response = await api.get(`/topics`);
      setTopics(response.data.topics);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchArticles = async (topic_slug) => {
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
    } catch (err) {
      console.log(err);
      // navigate("/page-not-found");
    }
  };

  return (
    <ArticleContext.Provider
      value={{
        checkedTopics,
        setCheckedTopics,
        sortBy,
        setSortBy,
        order,
        setOrder,
        limit,
        setLimit,
        page,
        setPage,
        pageAmount,
        setPageAmount,
        articles,
        setArticles,
        fetchArticles,
        topics,
        fetchTopics,
        navbarAll,
        setNavbarAll,
      }}
    >
      {props.children}
    </ArticleContext.Provider>
  );
};

export { ArticleContext, ArticleProvider };
