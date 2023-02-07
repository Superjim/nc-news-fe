import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-6g30.onrender.com/api/",
});

const patchArticleVote = async (amount, article_id) => {
  try {
    const response = await api.patch(`/articles/${article_id}`, {
      inc_votes: amount,
    });
    return response.data.article.votes;
  } catch (error) {
    alert("Connection error");
    console.log(error);
    return false;
  }
};

export { api, patchArticleVote };
