const express = require('express')
const app = express()
const db = require('../db/models')


app.listen(3001, async () => {
    console.log(`El servidor se inicio en el puerto 3001`)
    //await db.sequelize.sync({force: true})
})