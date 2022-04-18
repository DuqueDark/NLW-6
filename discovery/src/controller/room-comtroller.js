const Database = require('../db/config')

function getRoomId(){

    let roomId = ''

    for(let i = 0; i<6;i++){
        roomId += Math.floor(Math.random()*10).toString()
    }

    return roomId
}

const vadidateId = async (ids)=>{

    let roomId = ''
    let exitsId = true
    
    while(exitsId){
        roomId = await getRoomId()
        
        exitsId = ids.some(id => roomId === id)
        if(! exitsId){
            return roomId
        }
    }
            
}
        
module.exports = {
    async create(req, res){
                    
        const pass = req.body.password
                    
        const db = await Database() 
                    
        const ids = await db.all('SELECT id FROM rooms')
        const roomId = await vadidateId(ids)
        
        
        await db.run(`INSERT INTO rooms (
            id, 
            pass
        ) VALUES (
            ${parseInt(roomId)},
            "${pass}"
        )`)
        

        await db.close()
    
        res.redirect(`/room/${roomId}`)
    },
    async open(req, res){

        const roomId = req.params.roomId

        const db = await Database()

        const [questions, questionsReads] = await Promise.all([db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`), db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)])

        let isQuestions = true

        if(questions.length <= 0 && questionsReads <= 0){
            isQuestions = false
        }

        res.render("room",{ roomId: roomId, questions: questions, questionsReads: questionsReads, isQuestions: isQuestions })
    },
    async enter(req, res){
        
        const roomId = req.body.roomId

        res.redirect(`/room/${roomId}`)
    }   
}
    