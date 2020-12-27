import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ContextMenu from './ContextMenu';
import profilePng from '../img/profile.png';

export default function Navbar() {
    const [menu, setMenu] = useState(false);

    return (
        <nav className="navbar">
            <ul className="links__container">
                <li onClick={() => { setMenu(!menu) }}><img src={profilePng} alt="profile" /></li>
                <li><NavLink to="/feed" className="link">Лента</NavLink></li>
                <li><NavLink to="/create" className="link">Написать пост</NavLink></li>
            </ul>
            {menu && <ContextMenu />}
        </nav>
    );
}
