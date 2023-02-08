import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ArticleContext } from "../contexts/ArticleContext";

function NotFound() {
  const { setCheckedTopics } = useContext(ArticleContext);

  return (
    <div className="content">
      <h1>Error 404: Page not found!</h1>
      <Link
        onClick={() => {
          setCheckedTopics([]);
        }}
        to="/"
      >
        Go back home
      </Link>
    </div>
  );
}

export default NotFound;
