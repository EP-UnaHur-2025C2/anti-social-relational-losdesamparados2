const {Post , Tag, Post_Images, Comment} = require('../../db/models');

// CRUD
const getPost = async (req, res) => {
    try {
        const data = await Post.findAll();
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener posts' });
    }
};
const getPostById = async (req, res) => {
    try {
    const id = req.params.id;
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
        res.status(200).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener post' });
    }
};
const updatePost = async (req, res) => {
    try {
        const id = req.params.id;
        const { texto } = req.body;
        const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
        post.texto = texto;
        await post.save();
        res.status(200).json({ message: 'Post actualizado correctamente', post });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar post' });
    }
};   
const createPost = async (req, res) => {
    try {
        const { texto, userId, imagen } = req.body; 
        if (!texto || !userId) {
        return res.status(400).json({ error: 'Falta texto o userId' });
        }
        const nuevoPost = await Post.create({ texto, userId });
        if (imagen) {
            postImage = await Post_Images.create({ url: imagen, postId: nuevoPost.id });
        }
        const postWithImages = await Post.findByPk(nuevoPost.id, { include: [Post_Images] });
        res.status(201).json(postWithImages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear post' });
    }
};
const deletePostById = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await Post.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Post no encontrado' });
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar post' });
    }
};

// RELACION 
const getPostsByUserId = async (req, res) => {
    try {
        const userId = req.params.id;
        const posts = await Post.findAll({  where: { userId },
        include: [{ model: Post_Images }, { model: Comment }, { model: Tag }]
    });
        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener posts del usuario' });
    }
};

const getPostsByTagId = async (req, res) => {
    try {
        const tagId = req.params.tagId;
        const posts = await Post.findAll({
        include: [{
        model: Tag,
        where: { id: tagId }
        }]
    });
        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener posts por tag' });
    }
};

const getPostImagesByPostId = async (req, res) => {
    try {
    const postId = req.params.id;
    const images = await Post_Images.findAll({ where: { postId } });
        res.status(200).json(images);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener imágenes del post' });
    }
};

const assignTagToPost = async (req, res) => {
    try {
        const { tagId, postId } = req.params;
        const post = await Post.findByPk(postId);
        const tag = await Tag.findByPk(tagId);
        if (!post || !tag) return res.status(404).json({ error: 'Post o Tag no encontrado' });
        await post.addTag(tag);
        res.status(200).json({ message: 'Tag asignado correctamente', tag });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al asignar tag al post' });
    }
};

const createCommentInPostIdByUserId = async (req, res) => {
    try {
        const { postId, userId } = req.params;
        const { texto } = req.body;
        const post = await Post.findByPk(postId);
        if (!post) return res.status(404).json({ error: 'Post no encontrado' });
        const nuevoComentario = await post.createComment({ texto, userId });
        res.status(201).json(nuevoComentario);
    } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear comentario en el post' });
    }
};  

module.exports = {getPost, getPostById, updatePost, createPost, deletePostById, getPostsByUserId, getPostsByTagId, getPostImagesByPostId, assignTagToPost, createCommentInPostIdByUserId}