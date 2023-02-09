import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { ArticleContext } from "../contexts/ArticleContext";
import { api } from "../utils/api";
import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";
import Article from "./Article";
import { useNavigate } from "react-router-dom";

function AddArticle() {
  const { topics } = useContext(ArticleContext);
  const { user } = useContext(UserContext);
  const [form, setForm] = useState({
    author: user.username,
    title: "",
    body: "",
    topic: "",
    article_img_url: "",
  });
  const [page, setPage] = useState(1);
  const { articles, setArticles } = useContext(ArticleContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //create a new article with temp values
    const newArticle = {
      article_id: -202,
      title: form.title,
      topic: form.topic,
      author: user.username,
      body: form.body,
      created_at: new Date().toISOString(),
      votes: 0,
      article_img_url: form.article_img_url,
    };

    //optimistically add it to the array
    setArticles([newArticle, ...articles]);

    //post article to the backend
    try {
      const response = await api.post("/articles", form);

      //update the temp values of article if response recieved
      const updatedArticle = {
        ...newArticle,
        article_id: response.data.article.article_id,
        created_at: response.data.article.created_at,
        article_img_url: response.data.article.article_img_url,
      };
      setArticles((previousArticles) => [
        updatedArticle,
        ...previousArticles.filter((article) => article.article_id !== -202),
      ]);

      //if article fails to add, change body to reflect this
    } catch (error) {
      console.error(error);
      const updatedArticle = {
        ...newArticle,
        article_id: -503,
        body: "Network Error sending article to the database",
        article_img_url:
          "https://learn.microsoft.com/en-us/windows/win32/uxguide/images/mess-error-image15.png",
      };
      setArticles((previousArticles) => [
        updatedArticle,
        ...previousArticles.filter((article) => article.article_id !== -202),
      ]);

      //redirect user to topic page
    } finally {
      navigate(`/${form.topic}`);
    }
  };

  //file upload
  const uploader = Uploader({
    apiKey: "free", // Get production API keys from Upload.io
  });

  const options = { multi: false };

  return (
    <div className="content">
      {page === 2 && (
        <Article
          props={{
            ...form,
            article_id: -202,
            created_at: new Date().getTime(),
            votes: 0,
          }}
          showAll={true}
        />
      )}
      <div className="add-article-container">
        <form className="add-article-form" onSubmit={handleSubmit}>
          {page === 1 && (
            <div className="add-article-input-container">
              <label htmlFor="title">
                <h3>Title</h3>
              </label>
              <input
                placeholder="Enter a title for your new article"
                type="text"
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
              <label htmlFor="body">
                <h3>Body</h3>
              </label>
              <textarea
                placeholder="Write your article here"
                id="body"
                name="body"
                value={form.body}
                onChange={handleChange}
                required
              />
              <label htmlFor="topic">
                <h3>Topic</h3>
              </label>
              <select
                id="topic"
                name="topic"
                value={form.topic}
                onChange={handleChange}
                required
              >
                <option>Choose Topic</option>
                {topics.map((topic, index) => (
                  <option key={index} value={topic.slug}>
                    {topic.slug}
                  </option>
                ))}
              </select>

              <label htmlFor="article_img_url">
                <h3>Article Image URL</h3>
              </label>
              <input
                type="url"
                id="article_img_url"
                name="article_img_url"
                value={form.article_img_url}
                onChange={handleChange}
                placeholder="Enter an image URL or..."
              />
              <UploadButton
                uploader={uploader}
                options={options}
                onComplete={(files) =>
                  setForm({
                    ...form,
                    article_img_url: files.map((x) => x.fileUrl).join("\n"),
                  })
                }
              >
                {({ onClick }) => (
                  <button onClick={onClick}>Upload a picture...</button>
                )}
              </UploadButton>
              <span className="add-article-button-container">
                <button disabled>Prev</button>
                <button type="button" onClick={() => setPage(2)}>
                  Next
                </button>
              </span>
            </div>
          )}

          {page === 2 && (
            <div className="add-article-input-container">
              <h3>Happy with how your article looks?</h3>
              <span className="add-article-button-container">
                <button onClick={() => setPage(1)}>Prev</button>
                <button type="submit">Post Article</button>
              </span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddArticle;
