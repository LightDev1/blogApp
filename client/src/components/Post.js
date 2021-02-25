import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import Loader from './Loader';
import Comment from './CommentsList';


export default function Post() {
    const { token, userId, refresh, login } = useContext(AuthContext);
    const { request } = useHttp();
    const postId = useParams().id;
    const history = useHistory();
    const message = useMessage();
    const [post, setPost] = useState(null);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const checkTokens = useCallback(async () => {
        try {
            const data = await request('/api/auth/refresh-tokens', 'POST', { refreshToken: refresh });
            login(data.accessToken, data.refreshToken, data.userId);
        } catch (e) {
            console.log(`В checkTokens ${e.message}`);
        }
        // eslint-disable-next-line
    }, []);

    const getPost = useCallback(async () => {
        setLoading(true);
        checkTokens();
        try {
            const fetchedPost = await request(`/api/posts/${postId}`, 'GET', null, {
                'Authorization': `Bearer ${token}`,
            });
            setPost(fetchedPost);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e.message);
        }
    }, [token, postId, request, checkTokens]);

    useEffect(() => {
        getPost();
    }, [getPost]);

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

    if (loading) {
        return <Loader />
    }

    return (
        <div className="post-container">
            {post && (
                <article>
                    <div className="post-info">
                        <div className="post-title">
                            <h2>{post.title}</h2>
                        </div>
                        <div className="post-author">
                            <p>Автор: <Link to={`/profile/${post.author}`} className="author-link">{post.authorUsername}</Link></p>
                        </div>
                        <div className="post-date">
                            <p>Дата: {new Date(post.date).toLocaleDateString()}</p>
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
                    <div className="post-content">
                        <p>
                            {post.text}
                        </p>
                    </div>
                    <Comment postId={postId} />
                </article>
            )
            }
        </div>
    );
}
