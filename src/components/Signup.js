import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name: credentials.name,email: credentials.email,password: credentials.password,}),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container mb-3 my-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" onChange={onChange} id="name" name='name' aria-describedby="emailHelp" />
      </div>
      <div className="container mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" onChange={onChange} id="email" name='email' aria-describedby="emailHelp" />
      </div>
      <div className="container mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" onChange={onChange} id="password" name='password' minLength={3} required/>
      </div>
       <div className="container mb-3">
        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" onChange={onChange} id="cpassword" name='cpassword' minLength={3} required/>
      </div>
      <button type="submit" className="btn btn-primary mx-2">Submit</button>
    </form>
  )
};

export default Signup;