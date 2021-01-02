import React from 'react';
import PostCard from './PostCard';

export default function PostList({ posts }) {
    return (
        <div className="posts-list">
            {posts ? (
                posts.map(post => (
                    <PostCard post={post} key={post._id} />
                ))) : (
                    <h3>Здесь пока нет постов</h3>
                )
            }
        </div >
    );
}
