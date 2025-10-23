const { Router } = require('express')
const route = Router()
const {validateUser} = require('../middlewares/validateUser')
const {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUserById,
    userCreatePost,
    getAllPostsByUserId,
    getPostByUserId,
    updatePostByUserId,
    deletePostByUserId,
    userCreateComment,
    getCommentsByUserId,
    getCommentByUserId,
    updateCommentByUserId,
    deleteCommentByUserId
} = require('../controllers/user.controllers')

// CRUD
route.get('/', getUser) // Trae todos los usuarios
route.get('/:id', getUserById) // Trae un usuario por su id
route.post('/', createUser) // Crea un usuario
route.put('/:id', updateUser) // Actualiza un usuario por su id
route.delete('/:id', deleteUserById)  // Borra un usuario por su id

// Relacion User - Post
route.post('/:id/post', userCreatePost) // El usuario crea un post
route.get('/:id/post', getAllPostsByUserId) // Obtiene todos los posts de un usuario específico
route.get('/:id/post/:postId', getPostByUserId) // Obtiene un post específico de un usuario específico
route.put('/:id/post/:postId', updatePostByUserId) // Actualiza un post específico de un usuario específico
route.delete('/:id/post/:postId', deletePostByUserId) // Elimina un post específico de un usuario específico    

// Relacion User - Comment
route.post('/:id/comment', userCreateComment) // El usuario crea un comentario
route.get('/:id/comment', getCommentsByUserId) // Obtiene todos los comentarios de un usuario específico
route.get('/:id/comment/:commentId', getCommentByUserId) // Obtiene un comentario específico de un usuario específico
route.put('/:id/comment/:commentId', updateCommentByUserId) // Actualiza un comentario específico de un usuario específico
route.delete('/:id/comment/:commentId', deleteCommentByUserId) // Elimina un comentario específico de un usuario específico

module.exports = route