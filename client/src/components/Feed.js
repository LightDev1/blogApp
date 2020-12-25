import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import Posts from './Posts';
import Loader from './Loader';

export default function Feed() {
    const { token } = useContext(AuthContext);
    const { loading, request } = useHttp();
    const [visible, setVisible] = useState(false);
    const [posts, setPosts] = useState([]);

    const getAllPosts = useCallback(async () => {
        try {
            const fetchedPosts = await request('/api/posts', 'GET', null, {
                'Authorization': `Bearer ${token}`,
            });
            setPosts(fetchedPosts.posts);
        } catch (e) {
            console.log(e.message);
        }
    }, [token, request]);

    useEffect(() => {
        getAllPosts();
    }, [getAllPosts]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="feed__container">
            <div className="feed">
                <div className="feed-header">
                    <h3>Все посты</h3>
                    <div className="drop-down_list">
                        <span onClick={() => { setVisible(!visible) }} className="btn-sort">Сортировать</span>
                        {
                            visible && (
                                <div className="submenu">
                                    <span>По названиям</span>
                                    <span>По авторам</span>
                                    <span>По дате</span>
                                </div>
                            )
                        }
                    </div>
                </div>
                <Posts posts={posts} />
            </div>
        </div>
    )
}
