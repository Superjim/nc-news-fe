import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Topic from "./components/Topic";
import "./App.css";
import ArticlePage from "./components/ArticlePage";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Topic />} />
        <Route path="/:topic_slug" element={<Topic />} />
        <Route
          path="/:topic_slug/articles/:article_id"
          element={<ArticlePage />}
        />
      </Routes>
    </div>
  );
}

export default App;
