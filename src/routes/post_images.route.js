const { Router } = require('express')
const route = Router()
const {getPostImages, getPostImagesById, createPostImages, updatePostImages, deletePostImagesById} = require('../controllers/post_images.controllers')

route.get('/', getPostImages)

route.get('/:id', getPostImagesById)

route.post('/', createPostImages)

route.put('/:id', updatePostImages)

route.delete('/:id', deletePostImagesById)  

module.exports = route