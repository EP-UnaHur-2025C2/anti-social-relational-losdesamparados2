const {Comment, Post, User} = require('../models/comment.model');

// CRUD
const getComments = async (req, res) => {
    const data = await Comment.findAll();
    res.status(200).json(data);
}
const getCommentsById = async (req, res) => {
    const id = req.params.id;
    const data = await Comment.findByPk(id);
    res.status(200).json(data);
}
const updateComment = async (req, res) => {
    const id = req.params.id;
    const texto = req.body.texto;
    const comentario = await Comment.findByPk(id)
    comentario.texto = texto;
    await comentario.save();
    res.status(200).json(comentario);
}
const deleteCommentById = async (req, res) => {
    const id = req.params.id;
    await Comment.remove({ where: { id } })
    res.status(204).json({message:'Comentario eliminado correctamente'});
} 

// RELACION COMMENT - POST
const createCommentInPostId = async (req, res) => {
    const postId = req.params.postId;
    const data = req.body;
    const post = await Post.findByPk(postId);
    const nuevoComentario = await post.createComment(data);
    res.status(201).json(nuevoComentario);
}
const updateCommentByPostId = async (req, res) => {
    const postId = req.params.postId;
    const commentsId = req.params.commentsId;
    const data = req.body;
    const comentario = await Comment.findOne({ where: { id: commentsId, postId } });
    comentario.texto = data
    await comentario.save();
    res.status(200).json(comentario);
}
const deleteCommentByPostId = async (req, res) => {
    const postId = req.params.postId;
    const commentsId = req.params.commentsId;
    await Comment.destroy({ where: { id: commentsId, postId } })
    res.status(204).json({message:'Comentario eliminado correctamente'});
}

// RELACION COMMENT - USER



// ATRIBUTO CALCULADO -- NOSE SI ESTA BIEN ESTO
const getCommentsByTime = async (req, res) => {
    const todosLosComentarios = await Comment.findAll();
    const tiempo = Number(req.query.tiempo); 
    const limite = new Date();
    limite.setSeconds(limite.getSeconds() - tiempo);
    const comentariosVisibles = todosLosComentarios.filter(c => c.createdAt >= limite);
    res.status(200).json(comentariosVisibles); 
}

module.exports = {getComments, getCommentsById, updateComment, createComment, deleteCommentById, getCommentsByTime};