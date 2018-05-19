var fs = require("fs");
var note = require("./note.js");
var yargs = require("yargs");
var titleOptions = {
  describe: "Title of the note",
  demand: true,
  alias: "t"
}
var argv = yargs
  .command('add', 'Add a new note', {
    title : titleOptions,
    body: {
      describe: "Body of the note",
      demand: true,
      alias: "b"
    }
  })
  .command('remove', "Remove a note", {
    title: titleOptions,
  })
  .command("list", "List all notes", {})
  .command("read", "Read a note", {
    title: titleOptions,
  })
  .help()
  .argv;
var command = argv._[0];

if(command == "add")
{
  var addOrNot = note.addNote(argv.title, argv.body);
  if(addOrNot == 1)
  {
    console.log("Note added!");
    console.log(`Title: ${argv.title} and Body: ${argv.body}`);
  }
  else if(addOrNot == 0)
  {
    console.log("Note title already exists!");
  }
}

else if(command == "remove")
{
  var removedNote = note.removeNote(argv.title); //removedNote will be TRUE if note was removed, else FALSE
  var message = removedNote? "Note removed" : "Note not found"; //using ternary operator instead of if else
  console.log(message);
}

else if(command == "read")
{
  var body = note.readNote(argv.title);
  if(body == "")
  {
    console.log("Note not found!");
  }
  else
  {
    console.log(`Body: ${body}`);
  }
}

else if(command == "list")
{
  note.listNotes();
}
