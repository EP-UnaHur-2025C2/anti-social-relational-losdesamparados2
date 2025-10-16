const { Router } = require('express')
const route = Router()
const {
    getPost,
    getPostById,
    createPost,
    updatePost,
    deletePostById,
    getPostsByUserId,
    getPostsByTagId,
    getPostImagesByPostId,
    assignTagToPost,
    createCommentInPostIdByUserId
} = require('../controllers/post.controllers')

// CRUD
route.get('/', getPost)
route.get('/:id', getPostById)
route.post('/', createPost) // creo que esto no va porque el usuario crea el post
route.put('/:id', updatePost)
route.delete('/:id', deletePostById)  

// RELACIONES
route.get('/:id/user/id', getPostsByUserId) //Trae el post de un usuario específico
route.post('/:id/comments/userId', createCommentInPostIdByUserId) // crea un comentario en un post específico hecho por un usuario específico //SIN HACER EL CONTROLADOR
route.get('/tag/:tagId', getPostsByTagId) // trae los posts que tienen un tag específico
route.get('/:id/images', getPostImagesByPostId) // trae las imagenes de un post específico
route.post('/:postId/tag/:tagId', assignTagToPost) // asigna un tag a un post específico


module.exports = route