import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export default function CreateBlock() {
    const auth = useContext(AuthContext);
    const { request, loading } = useHttp();
    const message = useMessage();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const handlerClick = async () => {
        try {
            const data = await request('/api/posts/publish', 'POST', { title, text }, {
                'Authorization': `Bearer ${auth.token}`,
            });
            setText('');
            setTitle('');
            message('Пост опубликован');
        } catch (e) { }
    };

    return (
        <div className="create-block__container">
            <div className="create-block">
                <div className="thumbnail-info">
                    <div className="input_field">
                        <label htmlFor="postName">Название поста</label>
                        <input
                            type="text"
                            name="postName"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            id="postName"
                        />
                    </div>
                    <div className="thumbnail">
                        <span>Превью поста</span>
                        <input type="file" name="thumbnail" id="thumbnail" className="inputfile inputfile-1" data-multiple-caption="{count} files selected" multiple="" />
                        <label htmlFor="thumbnail">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="17"
                                viewBox="0 0 20 17"
                            >
                                <path
                                    d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"
                                >
                                </path>
                            </svg>
                            <span>Выберите файл</span>
                        </label>
                    </div>
                </div>
                <div className="text-block">
                    <label htmlFor="text">Текст поста</label>
                    <textarea
                        name="text"
                        id="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        cols="70"
                        rows="21"
                    >
                    </textarea>
                </div>
                <div className="publish-container">
                    <button
                        className="post-btn"
                        onClick={handlerClick}
                        disabled={loading}
                    >
                        Опубликовать
                    </button>
                </div>
            </div>
        </div>
    )
}
