//javascript for sticky notes

//reference to main application container
const notesContainer = document.getElementById("app");
//reference to add new note button
const addNoteButton = notesContainer.querySelector(".add-note");


//when the page loads up we want to get all out notes and display them for the user
//for every note in local storage we are going to grab them
getNotes().forEach(note => {
    //passing the note and content ids-in JSON in local storage
    const noteElement = createNoteElement(note.id, note.content);
    //adding newly created note before the add note btn (noteElement, addNoteButton)
    notesContainer.insertBefore(noteElement, addNoteButton);

});

//to make sure the add note button works
addNoteButton.addEventListener("click", () => addNote());


//this function is to retrieve existing notes in local storage of clients browser
function getNotes() {
    return JSON.parse(localStorage.getItem ("stickynotes-notes") || "[]");
    /* || means or,or pass thru an empty array string*/
};

//save the notes on local storage in clients browser
//inside the parameter is an array called notes
function savedNotes(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
    /*just stringifying the notes array in the above parameter*/
};

//build a new html element that will represent a note
//inside parameters is an id and the notes content
function createNoteElement(id, content) {
    const element = document.createElement("textarea");
    //this element is the new textarea which was created using document.createElement

    element.classList.add("note");
    //to populate data in textarea
    element.value = content;
    element.placeholder = "Empty Sticky Note";

    //event listeners-to save updated note (updateNote) to local storage
    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });

    //event listener for when the user double clicks to delete note
    element.addEventListener("dblclick", () => {
        const doDelete = confirm("Are you sure you want to delete this note?");
        //doDelete will return a T or F

        //if user says ok
        if (doDelete){
            //doDelet wants the id and element
            deleteNote(id, element);
        };
    });

    return element;
};

//function to add a new note that will not only add note to the html but save to local storage
function addNote() {
    //refernce to all existing notes in local storage-add a new notes array to this array and the re-save the array
    const notes = getNotes();
    //notes object equal to a new js object
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        //default content is an empty string
        content:""
    };

    //creating the notes element to represent our new notes
    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    //adding notes element to the page so its visible to user
    notesContainer.insertBefore(noteElement, addNoteButton);


    //append our new note to the array - using push
    notes.push(noteObject);
    //re-save it to local storage
    savedNotes(notes);

};

//function will update your notes instead of adding a new one
//paramenter has an id and newContent, new content for the note will that id
function updateNote(id, newContent) {
    //console.log("Updating Note...");
    //console.log(id, newContent);
    //similar to addNotes we want to call existing notes
    const notes = getNotes();
    //find the target note the user is trying to update -filter() to filter array
    const targetNote = notes.filter(note => note.id == id)[0]; //if the note.id is equal to the id we're trying to pass in, we are good to go - [0] index of 0 to get the first element which is refering to our note

    //newContent which we will be passing through
    targetNote.content = newContent;
    //resave the array again - passing it the notes array
    savedNotes(notes);
};

//function to delete note
//had an id and element parameter element- the html element that represents that particular note
function deleteNote(id, element) {
    //console.log("Deleting Note...");
    //console.log(id);

    //want the notes that dont have the same id that we're passing in
    const notes =  getNotes().filter(note => note.id != id); //if the note.id does not match the id
    

    //resave the note again passing it the notes array
    savedNotes(notes);
    //then we remove note/textarea (the element)
    notesContainer.removeChild(element);
};
