import { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from './context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const context = useContext(NoteContext);
    const navigate = useNavigate();
    const { notes, getNotes, editNote } = context;

    useEffect(() => {
        if (localStorage.getItem("token")) {
            console.log(localStorage.getItem("token"))
            getNotes(); // fetch notes after login
        } else {
            navigate("/login"); 
        }
        // eslint-disable-next-line
        }, []);

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    const [alert, setAlert] = useState(null);
    const showAlert = (message) => {
        setAlert(message);
        setTimeout(() => setAlert(null), 2000);
    };

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag
        });
    };

    const handleClick = () => {
        console.log("Updating the note...", note);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        showAlert("Note updated successfully!");
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
            <AddNote />
            {alert && (
                <div className="alert alert-success" role="alert">
                    {alert}
                </div>
            )}

            {/* Modal for editing */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={3} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} minLength={3} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 3 || note.edescription.length < 3} onClick={handleClick} type="button" className="btn btn-primary">Update note</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notes list */}
            <div className="row my-3">
                <h2>Your notes</h2>
                <div className='container mx-3'>
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => (
                    <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={showAlert} />
                ))}
            </div>
        </>
    );
};

export default Notes;
