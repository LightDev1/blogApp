import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import Comment from './Comment';

export default function CommentsList({ postId }) {
    const { token } = useContext(AuthContext);
    const { request } = useHttp();
    const [text, setText] = useState('');
    const [comments, setComments] = useState([]);
    const [rerender, setRerender] = useState(false);

    const pressHandler = async (event) => {
        if (event.key === 'Enter') {
            try {
                await request('/api/comments/create', 'POST', { text, post: postId }, {
                    'Authorization': `Bearer ${token}`,
                });
                setText('');
                getComments();
            } catch (e) {
                console.log(e.message);
            }
        }
    };

    const getComments = useCallback(async () => {
        try {
            const fetchedComments = await request('/api/comments', 'POST', { postId }, {
                'Authorization': `Bearer ${token}`,
            });
            setComments(fetchedComments.reverse());
        } catch (e) {
            console.log(e);
        }
    }, [token, request, postId]);

    useEffect(() => {
        getComments();
    }, [getComments, rerender]);

    const shouldRerender = (execution) => {
        setRerender(execution);
    };

    return (
        <div className="comments-container">
            <div className="comment-container">
                <h3>Комментарии ({comments.length})</h3>
                <div className="create-comment">
                    <div className="input_field">
                        <input
                            type="text"
                            name="comment"
                            id="comment"
                            placeholder="Оставьте комментарий"
                            value={text}
                            onChange={(event) => { setText(event.target.value) }}
                            onKeyPress={pressHandler}
                        />
                    </div>
                </div>
                <div className="comments-list">
                    {comments ? (
                        comments.map(comment => (
                            <Comment comment={comment} shouldRerender={shouldRerender} key={comment._id} />
                        ))) : (
                            <h3>Здесь пока нет комментариев</h3>
                        )}
                </div>
            </div>
        </div>
    );
}
