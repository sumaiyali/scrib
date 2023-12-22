import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState("");
  const [confirmUser, setConfirmUser] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return;
    }

    // Check if username and confirm username match
    if (user !== confirmUser) {
      toast.error("Username and Confirm Username do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/signup", {
        email,
        password,
        username: user,
      });

      if (res.data === "exist") {
        toast.error("User already exists");
      } else if (res.data === "notexist") {
        history("/home", { state: { id: email } });
      }
    } catch (error) {
      toast.error("Wrong details");
      console.log(error);
    }
  };

  return (
    <div className="signup" style={{ backgroundImage: `url(${require('./background/log.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '8px', width: '300px', textAlign: 'center' }}>
        <h1 style={{ fontWeight: 'bold', color: 'black' }}>Signup</h1>
        <form onSubmit={submit}>
          <input type="text" onChange={(e) => setUser(e.target.value)} placeholder="Username" />
          <input type="text" onChange={(e) => setConfirmUser(e.target.value)} placeholder="Confirm Username" />
          <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
          <div className="buttons" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <button type="submit" id="submit">Sign Up</button>
            <Link to="/">Login page</Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;