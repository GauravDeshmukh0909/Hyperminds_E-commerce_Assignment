import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/userSlice";

const Register = () => {
  const dispatch = useDispatch();

  // Separate states for each input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    dispatch(registerUser({ name, email, password }));

    console.log("Register:", { name, email, password });
  };

  return (
    <>
      <style>{`
        .auth-container {
          max-width: 400px;
          margin: 60px auto;
          padding: 25px;
          border-radius: 12px;
          border: 1px solid #ddd;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          font-family: Arial, sans-serif;
        }

        .auth-title {
          font-size: 26px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 20px;
        }

        .auth-field {
          margin-bottom: 15px;
        }

        .auth-field label {
          font-weight: bold;
          margin-bottom: 6px;
          display: block;
        }

        .auth-field input {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        .auth-btn {
          width: 100%;
          background: black;
          color: white;
          padding: 10px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-size: 16px;
          margin-top: 15px;
        }

        .auth-link {
          margin-top: 15px;
          text-align: center;
          font-size: 14px;
        }

        .auth-link a {
          color: black;
          font-weight: bold;
          text-decoration: none;
        }
      `}</style>

      <div className="auth-container">
        <div className="auth-title">Register</div>

        <form onSubmit={handleRegister}>
          <div className="auth-field">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="auth-btn" type="submit">
            Register
          </button>

          <div className="auth-link">
            Already have an account? <a href="/login">Login</a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
