import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export default function AuthBlock() {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const { request, error, clearError } = useHttp();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form });
            auth.login(data.tokens.accessToken, data.tokens.refreshToken, data.userId);
        } catch (e) { }
    };

    return (
        <div className="auth__wrapper">
            <div className="auth__container">
                <div className="text__block">
                    <h2>Войти в аккаунт</h2>
                    <p>Пожалуйста, войдите в свой аккаунт</p>
                </div>
                <div className="auth__block">
                    <input
                        type="text"
                        name="email"
                        className="login-field"
                        placeholder="Логин"
                        value={form.email}
                        onChange={changeHandler}
                    />
                    <input
                        type="password"
                        name="password"
                        className="password-field"
                        placeholder="Пароль"
                        value={form.password}
                        onChange={changeHandler}
                    />
                    <button
                        className="sign-in"
                        onClick={loginHandler}
                    >
                        ВОЙТИ В АККАУНТ
                </button>
                    <NavLink to="/register" className="register-link">Зарегистрироваться</NavLink>
                </div>
            </div>
        </div>
    );
}
