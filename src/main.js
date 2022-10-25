//javascript for sticky notes

//reference to main application container
const notesContainer = document.getElementById("app");
//reference to add new note button
const addNoteButton = notesContainer.querySelector(".add-note");

//this function is to retrieve existing notes in local storage of clients browser
function getNotes() {
    return JSON.parse(localStorage.getItem ("stickynotes-notes") || "[]");
    /* || means or,or pass thru an empty array string*/
}

//save the notes on local storage in clients browser
//inside the parameter is an array called notes
function savedNotes(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
    /*just stringifying the notes array in the above parameter*/
}

//build a new html element that will represent a note
//inside parameters is an id and the notes content
function createNoteElement(id, content) {
    
}

//function to add a new note that will not only add note to the html but save to local storage
function addNote() {
    
}

//function will update your notes instead of adding a new one
//paramenter has an id and newContent, new content for the note will that id
function updateNote(id, newContent) {
    
}

//function to delete note
//had an id and element parameter element- the html element that represents that particular note
function deleteNote(id, element) {
    
}
