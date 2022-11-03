import express from 'express'
import {Server as WebSocketServer} from 'socket.io'
import http from 'http'
import {v4 as uuid} from 'uuid'

let notesList =[]

const app = express()
app.use(express.static(__dirname + '/public'))

const httpServer = http.createServer(app)
const connectionIo = new WebSocketServer(httpServer)

connectionIo.on('connection' , (socket)=>{

  socket.emit('server:loadnotes' , notesList)

  socket.on('client:newnote' , newNote =>{
    const note = {...newNote , id: uuid()}
    notesList.push(note);
    connectionIo.emit('server:newnote' , note)
  })

  socket.on('client:deletenote', id =>{
    notesList = notesList.filter(note => note.id !==  id )
    connectionIo.emit('server:loadnotes' , notesList)
  })

  socket.on('client:getnote' , (id) =>{
    const note = notesList.find(note => note.id == id)
    socket.emit('server:selectnote' , note)
  })

  socket.on('client:updatenote' , (current_note) =>{
    notesList = notesList.map(note => {
      if(note.id === current_note.id){
        note.title = current_note.title
        note.description = current_note.description
      }
      return note
    })

    connectionIo.emit('server:loadnotes', notesList)
  })
})

const PORT = 3000

httpServer.listen(PORT)
console.log('Server running at port' , PORT)