import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

  const navigate = useNavigate();
     const { user} = useSelector((state) => state.user);

    const handleLogin = (e) => {
        e.preventDefault();

        // Dispatch actual user data
        dispatch(loginUser({ email, password }));

        console.log("Login:", { email, password });
    };


    useEffect(() => {
        if (user) {
            navigate("/"); // redirect to home
        }
    }, [user, navigate]);
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
                <div className="auth-title">Login</div>

                <form onSubmit={handleLogin}>
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
                        Login
                    </button>

                    <div className="auth-link">
                        Don't have an account? <a href="/register">Register</a>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
