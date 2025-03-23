import {useState} from 'react';
import {useAuth} from '../../context/AuthContext';

export default function CommentSection({post}) {
    const {currentUser, updatePost} = useAuth();
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (!newComment.trim()) return;

        const updatedPost = {
            ...post,
            comments: [
                ...post.comments,
                {
                    author: currentUser.username,
                    text: newComment,
                    date: new Date().toISOString()
                }
            ]
        };

        updatePost(updatedPost);
        setNewComment('');
    };

    return (
        <div className="comments">
            <h4>Комментарии ({post.comments.length})</h4>

            <div className="comment-list">
                {post.comments.map((comment, index) => (
                    <div key={index} className="comment">
                        <strong>{comment.author}:</strong>
                        <p>{comment.text}</p>
                        <small>{new Date(comment.date).toLocaleString()}</small>
                    </div>
                ))}
            </div>

            {currentUser && (
                <div className="comment-form">
          <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Напишите комментарий..."
          />
                    <button onClick={handleAddComment}>Отправить</button>
                </div>
            )}
        </div>
    );
}