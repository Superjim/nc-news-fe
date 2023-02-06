import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import NavBarTopic from "./components/NavBarTopic";
import Topic from "./components/Topic";

function App() {
  return (
    <div>
      <Header />
      <NavBarTopic />
      <Routes>
        <Route path="/" element={<Topic />} />
        <Route path="/:topic_slug" element={<Topic />} />
      </Routes>
    </div>
  );
}

export default App;
