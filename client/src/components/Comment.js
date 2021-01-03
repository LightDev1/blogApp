import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export default function Comment({ comment, shouldRerender }) {
    const { token, userId } = useContext(AuthContext);
    const { request } = useHttp();
    const message = useMessage();
    const [visible, setVisible] = useState(false);

    const clickHandler = async () => {
        try {
            const data = await request(`/api/comments/delete/${comment._id}`, 'DELETE', null, {
                'Authorization': `Bearer ${token}`,
            });
            message(data.message)
            setVisible(false);
            shouldRerender(true);
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <div className="comment-container">
            <div className="profile-picture">
                <img src={comment.authorProfilePic} alt="profile" />
            </div>
            <div className="comment">
                <div className="comment-author">{comment.authorUsername}</div>
                <div className="comment-content">
                    {comment.text}
                </div>
            </div>
            {(comment.author === userId) && (
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
    )
}
