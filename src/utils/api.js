import axios from 'axios';
const BASE_URL = `https://nc-news-api-ne.herokuapp.com/api`;

// Users
export const getUsers = async () =>
  (await axios.get(`${BASE_URL}/users`)).data.users;

// Articles
export const getArticles = async sortedBy => {
  let url = `${BASE_URL}/articles`;
  if (sortedBy) {
    url += `?sort_by=${sortedBy}&limit=50`;
  }
  return (await axios.get(url)).data.articles;
};

export const getArticleById = async article_id =>
  (await axios.get(`${BASE_URL}/articles/${article_id}`)).data.article;

export const addArticleByTopic = async (title, body, topic, username) =>
  (await axios.post(`${BASE_URL}/topics/${topic}/articles`, {
    title,
    body,
    username
  })).data.article;

// Topics
export const getTopics = async () =>
  (await axios.get(`${BASE_URL}/topics`)).data.topics;

export const addTopic = async (slug, description) =>
  (await axios.post(`${BASE_URL}/topics`, { slug, description })).data.topic;

export const getArticlesByTopic = async topic =>
  (await axios.get(`${BASE_URL}/topics/${topic}/articles`)).data.articles;

// Comments
export const getCommentsByArticleId = async articleId =>
  (await axios.get(`${BASE_URL}/articles/${articleId}/comments`)).data.comments;

export const addCommentByArticleId = async (body, username, articleId) => {
  const comment = (await axios.post(
    `${BASE_URL}/articles/${articleId}/comments`,
    {
      body,
      username
    }
  )).data.comment;
  return { ...comment, author: comment.username };
};

//votes
export const voteOnArticle = (addedVote, articleId) => {
  // console.log(articleId);
  return axios({
    method: 'patch',
    url: `${BASE_URL}/articles/${articleId}`,

    data: {
      inc_votes: { addedVote }
    }
  }).then(({ data: { article } }) => article);
};

//votes
export const voteOnComment = (addedVote, articleId, commentId) => {
  return axios({
    method: 'patch',
    url: `${BASE_URL}/articles/${articleId}/comments/${commentId}`,
    data: {
      inc_votes: addedVote
    }
  }).then(({ data: { comments } }) => comments);
};
