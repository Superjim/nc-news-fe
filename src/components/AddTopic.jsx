import React, { useState, useContext, useEffect } from "react";
import { ArticleContext } from "../contexts/ArticleContext";
import { api } from "../utils/api";
import AddArticle from "./AddArticle";
//import { useNavigate } from "react-router-dom";

function AddTopic() {
  const { topics, setTopics } = useContext(ArticleContext);
  const [form, setForm] = useState({
    slug: "",
    description: "",
  });
  const [page, setPage] = useState(1);
  const [slugWarning, setSlugWarning] = useState(false);

  //if topic slug contains spacebar
  useEffect(() => {
    if (form.slug.split("").includes(" ")) {
      setSlugWarning(true);
    } else {
      setSlugWarning(false);
    }
  }, [form.slug]);

  //const navigate = useNavigate();

  //handles change of form
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitTopic = async (event) => {
    event.preventDefault();

    //create a new topic with temp values
    const newTopic = {
      slug: form.slug,
      description: form.description,
    };

    //optimistically add it to the array
    setTopics([newTopic, ...topics]);
    setPage(2);

    //post article to the backend
    try {
      await api.post("/topics", form);

      //if topic fails to add, let the user know somehow
      //if topic fails to add, remove it from the array (this probably breaks the site)
    } catch (error) {
      console.error(error);

      setTopics([...topics.filter((topic) => topic.slug !== form.slug)]);

      //redirect user to topic page??
    } finally {
      setForm({
        slug: "",
        description: "",
      });
    }
  };

  return (
    <div className="content">
      {page === 1 ? (
        <h2>Create a new topic</h2>
      ) : (
        <h2>Your new topic needs an article</h2>
      )}
      {page === 1 && (
        <form className="add-topic-form" onSubmit={handleSubmitTopic}>
          <div className="add-topic-input-container">
            <label htmlFor="slug">
              <h3>Topic Name</h3>
            </label>
            {slugWarning && (
              <h3 style={{ color: "red" }}>Please enter one word only</h3>
            )}
            <input
              placeholder="Enter your topic name"
              type="text"
              id="slug"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              required
            />
            <label htmlFor="description">
              <h3>Topic Description</h3>
            </label>
            <input
              placeholder="Enter a short description for your topic"
              type="text"
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>
          {!slugWarning && <button type="submit">Create new topic</button>}
        </form>
      )}
      {page === 2 && <AddArticle />}
    </div>
  );
}

export default AddTopic;
