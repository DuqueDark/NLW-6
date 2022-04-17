const express = require('express')
const route = require('./route')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'view'))

const port = 3000

app.use(route)
app.use(express.static("public"))
app.listen(port, () => { console.log('RODANDO!!') })