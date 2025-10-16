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
    if (!data) return res.status(404).json({ error: 'Post image no encontrada' });
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
    const instancia = await post_images.findByPk(id);
    if (!instancia) return res.status(404).json({ error: 'Post image no encontrada' });

    // asigna los cambios (o usar instancia.update(cambios))
    await instancia.update(cambios);
    res.status(200).json(instancia);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar post image' });
  }
};

const deletePostImagesById = async (req, res) => {
  try {
    const id = req.params.id;
    const eliminado = await post_images.destroy({ where: { id } });
    if (!eliminado) return res.status(404).json({ error: 'Post image no encontrada' });
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
    // si tienes la asociación: Post.hasMany(post_images)
    if (Post && Post.findByPk) {
      const post = await Post.findByPk(postId, { include: [{ model: post_images }] });
      if (!post) return res.status(404).json({ error: 'Post no encontrado' });
      // si include funciona, devolver las imágenes relacionadas
      return res.status(200).json(post.post_images || post.postImages || []);
    }

    // fallback: buscar por campo postId en la tabla post_images
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