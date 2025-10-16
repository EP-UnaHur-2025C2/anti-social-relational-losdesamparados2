const { Router } = require('express');
const route = Router();

const {
    getComments,
    getCommentsById,
    updateComment,
    deleteCommentById,
    createCommentInPostId,
    updateCommentByPostId,
    deleteCommentByPostId,
    createComment,
    getCommentsByTime
} = require('../controllers/comment.controllers');

// CRUD - el create lo dejamos también por si hace falta (el usuario crea) 
route.get('/', getComments);
route.get('/:id', getCommentsById);
route.put('/:id', updateComment);
route.delete('/:id', deleteCommentById);
route.post('/', createComment); // opcional: si querés permitir crear comentario general

// RELACION POST - COMMENTS
route.post('/:postId/comments', createCommentInPostId); // Crea un comentario para un post especifico
route.put('/:postId/comments/:commentsId', updateCommentByPostId); // Actualiza un comentario de un post específico
route.delete('/:postId/comments/:commentsId', deleteCommentByPostId); // Elimina un comentario de un post específico

// FILTRADO POR TIEMPO (query ?tiempo=30 en segundos)
route.get('/filter/bytime', getCommentsByTime);

module.exports = route;