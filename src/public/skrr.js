
const note_form = document.getElementById("formxd");
const form_title = document.getElementById("title");
const form_description = document.getElementById("description");



note_form.addEventListener("submit", (e) => {
  e.preventDefault()
  if(noteId){
    updateNote(noteId , form_title.value , form_description.value)
  }else{
    saveNote(form_title.value , form_description.value)
  }

  form_title.value = ""
  form_description.value = ""

  form_title.focus
});
