const { Router } = require('express');
const route = Router();

const {
  getPostImages,
  getPostImagesById,
  createPostImages,
  updatePostImages,
  deletePostImagesById,
  getPostImagesByPostId
} = require('../controllers/post_images.controllers');

// CRUD
route.get('/', getPostImages);
route.get('/:id', getPostImagesById);
route.post('/', createPostImages);
route.put('/:id', updatePostImages);
route.delete('/:id', deletePostImagesById);
// RELACION: obtener imágenes de un post por postId
route.get('/posts/:postId', getPostImagesByPostId);

module.exports = route;