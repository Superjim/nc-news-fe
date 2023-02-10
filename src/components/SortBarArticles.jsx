import React, { useContext } from "react";
import { ArticleContext } from "../contexts/ArticleContext";

function SortBarArticles() {
  const {
    sortBy,
    setSortBy,
    order,
    setOrder,
    limit,
    setLimit,
    page,
    setPage,
    pageAmount,
  } = useContext(ArticleContext);

  //scroll to top of page on page button click
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="sortbar-container">
      <div className="sortbar-sort-container">
        <h4>Sort By:</h4>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="article_id">Article ID</option>
          <option value="title">Title</option>
          <option value="topic">Topic</option>
          <option value="author">Author</option>
          <option value="body">Body</option>
          <option value="created_at">Created At</option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Votes</option>
        </select>
      </div>
      <div className="sortbar-order-container">
        <h4>Order:</h4>
        <select value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="sortbar-limit-container">
        <h4>Limit:</h4>
        <select value={limit} onChange={(e) => setLimit(e.target.value)}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div className="sortbar-page-container">
        <h4>Page:</h4>
        <span className="sortbar-button-container">
          {[...Array(pageAmount).keys()].map((p) => (
            <button
              key={p + 1}
              className={p + 1 === page ? "sortbar-page-active" : ""}
              onClick={() => {
                handleClick();
                setPage(p + 1);
              }}
            >
              {p + 1}
            </button>
          ))}
        </span>
      </div>
      <hr></hr>
    </div>
  );
}

export default SortBarArticles;
