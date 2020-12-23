import React, { useState } from 'react';
import Post from './Post';

export default function Feed() {
    const [visible, setVisible] = useState(false);
    return (
        <div className="feed__container">
            <div className="feed">
                <div className="feed-header">
                    <h3>Все посты</h3>
                    <div className="drop-down_list">
                        <span onClick={() => { setVisible(!visible) }} className="btn-sort">Сортировать</span>
                        {visible && (
                            <div className="submenu">
                                <span>По названиям</span>
                                <span>По авторам</span>
                                <span>По дате</span>
                            </div>
                        )
                        }
                    </div>
                </div>
                <div className="posts-list">
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </div>
            </div>
        </div>
    )
}
