import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/", {
        email,
        password,
      });

      if (res.data === "exist") {
        history(`/home?id=${email}`);
      } else if (res.data === "notexist") {
        toast.error("User has not signed up");
      }
    } catch (error) {
      toast.error("Invalid email or password");
      console.error(error);
    }
  }

  return (
    <div className="login" style={{ backgroundImage: `url(${require('./background/log.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '8px', width: '300px' }}>
        <h1 style={{ fontWeight: 'bold', color: 'black', textAlign: 'center' }}>Login</h1>

        <form onSubmit={submit}>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <div className="buttons" style={{ textAlign: 'center', marginTop: '10px' }}>
            <button type="submit" id="submit">Submit</button>
            <Link to="/signup" style={{ marginLeft: '10px' }}>Signup Page</Link>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Login;