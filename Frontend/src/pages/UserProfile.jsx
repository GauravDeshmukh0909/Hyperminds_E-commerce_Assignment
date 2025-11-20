import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProfilePopup = ({ visible, onClose }) => {
  const navigate = useNavigate();

  if (!visible) return null;

  // Dummy user data (replace with actual from Redux or API)
  // const [user] = useState({
  //   name: "John Doe",
  //   email: "john@example.com",
  //   joined: "2025-01-10",
  // });

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    // Close popup
    onClose();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <style>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.3);
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
          padding: 70px 20px 0 0;
          z-index: 999;
        }

        .popup-box {
          width: 280px;
          background: white;
          border-radius: 12px;
          padding: 20px;
          position: relative;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
          font-family: 'Inter', sans-serif;
        }


        .logout-btn {
          margin-top: 20px;
          background: red;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 8px;
          cursor: pointer;
          width: 100%;
          font-size: 15px;
          transition: 0.2s;
        }

        .logout-btn:hover {
          background: darkred;
        }
      `}</style>

      <div className="popup-overlay" onClick={onClose}>
        <div className="popup-box" onClick={(e) => e.stopPropagation()}>

          {/* Logout Button */}
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default UserProfilePopup;
