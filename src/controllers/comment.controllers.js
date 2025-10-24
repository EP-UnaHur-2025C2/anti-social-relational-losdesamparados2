const { Comment, Post, User } = require('../../db/models');

// CRUD
const getComments = async (req, res) => {
    try {
        const data = await Comment.findAll();
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener comentarios' });
    }
};

const getCommentsById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Comment.findByPk(id);
        if (!data) return res.status(404).json({ error: 'Comentario no encontrado' });
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener comentario' });
    }
};

const updateComment = async (req, res) => {
    try {
        const id = req.params.id;
        const texto = req.body.texto;
        const comentario = await Comment.findByPk(id);
        if (!comentario) return res.status(404).json({ error: 'Comentario no encontrado' });
        comentario.texto = texto;
        await comentario.save();
        res.status(200).json(comentario);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar comentario' });
    }
};

const deleteCommentById = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await Comment.destroy({ where: { id } }); // destroy en lugar de remove
        if (!deleted) return res.status(404).json({ error: 'Comentario no encontrado' });
        res.status(204).json();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar comentario' });
    }
};

const createComment = async (req, res) => {
    try {
        const data = req.body;
        const comentarioNuevo = await Comment.create(data);
        res.status(201).json(comentarioNuevo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear comentario' });
    }
};

// RELACION COMMENT - POST
const createCommentInPostId = async (req, res) => {
    try {
        const postId = req.params.postId;
        const data = req.body;
        const post = await Post.findByPk(postId);
        if (!post) return res.status(404).json({ error: 'Post no encontrado' });

        
        const nuevoComentario = await post.createComment(data);
        res.status(201).json(nuevoComentario);
    } catch (err) {
        console.error(err);
    res.status(500).json({ error: 'Error al crear comentario en el post' });
    }
};

const updateCommentByPostId = async (req, res) => {
    try {
        const postId = req.params.postId;
        const commentsId = req.params.commentsId;
        const texto = req.body.texto;
        const comentario = await Comment.findOne({ where: { id: commentsId, postId } });
        if (!comentario) return res.status(404).json({ error: 'Comentario no encontrado para ese post' });
        comentario.texto = texto;
        await comentario.save();
        res.status(200).json(comentario);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar comentario del post' });
    }
};

const deleteCommentByPostId = async (req, res) => {
    try {
        const postId = req.params.postId;
        const commentsId = req.params.commentsId;
        await Comment.destroy({ where: { id: commentsId, postId } });
        res.status(204).json({ message: 'Comentario eliminado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar comentario del post' });
    }
};

// ATRIBUTO CALCULADO
const getCommentsByTime = async (req, res) => {
    try {
        const todosLosComentarios = await Comment.findAll();
        const tiempo = Number(req.query.tiempo); // segundos
        if (isNaN(tiempo)) return res.status(400).json({ error: 'Parámetro tiempo inválido' });
        const limite = new Date();
        limite.setSeconds(limite.getSeconds() - tiempo);
        const comentariosVisibles = todosLosComentarios.filter(c => new Date(c.createdAt) >= limite);
        res.status(200).json(comentariosVisibles);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al filtrar comentarios por tiempo' });
    }
};

module.exports = {
    getComments,
    getCommentsById,
    updateComment,
    createComment,
    deleteCommentById,
    getCommentsByTime,
    createCommentInPostId,
    updateCommentByPostId,
    deleteCommentByPostId
};