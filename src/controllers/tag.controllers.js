const {Tag, Post} = require('../models')

const getTag = async (req, res) => {
    const data = await Tag.findAll();
    res.status(200).json(data);
}

const getTagById = async (req, res) => {
    const id = req.params.id;
    const data = await Tag.findByPk(id);
    res.status(200).json(data);
}
const createTag = async (req, res) => {
    const data = req.body;
    const nuevoTag = await Tag.create(data);
    res.status(201).json(nuevoTag);
}

const updateTag = async (req, res) => {
    const id = req.params.id;
    const nombre = req.body.nombre; 
    const tag = await Tag.findByPk(id)
    tag.nombre = nombre;
    await tag.save();
    res.status(200).json(tag);
}

const deleteTagById = async (req, res) => {
    const id = req.params.id;
    await Tag.remove({ where: { id } })
    res.status(204).json();
}

const getPostByTagId = async (req, res) => {
    const tagId = req.params.tagId;
    const tag = await Tag.findByPk(tagId, { include: Post });
    res.status(200).json(tag.Posts);
}

const assignTagToPost = async (req, res) => {
    const tadId = req.params.tagId;
    const postId = req.params.postId;
    const tag = await Tag.findByPk(tadId);
    const post = await Post.findByPk(postId);
    await post.addTag(tag);
    res.status(200).json(tag);
}

module.exports = {getTag, getTagById, createTag, updateTag, deleteTagById, getPostByTagId, assignTagToPost}