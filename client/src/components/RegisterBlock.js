import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export default function RegisterBlock() {
    const auth = useContext(AuthContext);
    const { request, error, clearError } = useHttp();
    const message = useMessage();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form });
            auth.login(data.tokens.accessToken, data.tokens.refreshToken, data.userId, data.username);
            message(data.message);
        } catch (e) { }
    }

    return (
        <div className="register__wrapper">
            <div className="register__container">
                <div className="text__block">
                    <h2>Регистрация</h2>
                    <p>Для входа в чат, вам нужно зарегистрироваться</p>
                </div>
                <div className="register__block">
                    <input
                        type="email"
                        name="email"
                        className="email-field"
                        placeholder="E-Mail"
                        value={form.email}
                        onChange={changeHandler}
                    />
                    <input
                        type="text"
                        name="username"
                        className="name-field"
                        placeholder="Ваше имя"
                        value={form.username}
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
                    {/* <input
                    type="password"
                    name="password2"
                    className="password-field"
                    placeholder="Повторите пароль"
                    value={password2}
                    onChange={(event) => { setPassword2(event.target.value) }}
                /> */}
                    <button
                        className="sign-up"
                        onClick={registerHandler}
                    >
                        ЗАРЕГИСТРИРОВАТЬСЯ
            </button>
                    <NavLink to="/" className="auth-link">Войти в аккаунт</NavLink>
                </div>
            </div>
        </div>
    );
}
