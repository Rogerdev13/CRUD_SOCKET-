const socket = io()

const saveNote = (title , description) =>{
  socket.emit('client:newnote' , {
    title,
    description
  })
}

const deleteNote = id =>{
  socket.emit('client:deletenote', id)
}


const getNote = id =>{
  socket.emit('client:getnote' , id)
}

const updateNote = (id , title ,description) =>{
  socket.emit('client:updatenote', {
    id,
    title,
    description
  })
}

socket.on('server:newnote' , addNote)

//Load all the notes
socket.on('server:loadnotes' , renderNotes)

socket.on('server:selectnote' ,data =>{
  const title = document.querySelector('#title')
  const description = document.querySelector('#description')

  title.value = data.title
  description.value = data.description

  noteId = data.id 
} )