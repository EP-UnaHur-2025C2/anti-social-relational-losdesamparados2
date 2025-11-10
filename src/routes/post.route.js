const { Router } = require('express')
const route = Router()
const {validatePost} = require('../middlewares/validatePost')
const {validateUserId} = require('../middlewares/validateUser')
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
route.put('/:id', updatePost)
route.delete('/:id', deletePostById)  

// RELACIONES
route.get('/user/:userId/posts', getPostsByUserId)
route.post('/user/:userId', validateUserId, validatePost, createPost)
route.get('/tag/:tagId/posts', getPostsByTagId)
route.get('/:postId/images', getPostImagesByPostId)
route.post('/:postId/tag/:tagId', assignTagToPost)


module.exports = route