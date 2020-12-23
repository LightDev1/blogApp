import React from 'react';
import thumbnail from '../img/test-thumbnail.jpg';

export default function Post() {
    return (
        <div className="post">
            <h4 className="post-title">Чудесные ландшафты</h4>
            <div className="post-info">
                <span className="post-author">Aвтор: <a>Админ</a></span>
                <span className="post-date">Дата публикации: 23.12.2020</span>
            </div>
            <div className="post-thumbnail">
                <img src={thumbnail} alt="thumbnail" />
            </div>
        </div>
    );
}
