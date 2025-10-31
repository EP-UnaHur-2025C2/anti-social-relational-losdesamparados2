const { Router } = require('express')
const route = Router()
const {validateTag} = require('../middlewares/validateTag')
const {
    getTag,
    getTagById,
    createTag,
    updateTag,
    deleteTag,
    assignTagToPost,
    getPostByTagId,
    removeTagFromPostId
} = require('../controllers/tag.controllers')


// CRUD
route.get('/', getTag)    // Trae todas las etiquetas
route.get('/:id', getTagById) // Trae una etiqueta por su id
route.post('/', createTag)    // Crea una etiqueta
route.put('/:id', updateTag)  // Actualiza una etiqueta por su id
route.delete('/:id', deleteTag) // Borra una etiqueta

// RELACIONES   
route.post('/:tagId/post/:postId', assignTagToPost) // Asigna una etiqueta a un post específico
route.get('/:tagId/post', getPostByTagId) // Obtiene todos los posts asociados a una etiqueta específica
route.delete('/:tagId/post/:postId', removeTagFromPostId) // Remueve una etiqueta de un post específico 

module.exports = route