import './App.css';
import Navbar from './components/Navbar';
// import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './components/About';
import NoteState from './components/context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Notes from './components/Notes';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            {/* <Route exact path="/" element={<Home />} /> */}
            <Route exact path="/about" element={<About />} />
            <Route exact path="/" element={localStorage.getItem("token") ? <Notes /> : <Navigate to="/login" />}/>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
  );
}
export default App;