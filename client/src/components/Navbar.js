import React, { useCallback, useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ContextMenu from './ContextMenu';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export default function Navbar() {
    const { token, defaultPic } = useContext(AuthContext);
    const { request } = useHttp();
    const [menu, setMenu] = useState(false);
    const [picture, setPicture] = useState('');
    const [username, setUsername] = useState('');

    const getShorData = useCallback(async () => {
        try {
            const data = await request('/api/auth/user-short-data', 'GET', null, {
                'Authorization': `Bearer ${token}`,
            });
            setPicture(data.profilePicture);
            setUsername(data.username);
        } catch (e) {
            console.log(e);
        }
    }, [token, request]);

    useEffect(() => {
        getShorData();

        return () => {
            setMenu(false);
        };
    }, [getShorData])

    const changeMenu = (state) => {
        setMenu(state);
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="logo-container"><NavLink to="/feed" className="logo">Blog App</NavLink></div>
                <div className="navigation-container">
                    <ul className="links__container">
                        <li><NavLink to="/create" className="link">Написать пост</NavLink></li>
                        <li><NavLink to="/feed" className="link">Лента</NavLink></li>
                    </ul>
                    <div className="profile-link" onClick={() => { setMenu(!menu) }}>
                        <span className="username">{username}</span>
                        <img src={picture ? picture : defaultPic} alt="profile" />
                        <div className="top_profile_arrow"></div>
                    </div>
                </div>
                {menu && <ContextMenu changeMenu={changeMenu} />}
            </div>
        </nav>
    );
}
