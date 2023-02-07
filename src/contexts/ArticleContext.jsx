import React, { useState, createContext } from "react";

const ArticleContext = createContext();

const ArticleProvider = (props) => {
  const [checkedTopics, setCheckedTopics] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [pageAmount, setPageAmount] = useState(1);

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
      }}
    >
      {props.children}
    </ArticleContext.Provider>
  );
};

export { ArticleContext, ArticleProvider };
