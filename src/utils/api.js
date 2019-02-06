import axios from 'axios';
const BASE_URL = 'http://localhost:9090/api';

// Users
export const getUsers = async () =>
  (await axios.get(`${BASE_URL}/users`)).data.users;

export const getUsersByUsername = username => {
  axios.get(`${BASE_URL}/users/${username}`).then(({ data }) => data);
};

// Articles
export const getArticles = async () =>
  (await axios.get(`${BASE_URL}/articles`)).data.articles;

export const getArticleById = async article_id =>
  (await axios.get(`${BASE_URL}/articles/${article_id}`)).data.article;

// Topics
export const getTopics = async () =>
  (await axios.get(`${BASE_URL}/topics`)).data.topics;

export const addTopic = async topicRequest => {
  await axios.post(`${BASE_URL}/topics`, {
    slug: topicRequest.slug,
    description: topicRequest.description
  });
};

export const getArticlesByTopic = async topicRequest => {
  await axios.get(`${BASE_URL}/topics/${topicRequest.topic}/articles`);
};

// Comments
export const getCommentsByArticleId = async articleId =>
  (await axios.get(`${BASE_URL}/articles/${articleId}/comments`)).data.comments;

export const addCommentByArticleId = async commentRequest =>
  // {article_id, username, body}
  await axios.post(`${BASE_URL}/articles/${commentRequest.articleId}`, {
    body: commentRequest.body,
    username: commentRequest.username
  });
