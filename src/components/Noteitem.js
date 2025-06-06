// src/Noteitem.js
import React from 'react';
import NoteContext from './context/notes/noteContext';

const Noteitem = (props) => {
    const context = React.useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote, showAlert } = props;

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this note?");
        if (confirmDelete) {
            deleteNote(id);
            showAlert("Note deleted successfully!");
        }
    };

    return (
        <div className='col-md-3'>
            <div className="card my-3" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash mx-2" onClick={() => handleDelete(note._id)}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={() => updateNote(note)}></i>
                </div>
            </div>
        </div>
    );
};

export default Noteitem;
