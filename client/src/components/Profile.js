import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import Loader from './Loader';
import Posts from './Posts';
import profilePng from '../img/profile.png';

export default function Profile() {
    const auth = useContext(AuthContext);
    const { loading, request } = useHttp();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const userId = useParams().id;

    const getUser = useCallback(async () => {
        try {
            const fetchedUser = await request(`/api/auth/${userId}`, 'GET', null, {
                'Authorization': `Bearer ${auth.token}`,
            });
            setUser(fetchedUser);
        } catch (e) {
            console.log(e.message);
        }
    }, [auth.token, userId, request]);

    useEffect(() => {
        getUser();
    }, [getUser]);

    const getPosts = useCallback(async () => {
        try {
            const fetchedPosts = await request(`/api/posts/user_posts/${userId}`, 'GET', null, {
                'Authorization': `Bearer ${auth.token}`,
            });
            setPosts(fetchedPosts.reverse());
        } catch (e) {
            console.log(e.message);
        }
    }, [auth.token, userId, request]);

    useEffect(() => {
        getPosts();
    }, [getPosts])

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="profile__container">
            {user && (
                <div className="profile">
                    <div className="info-container">
                        <div className="profile-picture">
                            <img src={profilePng} alt="profile" />
                        </div>
                        <p>{user.username}</p>
                        <button className="change-img__btn">
                            Изменить автарку
                    </button>
                    </div>
                    <div className="users-posts">
                        <h2>
                            {
                                auth.userId === userId ? (
                                    <>Мои посты ({posts.length})</>
                                ) : (
                                        <>Посты пользователя ({posts.length})</>
                                    )
                            }
                        </h2>
                        <Posts posts={posts} />
                    </div>
                </div>
            )}
        </div>
    )
}
