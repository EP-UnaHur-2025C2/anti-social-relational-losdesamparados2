const {post_images, Post} = require('../../db/models')

// CRUD
const getPostImages = async (req, res) => {
    const data = await post_images.findAll();
    res.status(200).json(data);
}

const getPostImagesById = async (req, res) => {
    const id = req.params.id;
    const data = await post_images.findByPk(id);
    res.status(200).json(data);
}

const createPostImages = async (req, res) => {
    const data = req.body;
    const nuevoPostImages = await post_images.create(data);
    res.status(201).json(nuevoPostImages);
}

const updatePostImagesByPostId = async (req, res) => {
}

// RELACION
const getPostImagesByPostId = async (req, res) => {
    const data = await post_images.findAll();
    res.status(200).json(data);
}

module.exports = {getPostImages, getPostImagesById, createPostImages, updatePostImagesByPostId, deletePostImagesById, getPostImagesByPostId}