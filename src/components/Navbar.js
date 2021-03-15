
import React, { useRef } from "react";

import './Navbar.scss';

export const Navbar = () => {
  return (
    <div className="navbar">
        <ul>
            <div className="nav-left">
                <li>
                    <a href="">About</a>
                </li>   
            </div>
            <div className="nav-right">
            <li>
                <a href="">About</a>
            </li>
            <li>
                <a href="">About</a>
            </li>
            <li>
                <a href="">About</a>
            </li>
            </div>
        </ul>
    </div>
  )
}

export default Navbar;
