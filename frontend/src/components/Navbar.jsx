

import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/authSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const handleLogout = () => {
  
   dispatch(logoutUser())
   navigate("/")
  };                      

  return (
    <>
      <style>{`
        .navbar {
          width: 100%;
          background: blue;
          padding: 12px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          
          top: 0;
          left: 0;
          box-shadow: 0px 4px 8px rgba(0,0,0,0.2);
          font-family: Poppins, sans-serif;
        }

        .nav-title {
          font-size: 22px;
          font-weight: 700;
          color: white;
          text-decoration: none;
        }

        .nav-links {
          display: flex;
          gap: 15px;
        }

        .nav-links a, .logout-btn {
          font-size: 15px;
          font-weight: 600;
          color: white;
          text-decoration: none;
          border: 2px solid white;
          padding: 5px 12px;
          border-radius: 18px;
          background: transparent;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .nav-links a:hover, .logout-btn:hover {
          background: white;
          color: #ff4458;
          transform: scale(1.05);
        }
      `}</style>

      <nav className="navbar">
        <Link to="/" className="nav-title">Friends App</Link>

        <div className="nav-links">
          <Link to="/signup">Signup</Link>
          <Link to="/">Login</Link>
          <Link to='feed'>Feed</Link>
          <Link to='viewrequest'>viewRequest</Link>
          <Link to='friendlist'>FriendList</Link>
          <Link to='profile'>ProfilePage</Link>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}
