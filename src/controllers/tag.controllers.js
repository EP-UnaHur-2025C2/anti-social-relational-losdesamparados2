const { Tag, Post } = require('../../db/models');

// CRUD
const getTag = async (req, res) => {
  try {
    const data = await Tag.findAll();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al listar tags' });
  }
};

const getTagById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Tag.findByPk(id);
    if (!data) return res.status(404).json({ error: 'Tag no encontrado' });
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener tag' });
  }
};

const createTag = async (req, res) => {
  try {
    const data = req.body;
    const nuevoTag = await Tag.create(data);
    res.status(201).json(nuevoTag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear tag' });
  }
};

const updateTag = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre } = req.body;
    const tag = await Tag.findByPk(id);
    if (!tag) return res.status(404).json({ error: 'Tag no encontrado' });
    await tag.update({ nombre });
    res.status(200).json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar tag' });
  }
};

const deleteTagById = async (req, res) => {
  try {
    const id = req.params.id;
    const eliminado = await Tag.destroy({ where: { id } }); // destroy en vez de remove
    if (!eliminado) return res.status(404).json({ error: 'Tag no encontrado' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar tag' });
  }
};

// RELACIONES
const getPostByTagId = async (req, res) => {
  try {
    const tagId = req.params.tagId;
    const tag = await Tag.findByPk(tagId, { include: [{ model: Post }] });
    if (!tag) return res.status(404).json({ error: 'Tag no encontrado' });
    const posts = tag.Posts ?? [];
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener posts por tag' });
  }
};

const assignTagToPost = async (req, res) => {
  try {
    const tagId = req.params.tagId;
    const postId = req.params.postId;
    const tag = await Tag.findByPk(tagId);
    const post = await Post.findByPk(postId);
    if (!tag || !post) return res.status(404).json({ error: 'Post o Tag no encontrado' });
    await post.addTag(tag); 
    res.status(200).json({ message: 'Tag asignado al post', tag });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al asignar tag al post' });
  }
};

const removeTagFromPost = async (req, res) => {
  try {
    const tagId = req.params.tagId;
    const postId = req.params.postId;
    const tag = await Tag.findByPk(tagId);
    const post = await Post.findByPk(postId);
    if (!tag || !post) return res.status(404).json({ error: 'Post o Tag no encontrado' });
      await post.removeTag(tag);
      res.status(200).json({ message: 'Tag removido del post' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al remover tag del post' });
  }
};

module.exports = {
  getTag,
  getTagById,
  createTag,
  updateTag,
  deleteTagById,
  getPostByTagId,
  assignTagToPost,
  removeTagFromPost
};