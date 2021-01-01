import React, { useCallback, useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ContextMenu from './ContextMenu';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export default function Navbar() {
    const { token } = useContext(AuthContext);
    const { request } = useHttp();
    const [menu, setMenu] = useState(false);
    const [picture, setPicture] = useState('');

    const getPicture = useCallback(async () => {
        try {
            const fetchedPicture = await request('/api/auth/userpicture', 'GET', null, {
                'Authorization': `Bearer ${token}`,
            });
            setPicture(fetchedPicture);
        } catch (e) {
            console.log(e);
        }
    }, [token, request]);

    useEffect(() => {
        getPicture();
    }, [getPicture])

    return (
        <nav className="navbar">
            <ul className="links__container">
                <li onClick={() => { setMenu(!menu) }}><img src={picture} alt="profile" /></li>
                <li><NavLink to="/feed" className="link">Лента</NavLink></li>
                <li><NavLink to="/create" className="link">Написать пост</NavLink></li>
            </ul>
            {menu && <ContextMenu />}
        </nav>
    );
}
