const { Router } = require('express')
const route = Router()
const {commentsControllers} = require('../controllers/comment.controllers')

// CRUD - no tiene para crear comentario proqeu lo crea el usuario
route.get('/coments', getComments)
route.get('coments/:id', getCommentsById)
route.put('/:id', updateComment)
route.delete('/:id', deleteCommentById)  

// RELACION COMMENT - POST
route.post('/post/:postId/comments', commentsControllers.createCommentInPostId) // Crea un comentario para un post especifico
route.get('/post/:postId/comments/:commentsId', commentsControllers.updateCommentByPostId) // Actualiza un comentario de un post específico
route.delete('/post/:postId/comments/:commentsId', commentsControllers.deleteCommentByPostId) // Elimina un comentario de un post específico

// RELACION COMMENT - USER




module.exports = route