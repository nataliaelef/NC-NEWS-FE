import axios from 'axios';
const BASE_URL = 'http://localhost:9090/api';

// Users
export const getUsers = async () =>
  (await axios.get(`${BASE_URL}/users`)).data.users;

// Articles
export const getArticles = async () =>
  (await axios.get(`${BASE_URL}/articles`)).data.articles;

// Comments
export const addCommentByArticleId = async commentRequest =>
  // {article_id, username, body}
  await axios.post(`${BASE_URL}/articles/${commentRequest.articleId}`, {
    body: commentRequest.body,
    username: commentRequest.username
  });
