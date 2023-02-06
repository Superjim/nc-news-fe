import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import NavBarTopic from "./components/NavBarTopic";
import Topic from "./components/Topic";
import "./App.css";
import ArticlePage from "./components/ArticlePage";
import Sidebar from "./components/Sidebar";

function App() {
  const [checkedTopics, setCheckedTopics] = useState([]);

  return (
    <div className="App">
      <Header />
      <Sidebar
        checkedTopics={checkedTopics}
        setCheckedTopics={setCheckedTopics}
      />
      <Routes>
        <Route path="/" element={<Topic checkedTopics={checkedTopics} />} />
        <Route
          path="/:topic_slug"
          element={<Topic checkedTopics={checkedTopics} />}
        />
        <Route
          path="/:topic_slug/articles/:article_id"
          element={<ArticlePage />}
        />
      </Routes>
    </div>
  );
}

export default App;
