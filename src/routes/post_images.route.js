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

// RUTA RELACION (opcional) - por ejemplo: /posts/:postId/images
// Si montás estas rutas en otro router, ajustá el path.
route.get('/posts/:postId', getPostImagesByPostId);

module.exports = route;