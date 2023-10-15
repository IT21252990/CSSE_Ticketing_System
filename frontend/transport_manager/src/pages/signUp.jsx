import React, { useState } from 'react';
import '../styles/signup.css'
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";


const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !name || !password || !confirmPassword || !Phone) {
      toast.error("Please fill in all fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

  
    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    
        if (password !== confirmPassword) {
          toast.error("Passwords do not match.");
          return;
        }
    

    try {
      const response = await fetch("http://localhost:4000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          Phone,
          name,
        }),
      });

      if (response.ok) {
        toast.success("User created successfully");
        navigate("/login");
      } else {
        toast.error("Failed to create user");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} 
          placeholder="Enter Your name"
          onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email}  
          placeholder="Enter Your email"
          onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" value={Phone} 
          placeholder="Enter Your phone"
          onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} 
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
           />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" value={confirmPassword} 
          placeholder="Enter your Confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <button type="submit">Sign Up</button>
        <p className="signUPcreateInfo">
            Already have an account.{" "}
            <span
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                color: "#4aee88",
                fontWeight: "bold",
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
      </form>
      <Toaster />
    </div>
  );
}

export default SignUp;
