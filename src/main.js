const express = require('express');
const path = require('path');
const app = express();
const db = require('../db/models');

const commentsRoute = require('./routes/comments.route');
const postImagesRoute = require('./routes/post_images.route');
const postRoute = require('./routes/post.route');
const tagRoute = require('./routes/tag.route');
const userRoute = require('./routes/user.route');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load(path.join(__dirname, '../docs/unahur-api.yaml'));


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(express.json());

app.use('/comments', commentsRoute);
app.use('/postImages', postImagesRoute);
app.use('/post', postRoute);
app.use('/tag', tagRoute);
app.use('/user', userRoute);

app.listen(3001, async () => {
  console.log(`El servidor se inició en el puerto 3001`);
  //await db.sequelize.sync({ force: true });
});
