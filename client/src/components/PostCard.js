import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export default function PostCard({ post }) {
    const { token, userId } = useContext(AuthContext);
    const { request } = useHttp();
    const message = useMessage();
    const history = useHistory();
    const [visible, setVisible] = useState(false);

    const clickHandler = async () => {
        try {
            const data = await request(`/api/posts/delete/${post._id}`, 'DELETE', null, {
                'Authorization': `Bearer ${token}`,
            });
            message(data.message)
            setVisible(false);
            history.push('/');
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <div className="post">
            <h4 className="post-title">
                <Link to={`/posts/${post._id}`} className="post-title">{post.title}</Link>
            </h4>
            <div className="post-info">
                <span className="post-author">
                    Aвтор: <Link to={`/profile/${post.author}`} className="author-link">{post.authorUsername}</Link>
                </span>
                <span className="post-date">Дата публикации: {new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="post-thumbnail">
                <img src={post.thumbnail} alt="thumbnail" />
            </div>
            {(post.author === userId) && (
                <i
                    className="fas fa-ellipsis-v"
                    onClick={() => { setVisible(!visible) }}
                >
                </i>
            )}
            {visible && (
                <div className="context-menu">
                    <span onClick={clickHandler}>Удалить</span>
                </div>
            )}
        </div>
    );
}
