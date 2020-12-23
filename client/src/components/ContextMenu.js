import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

export default function ContextMenu() {
    const auth = useContext(AuthContext);
    const history = useHistory();

    const handleLogout = () => {
        auth.logout();
        history.push('/');
    };

    return (
        <div className="context-menu">
            <NavLink to="/profile" className="link">Профиль</NavLink>
            <span onClick={handleLogout} className="link">Выйти</span>
        </div>
    );
}
