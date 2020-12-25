import React from 'react';
import thumbnail from '../img/test-thumbnail.jpg';

export default function Post({ posts }) {
    return (
        <div className="posts-list">
            {posts ? (
                posts.map(post => (
                    <div className="post" key={post._id}>
                        <h4 className="post-title">{post.title}</h4>
                        <div className="post-info">
                            <span className="post-author">Aвтор: <a>{post.author}</a></span>
                            <span className="post-date">Дата публикации: {new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <div className="post-thumbnail">
                            <img src={thumbnail} alt="thumbnail" />
                        </div>
                    </div>
                ))) : (
                    <h3>Здесь пока нет постов</h3>
                )
            }
        </div>
    );
}
