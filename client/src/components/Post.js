import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import Loader from './Loader';

export default function Post() {
    const { token } = useContext(AuthContext);
    const { request, loading } = useHttp();
    const postId = useParams().id;
    const [post, setPost] = useState(null);

    const getPost = useCallback(async () => {
        try {
            const fetchedPost = await request(`/api/posts/${postId}`, 'GET', null, {
                'Authorization': `Bearer ${token}`,
            });
            setPost(fetchedPost);
            console.log(fetchedPost);
        } catch (e) {
            console.log(e.message);
        }
    }, [token, postId, request]);

    useEffect(() => {
        getPost();
    }, [getPost]);

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
                    </div>
                    <div className="post-content">
                        <p>
                            {post.text}
                        </p>
                    </div>
                </article>
            )
            }
        </div>
    );
}
