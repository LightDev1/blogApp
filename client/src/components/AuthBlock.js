import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export default function AuthBlock() {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const { request, error, loading, clearError } = useHttp();
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
            auth.login(data.token, data.userId);
        } catch (e) { }
    };

    return (
        <div className="auth__block">
            <div className="inputs__container">
                <div className="input_field">
                    <label htmlFor="email">Введите email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        value={form.email}
                        onChange={changeHandler}
                    />
                </div>
                <div className="input_field">
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
                className="btn__sign-in"
                onClick={loginHandler}
                disabled={loading}
            >
                Войти
            </button>
            <NavLink to="/register" className="register-link">Зарегистрироваться</NavLink>
        </div>
    );
}
