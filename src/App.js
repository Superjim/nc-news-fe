import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Topic from "./components/Topic";
import "./App.css";
import ArticlePage from "./components/ArticlePage";
import Sidebar from "./components/Sidebar";
import { ArticleProvider } from "./contexts/ArticleContext";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <ArticleProvider>
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
        </ArticleProvider>
      </UserProvider>
    </div>
  );
}

export default App;
