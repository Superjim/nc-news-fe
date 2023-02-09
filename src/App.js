import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Topic from "./components/Topic";
import "./App.css";
import ArticlePage from "./components/ArticlePage";
import Sidebar from "./components/Sidebar";
import NotFound from "./components/NotFound";
import { ArticleProvider } from "./contexts/ArticleContext";
import { UserProvider } from "./contexts/UserContext";
import AddArticle from "./components/AddArticle";

function App() {
  return (
    <div className="App">
      <ArticleProvider>
        <UserProvider>
          <Header />
          <Sidebar />
          <Routes>
            <Route path="/" element={<Topic />} />
            <Route path="/:topic_slug" element={<Topic />} />
            <Route
              path="/:topic_slug/articles/:article_id"
              element={<ArticlePage />}
            />
            <Route path="/add-article" element={<AddArticle />} />
            <Route path="/page-not-found" element={<NotFound />} />
          </Routes>
        </UserProvider>
      </ArticleProvider>
    </div>
  );
}

export default App;
