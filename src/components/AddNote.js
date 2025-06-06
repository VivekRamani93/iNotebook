import React from 'react'
import { useContext } from 'react';
import NoteContext from './context/notes/noteContext';

function AddNote() {
    const context = useContext(NoteContext);
    const {addNote} = context;

    const [note, setNote] = React.useState({title: "", description: "", tag:""});

    const handleClick = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag:""}); // Reset the note state after adding

    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }
  return (
    <div>
      <div className="container my-3">
        <h2> Add a note </h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={3} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} minLength={3} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} minLength={3} required/>
          </div>
          <button disabled={note.title.length<3 || note.description.length<3} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
