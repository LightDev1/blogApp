import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import Loader from './Loader';
import Posts from './Posts';
import profilePng from '../img/profile.png';

export default function Profile() {
    const auth = useContext(AuthContext);
    const { loading, request } = useHttp();
    const userId = useParams().id;
    const inputFile = useRef();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [picture, setPicture] = useState('');

    const getUser = useCallback(async () => {
        try {
            const fetchedUser = await request(`/api/auth/${userId}`, 'GET', null, {
                'Authorization': `Bearer ${auth.token}`,
            });
            setUser(fetchedUser);
            // console.log(user.profilePicture);
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
    }, [getPosts]);

    const getProfilePic = useCallback(async () => {
        try {

        } catch (e) {
            console.log(e.message);
        }
    }, [auth.token, userId, request, picture]);

    const changeHandler = () => {
        const file = inputFile.current.files[0];

        if (file) {
            let fileReader = new FileReader();

            fileReader.onload = (fileLoadedEvent) => {
                let scrData = fileLoadedEvent.target.result;
                setPicture(scrData);
            };
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="profile__container">
            {user && (
                <div className="profile">
                    <div className="info-container">
                        <div className="profile-picture">
                            <img src={user.profilePicture} alt="profile" />
                        </div>
                        <p>{user.username}</p>
                        <div className="change-pic__btn">
                            <input
                                type="file"
                                name="profilePicture"
                                id="profilePicture" className="inputfile inputfile-1"
                                data-multiple-caption="{count} files selected"
                                multiple=""
                                ref={inputFile}
                                onChange={changeHandler}
                            />
                            <label htmlFor="profilePicture">
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
                                <span>Фото профиля</span>
                            </label>
                        </div>
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
