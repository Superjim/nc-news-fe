import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { ArticleContext } from "../contexts/ArticleContext";
import { api } from "../utils/api";
import Article from "./Article";

function AddArticle({ topic }) {
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

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post("/articles", form);
      console.log(response.data);
      //reflect this in the component
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="content">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            placeholder="Enter a title for your new article"
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            placeholder="Write your article here"
            id="body"
            name="body"
            value={form.body}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="topic">Topic:</label>
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
        </div>

        <div>
          <label htmlFor="article_img_url">Article Image URL:</label>
          <input
            type="url"
            id="article_img_url"
            name="article_img_url"
            value={form.article_img_url}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
      <Article
        props={{
          ...form,
          article_id: -202,
          created_at: new Date().getTime(),
          votes: 0,
        }}
        showAll={true}
      />
    </div>
  );
}

export default AddArticle;
