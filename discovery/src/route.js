const express = require('express')

const route = express.Router()

route.get('/',(req, res)=>{
    return res.render("index")
})

route.get('/create-room',(req, res)=>{
    return res.render("create-room")
})

route.get('/room',(req, res)=>{
    return res.render("room")
})

//route.post('/room/:room/:question/:action')

module.exports = route