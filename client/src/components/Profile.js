import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import Loader from './Loader';
import Posts from './Posts';
import profilePng from '../img/profile.png';
import thumbnail from '../img/test-thumbnail.jpg'

export default function Profile() {
    const { token } = useContext(AuthContext);
    const { loading, request } = useHttp();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const userId = useParams().id;

    const getUser = useCallback(async () => {
        try {
            const fetchedUser = await request(`/api/auth/${userId}`, 'GET', null, {
                'Authorization': `Bearer ${token}`,
            });
            setUser(fetchedUser);
        } catch (e) {
            console.log(e.message);
        }
    }, [token, userId, request]);

    useEffect(() => {
        getUser();
    }, [getUser]);

    const getPosts = useCallback(async () => {
        try {
            const fetchedPosts = await request(`/api/posts/user_posts/${userId}`, 'GET', null, {
                'Authorization': `Bearer ${token}`,
            });
            setPosts(fetchedPosts.reverse());
        } catch (e) {
            console.log(e.message);
        }
    }, [token, userId, request]);

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
                        <h2>Мои посты</h2>
                        <Posts posts={posts} />
                    </div>
                </div>
            )}
        </div>
    )
}
