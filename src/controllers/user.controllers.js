const { User, Post, Comment, Post_Images  } = require('../../db/models');

// CRUD - USERS
const getUser = async (req, res) => {
  try {
    const data = await User.findAll();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al listar usuarios' });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findByPk(id);
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

const createUser = async (req, res) => {
    console.log('body recibido ->', req.body);
  try {
    const { nickname, email } = req.body;
    const nuevoUser = await User.create({ nickname, email });
    res.status(201).json(nuevoUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { nickname, email } = req.body;
    const usuario = await User.findByPk(id);
    await usuario.update({ nickname, email });
    res.status(200).json(usuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const eliminado = await User.destroy({ where: { id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};

// RELACION USER - POST
const userCreatePost = async (req, res) => {
  try { 
    const userId = req.params.id;
    const {texto, imagen} = req.body;
    const user = await User.findByPk(userId);
    const nuevoPost = await user.createPost({ texto });
    if (imagen) {
      await nuevoPost.createPost_Image({ url: imagen });
  }
  const postConImagenes = await Post.findByPk(nuevoPost.id, { include: [Post_Images] });
    res.status(201).json(postConImagenes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear post para el usuario' });
  }
};

const getAllPostsByUserId = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    const posts = await user.getPosts();
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener posts del usuario' });
  }
};

const getPostByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const postId = req.params.postId;
    const postUser = await Post.findOne({ where: { id: postId, userId } });
    res.status(200).json(postUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener post del usuario' });
  }
};

const updatePostByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const postId = req.params.postId;
    const { texto } = req.body;
    const postUser = await Post.findOne({ where: { id: postId, userId } });
    await postUser.update({ texto });
    res.status(200).json(postUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar post del usuario' });
  }
};

const deletePostByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const postId = req.params.postId;
    await Post_Images.destroy({ where: { postId: postId } });
    await Comment.destroy({ where: { postId: postId } });
    await Post.destroy({ where: { id: postId, userId } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar post del usuario' });
  }
};

// RELACION USER - COMMENT
const userCreateComment = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    const user = await User.findByPk(userId);
    const nuevoComment = await user.createComment(data);
    res.status(201).json(nuevoComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear comentario para el usuario' });
  }
};

const getCommentsByUserId = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id, { include: [{ model: Comment }] });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    const comments = user.Comments ?? user.comments ?? [];
    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener comentarios del usuario' });
  }
};

const getCommentByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const commentId = req.params.commentId;
    const commentUser = await Comment.findOne({ where: { id: commentId, userId } });
    res.status(200).json(commentUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener comentario del usuario' });
  }
};

const updateCommentByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const commentId = req.params.commentId;
    const { texto } = req.body;
    const commentUser = await Comment.findOne({ where: { id: commentId, userId } });
    await commentUser.update({ texto });
    res.status(200).json(commentUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar comentario del usuario' });
  }
};

const deleteCommentByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const commentId = req.params.commentId;
    const eliminado = await Comment.destroy({ where: { id: commentId, userId } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar comentario del usuario' });
  }
};

module.exports = {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
  userCreatePost,
  getAllPostsByUserId,
  getPostByUserId,
  updatePostByUserId,
  deletePostByUserId,
  userCreateComment,
  getCommentsByUserId,
  getCommentByUserId,
  updateCommentByUserId,
  deleteCommentByUserId
};