const { post_images, Post } = require('../../db/models');

// CRUD
const getPostImages = async (req, res) => {
  try {
    const data = await post_images.findAll();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al listar post images' });
  }
};

const getPostImagesById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await post_images.findByPk(id);
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener post image' });
  }
};

const createPostImages = async (req, res) => {
  try {
    const data = req.body;
    const nuevoPostImages = await post_images.create(data);
    res.status(201).json(nuevoPostImages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear post image' });
  }
};

const updatePostImages = async (req, res) => {
  try {
    const id = req.params.id;
    const cambios = req.body;
    const nuevoPostImages = await post_images.findByPk(id);
    await nuevoPostImages.update(cambios);
    res.status(200).json(nuevoPostImages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar post image' });
  }
};

const deletePostImagesById = async (req, res) => {
  try {
    const id = req.params.id;
    await post_images.destroy({ where: { id } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar post image' });
  }
};

// RELACION: obtener imágenes de un post por postId
const getPostImagesByPostId = async (req, res) => {
  try {
    const postId = req.params.postId;
    const data = await post_images.findAll({ where: { postId } });
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener imágenes del post' });
  }
};

module.exports = {
  getPostImages,
  getPostImagesById,
  createPostImages,
  updatePostImages,
  deletePostImagesById,
  getPostImagesByPostId
};