import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const logOut = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <>
      <din className="container">
        <img src="https://cdn.logo.com/hotlink-ok/logo-social.png" alt="logo" className="logo" />
        {auth ? (
          <ul className="nav-ul">
            <li>
              <Link to="/">Product</Link>
            </li>
            <li>
              <Link to="/add">Add Product</Link>
            </li>
            <li>
              <Link to="/update">Update Product</Link>
            </li>

            {/* <li>
              <Link to="/profile">Profile</Link>
            </li> */}

            <li>
              <Link to="/signup" onClick={logOut}>
                Logout({JSON.parse(auth).name})
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="nav-ul nav-right">
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        )}
      </din>
    </>
  );
};

export default Navbar;
