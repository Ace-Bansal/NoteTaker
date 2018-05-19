var fs = require("fs");

var fetchNotes = () => {
  try{
    var strNote = fs.readFileSync("notes-data.json");
    return JSON.parse(strNote);
  } catch(e){
    return [];
  }
}

var saveNotes = (notes) => {
  fs.writeFileSync("notes-data.json", JSON.stringify(notes));
}

var addNote = (title, body) => {

  var notes = fetchNotes();
  var newNote = {
    title,
    body
  };


  var flag = 0;
  for (var i = 0; i < notes.length; i++)
  {
    if(title == notes[i].title)
    {
      flag = flag + 1;
      break;
    }
  }

  if(flag == 0)
  {
    notes.push(newNote);
    saveNotes(notes);
    return 1;
  }
  else
  {
    return 0;
  }
}

var removeNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => title != note.title);
  saveNotes(filteredNotes);

  return notes.length != filteredNotes.length; //if length of both is not same, then it means a note was removed, and we'll return TRUE in this case
}

var readNote = (title) => {
  var notes = fetchNotes();
  var noteBody = "";
  for (var i = 0; i < notes.length; i++) {
    if(notes[i].title == title)
    {
      noteBody = notes[i].body;
      break;
    }
  }
  return noteBody;
}

var listNotes = () => {
  var notes = fetchNotes();
  for (var i = 0; i < notes.length; i++) {
    console.log(`Title: ${notes[i].title} and Body: ${notes[i].body}`);
  }
}

module.exports = {
  addNote,
  removeNote,
  readNote,
  listNotes
}
