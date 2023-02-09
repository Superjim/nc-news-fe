import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ArticleContext } from "../contexts/ArticleContext";

function NotFound({ title = "Page" }) {
  const { setCheckedTopics, setNavbarAll } = useContext(ArticleContext);

  return (
    <div className="content">
      <h1>Error 404: {title} not found!</h1>
      <Link
        onClick={() => {
          //reset the fetch articles state and go home
          setCheckedTopics([]);
          setNavbarAll(true);
        }}
        to="/"
      >
        <h2>Back to All</h2>
      </Link>
    </div>
  );
}

export default NotFound;
