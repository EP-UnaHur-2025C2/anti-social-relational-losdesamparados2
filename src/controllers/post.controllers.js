const {post , tag, post_images} = Require('../../db/models');

// CRUD
const getPost = async (req, res) => {
    const data = await Post.findAll();
    res.status(200).json(data);
}
const getPostById = async (req, res) => {
    const id = req.params.id;
    const data = await post.findByPk(id);
    res.status(200).json(data);
}
const updatePost = async (req, res) => {
    const id = req.params.id;
    const {titulo, contenido, imagen} = req.body; // hay que ver los atributos que va atener el post
    const post = await post.findByPk(id)
    post.titulo = titulo;
    post.contenido = contenido;
    post.imagen = imagen;
    await post.save();
    res.status(200).json({message: 'Post actualizado correctamente', post});
}   
const createPost = async (req, res) => {
    const data = req.body;
    const nuevoPost = await post.create(data);
    res.status(201).json(nuevoPost);
}
const deletePostById = async (req, res) => {
    const id = req.params.id;
    await post.destroy(id)
    res.status(204).json({message: 'Post eliminado correctamente'});
}

// RELACION 
const getPostsByUserId = async (req, res) => {
    const userId = req.params.userId;
    const post = await post.findAll({ where: { userId } });
    res.status(200).json(post);
}
const getPostsByTagId = async (req, res) => {
    const tagId = req.params.tagId;
    const post = await post.findAll({ where: { tagId } });
    res.status(200).json(post);
}
const getPostImagesByPostId = async (req, res) => {
    const postId = req.params.postId;
    const postImages = await post_images.findAll({ where: { postId } });
    res.status(200).json(postImages);
}
const assignTagToPost = async (req, res) => {
    const tagId = req.params.tagId;
    const postId = req.params.postId;
    const tag = await tag.findByPk(tagId);
    const post = await post.findByPk(postId);
    await post.addTag(tag);
    res.status(200).json(tag);
}

const createPostInPostIdByUserId = async (req, res) => {
    const postId = req.params.postId;
    const userId = req.params.userId;
    const data = req.body.texto;
    const comentarioNuevo = await comment.create({ texto: data, postId: postId, userId: userId });
    res.status(201).json(comentarioNuevo);
}

module.exports = {getPost, getPostById, updatePost, createPost, deletePostById, getPostsByUserId, getPostsByTagId, getPostImagesByPostId, assignTagToPost, createPostInPostIdByUserId}