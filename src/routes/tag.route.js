const { Router } = require('express')
const route = Router()
const {
    getTag,
    getTagById,
    createTag,
    updateTag,
    deleteTagById,
    assignTagToPost,
    getPostByTagId
} = require('../controllers/tag.controllers')


// CRUD
route.get('/', getTag)    // Trae todas las etiquetas
route.get('/:id', getTagById) // Trae una etiqueta por su id
route.post('/', createTag)    // Crea una etiqueta
route.put('/:id', updateTag)  // Actualiza una etiqueta por su id
route.delete('/:id/post/postId', deleteTagById) // Borra una etiqueta de un post específico

// RELACIONES   
route.post('/:tagId/post/:postId', assignTagToPost) // Asigna una etiqueta a un post específico
route.get('/:tagId/post', getPostByTagId) // Obtiene todos los posts asociados a una etiqueta específica

module.exports = route