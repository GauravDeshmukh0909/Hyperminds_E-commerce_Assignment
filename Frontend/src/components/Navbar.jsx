import React, { useEffect, useState } from "react";
import { ShoppingCart, User } from "lucide-react";
import UserProfilePopup from "../pages/UserProfile";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../store/cartSlice";

const Navbar = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <>
      <style>{`
        .navbar {
          width: 100%;
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          font-family: Arial, sans-serif;
        }

        .logo {
          font-size: 24px;
          font-weight: bold;
          cursor: pointer;
        }

        .nav-items {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .icon-btn {
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
        }

        .cart-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          background: black;
          color: white;
          font-size: 10px;
          padding: 2px 5px;
          border-radius: 50%;
        }

        /* Wrapper for user popup */
        .user-wrapper {
          position: relative;
        }
      `}</style>

      <nav className="navbar">
        <div onClick={() => navigate("/")} className="logo">
          MyStore
        </div>

        <div className="nav-items">
          {/* Cart Icon */}
          <button onClick={() => navigate("/cart")} className="icon-btn">
            <ShoppingCart size={24} />
            {items.length > 0 && <span className="cart-badge">{items.length}</span>}
          </button>

          {/* User Icon + Popup */}
          <div className="user-wrapper">
            <button
              className="icon-btn"
              onClick={() => setOpenProfile((prev) => !prev)}
            >
              <User size={24} />
            </button>

            {/* Popup is rendered outside the button */}
            {openProfile && (
              <UserProfilePopup
                visible={openProfile}
                onClose={() => setOpenProfile(false)}
              />
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
