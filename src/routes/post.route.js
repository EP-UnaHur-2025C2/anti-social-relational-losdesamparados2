const { Router } = require('express')
const route = Router()
const {getPost, getPostById, updatePost, createPost, deletePostById, getPostsByUserId, getPostsByTagId, getPostImagesByPostId, assignTagToPost} = require('../controllers/post.controllers')

// CRUD
route.get('/post', getPost)
route.get('post/:id', getPostById)
route.post('/post', createPost) // creo que esto no va porque el usuario crea el post
route.put('post/:id', updatePost)
route.delete('post/:id', deletePostById)  

// RELACIONES
route.get('post/:id/user/id', getPostsByUserId) //Trae el post de un usuario específico
route.post('post/:id/comments/userId'. createPostInPostIdByUserId) // crea un comentario en un post específico hecho por un usuario específico //SIN HACER EL CONTROLADOR
route.get('post/tag/:tagId', getPostsByTagId) // trae los posts que tienen un tag específico
route.get('post/:id/images', getPostImagesByPostId) // trae las imagenes de un post específico
route.post('post/:postId/tag/:tagId', assignTagToPost) // asigna un tag a un post específico


module.exports = route