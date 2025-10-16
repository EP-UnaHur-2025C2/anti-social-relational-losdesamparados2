const { Router } = require('express')
const route = Router()
const {userController} = require('../controllers/user.controllers')

// CRUD
route.get('/', userController.getUser) // Trae todos los usuarios
route.get('/:id', userController.getUserById) // Trae un usuario por su id
route.post('/', userController.createUser) // Crea un usuario
route.put('/:id', userController.updateUser) // Actualiza un usuario por su id
route.delete('/:id', userController.deleteUserById)  // Borra un usuario por su id

// Relacion User - Post
route.post('/:id/post', userController.userCreatePost) // El usuario crea un post
route.get('/:id/post', userController.getAllPostsByUserId) // Obtiene todos los posts de un usuario específico
route.get('/:id/post/:postId', userController.getPostByUserId) // Obtiene un post específico de un usuario específico
route.put('/:id/post/:postId', userController.updatePostByUserId) // Actualiza un post específico de un usuario específico
route.delete('/:id/post/:postId', userController.deletePostByUserId) // Elimina un post específico de un usuario específico    

// Relacion User - Comment
route.post('/:id/comment', userController.userCreateComment) // El usuario crea un comentario
route.get('/:id/comment', userController.getCommentsByUserId) // Obtiene todos los comentarios de un usuario específico
route.get('/:id/comment/:commentId', userController.getCommentByUserId) // Obtiene un comentario específico de un usuario específico
route.put('/:id/comment/:commentId', userController.updateCommentByUserId) // Actualiza un comentario específico de un usuario específico
route.delete('/:id/comment/:commentId', userController.deleteCommentByUserId) // Elimina un comentario específico de un usuario específico

module.exports = route