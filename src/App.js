import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Topic from "./components/Topic";
import "./App.css";

function App() {
  const [checkedTopics, setCheckedTopics] = useState([]);

  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              checkedTopics={checkedTopics}
              setCheckedTopics={setCheckedTopics}
            />
          }
        />
        <Route
          path="/:topic_slug"
          element={<Topic checkedTopics={checkedTopics} />}
        />
      </Routes>
    </div>
  );
}

export default App;
