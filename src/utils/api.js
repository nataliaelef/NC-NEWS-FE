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

export const getArticleById = async () =>
  await axios.get(`${BASE_URL}/acticles/:article_id`).data.articles;

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
export const getCommentByArticleId = async commentRequest =>
  await axios.get(`${BASE_URL}/articles/${commentRequest.article_id}/comments`)
    .data.comments;

export const addCommentByArticleId = async commentRequest =>
  // {article_id, username, body}
  await axios.post(`${BASE_URL}/articles/${commentRequest.articleId}`, {
    body: commentRequest.body,
    username: commentRequest.username
  });
