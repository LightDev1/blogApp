import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export default function RegisterBlock() {
    const auth = useContext(AuthContext);
    const { request, loading, error, clearError } = useHttp();
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
            auth.login(data.token, data.userId);
            message(data.message);
        } catch (e) { }
    }

    return (
        <div className="register__container">
            <div className="inputs__container">
                <div className="input_field register__field">
                    <label htmlFor="username">Введите имя</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={form.username}
                        onChange={changeHandler}
                    />
                </div>
                <div className="input_field register__field">
                    <label htmlFor="email">Введите email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        value={form.email}
                        onChange={changeHandler}
                    />
                </div>
                <div className="input_field register__field">
                    <label htmlFor="password">Введите пароль</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={form.password}
                        onChange={changeHandler}
                    />
                </div>
            </div>
            <button
                className="btn__sign-in reg"
                onClick={registerHandler}
                disabled={loading}
            >
                Зарегистрироваться
            </button>
            <NavLink to="/" className="login-link">Войти</NavLink>
        </div>
    );
}
