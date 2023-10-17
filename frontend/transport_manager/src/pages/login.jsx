import React, { useState } from "react";
import '../styles/login.css';
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    toast.error("Please enter a valid email address.");
    return;
  }

  if (!password || password.length < 6) {
    toast.error("Password must be at least 6 characters long.");
    return;
  }

    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        
        const userData = await response.json();
        localStorage.setItem("userInfo", JSON.stringify(userData));
        navigate("/home"); 
        toast.success("Login successful");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
  };

  return (
  /*  <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input 
          type="email" 
          placeholder="Enter your Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
          type="password" 
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="login-button">Login</button>
        <p className="signUPcreateInfo">
            Dont have an account{" "}
            <span style={{ textDecoration: "underline", cursor: "pointer", color: "#4aee88", fontWeight: "bold" }}
            onClick={() => navigate("/signup")}>
              Sign Up
            </span>
          </p>
      </form>
      <Toaster />
    </div>

    */

    <div className="sign-up-container">
      <h2>LogIn</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email"
           value={email}  
          placeholder="Enter Your email"
          onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" 
          value={password} 
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
           />
        </div>
        <button type="submit">LogIn</button>
        <p className="signUPcreateInfo">
            Dont have an account.{" "}
            <span
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                color: "#4aee88",
                fontWeight: "bold",
              }}
              onClick={() => navigate("/signup")}
            >
              SignUp
            </span>
          </p>
      </form>
      <Toaster />
    </div>
  );
}

export default Login;
