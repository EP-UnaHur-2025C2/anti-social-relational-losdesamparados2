const { Router } = require('express')
const route = Router()
const {getTag, getTagById, createTag, updateTag, deleteTagById, getPostByTagId, assignTagToPost} = require('../controllers/tag.controllers')

route.get('/', getTag)

route.get('/:id', getTagById)

route.get('/:tagId/post', getPostByTagId) // Obtiene todos los posts asociados a una etiqueta específica

route.post('/', createTag)

route.put('/:id', updateTag)

route.delete('/:id/post/postId', deleteTagById) // Borra una etiqueta de un post específico

route.post('/:tagId/post/:postId', assignTagToPost) // Asigna una etiqueta a un post específico

module.exports = route