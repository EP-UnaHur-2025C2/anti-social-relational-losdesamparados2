const {User, Post, Comment} = require('../../db/models');

// CRUD 
const getUser = async (req, res) => {
    const data = await User.findAll();
    res.status(200).json(data);
}
const getUserById = async (req, res) => {
    const id = req.params.id;
    const data = await User.findByPk(id);
    res.status(200).json(data);
}
const createUser = async (req, res) => {
    const data = req.body;
    const nuevoUser = await User.create(data);
    res.status(201).json(nuevoUser);
}
const updateUser = async (req, res) => {
    const id = req.params.id;
    const {nickName, mail, password} = req.body; // hay que ver los atributos que va atener el user
    const usuario = await User.findByPk(id)
    usuario.nickName = nickName;
    usuario.mail = mail;
    usuario.password = password;
    await usuario.save();
    res.status(200).json(usuario);
}
const deleteUserById = async (req, res) => {
    const id = req.params.id;
    await User.remove({ where: { id } })
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
} 

// RELACION USER - POST
const userCreatePost = async (req, res) => {
    const userId = req.params.id;
    const data = req.body;
    const user = await User.findByPk(userId);
    const nuevoPost = await user.createPost(data);
    res.status(201).json(nuevoPost);
}
const getAllPostsByUserId = async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id, { include: Post });
    res.status(200).json(user.Posts);
}
const getPostByUserId = async (req, res) => {
    const userId = req.params.userId;
    const postId = req.params.postId;
    const postUser = await Post.findOne({ where: { id: postId, userId } });
    res.status(200).json(postUser);
}
const updatePostByUserId = async (req, res) => {
    const userId = req.params.userId;
    const postId = req.params.postId;
    const {texto} = req.body;
    const postUser = await Post.findOne({ where: { id: postId, userId } });
    postUser.texto = data.texto;
    await postUser.save();
    res.status(200).json(postUser);
}
const deletePostByUserId = async (req, res) => {
    const userId = req.params.userId;
    const postId = req.params.postId;
    await Post.destroy({ where: { id: postId, userId } });
    res.status(200).json({ message: 'Post eliminado correctamente' });
}

// RELACION USER - COMMENT
const userCreateComment = async (req, res) => {
    const userId = req.params.id;
    const data = req.body;
    const user = await User.findByPk(userId);
    const nuevoComment = await user.createComment(data);
    res.status(201).json(nuevoComment);
}
const getCommentsByUserId = async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id, { include: Comment });
    res.status(200).json(user.Comments);
}
const getCommentByUserId = async (req, res) => {
    const userId = req.params.userId;
    const commentId = req.params.commentId;
    const commentUser = await Comment.findOne({ where: { id: commentId, userId } });
    res.status(200).json(commentUser);
}
const updateCommentByUserId = async (req, res) => {
    const userId = req.params.userId;
    const commentId = req.params.commentId;
    const {texto} = req.body;
    const commentUser = await Comment.findOne({ where: { id: commentId, userId } });
    commentUser.texto = data.texto; 
    res.status(200).json(commentUser);
}
const deleteCommentByUserId = async (req, res) => {
    const userId = req.params.userId;
    const commentId = req.params.commentId;
    await Comment.destroy({ where: { id: commentId, userId } });
    res.status(200).json({ message: 'Comentario eliminado correctamente' });
}

module.exports = {getUser, getUserById, createUser, updateUser, deleteUserById, userCreatePost, getAllPostsByUserId, getPostByUserId, 
    updatePostByUserId, deletePostByUserId, userCreateComment, getCommentsByUserId, getCommentByUserId, updateCommentByUserId, deleteCommentByUserId}