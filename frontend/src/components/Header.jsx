/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */

import React from "react";
import { Link } from "react-router-dom";

const Header = ({ onLogout, isAuthenticated }) => {
  return (
    <header>
      <nav>
        <ul>
          {isAuthenticated && 
            <>
              <li><Link to="/home">Home</Link></li>
              <li>
                <button onClick={onLogout}>Logout</button>
              </li>
            </>
          }
          {!isAuthenticated &&
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </>
          }
        </ul>
      </nav>
    </header>
  );
};

export default Header;
