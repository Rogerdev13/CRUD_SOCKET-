//Calling the element notes that is the container of the notes.
const notesList = document.getElementById('notes')

let noteId = ''

const noteUi = note=>{

  const newElement = document.createElement('div');

  newElement.innerHTML = `
  <div class="card card-body rounded-1 mb-2 animate__animated  animate__backInDown">
    <div class="d-flex justify-content-between ">
      <h1 class='h3 card-title'>${note.title}</h1>
      <div >
        <button class="btn btn-danger delete" data-id="${note.id}">Delete</button>
        <button class="btn btn-secondary update" data-id="${note.id}">Update</button>
      </div>
    </div>
    <p>${note.description}</p>
  </div>`;

  const btnDelete = newElement.querySelector('.delete');

  const btnUpdate = newElement.querySelector('.update');


  btnDelete.addEventListener('click' , () =>{
    deleteNote(btnDelete.dataset.id)
  })

  btnUpdate.addEventListener('click' ,() =>{
    getNote(btnUpdate.dataset.id)
  })
  return newElement;

}

const renderNotes = notes =>{
  notesList.innerHTML= '';
  notes.forEach(note => {
    notesList.append(noteUi(note))
  })
}

const addNote  = notes =>{
  notesList.append(noteUi(notes))
}