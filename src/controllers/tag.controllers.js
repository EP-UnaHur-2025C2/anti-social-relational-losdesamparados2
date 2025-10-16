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
    // Dependiendo del alias de la asociación el array puede llamarse tag.Posts o tag.Post
    // devolvemos lo que exista o un array vacío
    const posts = tag.Posts ?? tag.posts ?? tag.Post ?? [];
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

    if (typeof post.addTag === 'function') {
      await post.addTag(tag); // many-to-many association
    } else if (post.update) {
      // fallback if Post has tagId field
      await post.update({ tagId });
    }
    res.status(200).json({ message: 'Tag asignado', tag });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al asignar tag al post' });
  }
};

// Opcional: quitar etiqueta de un post (si necesitás esta operación)
const removeTagFromPost = async (req, res) => {
  try {
    const tagId = req.params.tagId;
    const postId = req.params.postId;
    const tag = await Tag.findByPk(tagId);
    const post = await Post.findByPk(postId);
    if (!tag || !post) return res.status(404).json({ error: 'Post o Tag no encontrado' });

    if (typeof post.removeTag === 'function') {
      await post.removeTag(tag);
      return res.status(200).json({ message: 'Tag removido del post' });
    }

    // fallback: si existe campo tagId en Post
    if (post.tagId && String(post.tagId) === String(tagId)) {
      await post.update({ tagId: null });
      return res.status(200).json({ message: 'Tag removido del post (fallback)' });
    }

    res.status(400).json({ error: 'No es posible remover el tag (sin asociación definida)' });
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