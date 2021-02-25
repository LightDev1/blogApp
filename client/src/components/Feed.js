import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import PostList from './PostList';
import Loader from './Loader';;

export default function Feed() {
    const { token, refresh, login } = useContext(AuthContext);
    const { request } = useHttp();
    const [visible, setVisible] = useState(false);
    const [posts, setPosts] = useState([]);
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

    const getAllPosts = useCallback(async () => {
        setLoading(true);
        checkTokens();
        try {
            const fetchedPosts = await request('/api/posts', 'GET', null, {
                'Authorization': `Bearer ${token}`,
            });
            setPosts(fetchedPosts.posts.reverse());
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }, [token, request, checkTokens]);

    useEffect(() => {
        getAllPosts();
    }, [getAllPosts]);

    const sortBy = (parameter) => {
        switch (parameter) {
            case 'titles':
                const newArray = posts;
                newArray.sort((a, b) => a.title.localeCompare(b.title));

                setPosts(newArray);
                setVisible(false);
                break;

            case 'authors':
                const newArray2 = posts;
                newArray2.sort((a, b) => a.authorUsername.localeCompare(b.authorUsername));

                setPosts(newArray2);
                setVisible(false);
                break;

            case 'date':
                const newArray3 = posts;
                newArray3.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

                setPosts(newArray3);
                setVisible(false);
                break;

            default:
                break;
        }
    };

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
                                    <span onClick={() => sortBy('titles')}>По названиям</span>
                                    <span onClick={() => sortBy('authors')}>По авторам</span>
                                    <span onClick={() => sortBy('date')}>По дате</span>
                                </div>
                            )
                        }
                    </div>
                </div>
                <PostList posts={posts} />
            </div>
        </div>
    )
}
