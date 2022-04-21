const express = require('express')
const questionController = require('./controller/question-controller')
const roomComtroler = require('./controller/room-comtroller')

const route = express.Router()

route.get('/',(req, res)=>res.render("index",{ page: 'enter-room' }))
route.get('/create-room',(req, res)=>res.render("index",{ page: 'create-room' }))

route.get('/room/:roomId', roomComtroler.open)

route.post('/create-room', roomComtroler.create)

route.post('/entre-room',roomComtroler.enter)

route.post('/question/:room/:question/:action', questionController.index)

route.post('/question/create/:room', questionController.create)

module.exports = route