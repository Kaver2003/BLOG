import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function PostItem({ post }) {
    const { currentUser, deletePost, updatePost } = useAuth();
    const [isExpanded, setIsExpanded] = useState(false);
    const [newComment, setNewComment] = useState('');

    const contentLimit = 400; // Лимит символов для отображения
    const isLongPost = post.content.length > contentLimit;
    const displayedContent = isExpanded
        ? post.content
        : post.content.slice(0, contentLimit) + (isLongPost ? '...' : '');

    const handleAddComment = () => {
        if (!newComment.trim()) return;

        const updatedPost = {
            ...post,
            comments: [
                ...post.comments,
                {
                    author: currentUser.username,
                    text: newComment,
                },
            ],
        };

        updatePost(updatedPost);
        setNewComment('');
    };

    return (
        <div className="post">
            <h3 className="post-title">
                {post.title}
                {!post.isPublic && ' 🔒'}
            </h3>
            <p className="post-author">Автор: {post.author}</p>
            <div className="post-content">
                {displayedContent}
                {isLongPost && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="expand-button"
                    >
                        {isExpanded ? 'Свернуть' : 'Раскрыть'}
                    </button>
                )}
            </div>
            <div className="post-tags">
                {post.tags && post.tags.length > 0 && (
                    post.tags.map(tag => (
                        tag.trim() && <span key={tag} className="tag">{tag}</span>
                    ))
                )}
            </div>

            {/* Комментарии */}
            <div className="comments-section">
                <h4>Комментарии ({post.comments.length})</h4>
                {post.comments.map((comment, index) => (
                    <div key={index} className="comment">
                        <strong>{comment.author}:</strong> {comment.text}
                    </div>
                ))}
                {currentUser && (
                    <div className="comment-form">
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Напишите комментарий..."
                className="comment-input"
            />
                        <button
                            onClick={handleAddComment}
                            className="button comment-button"
                        >
                            Отправить
                        </button>
                    </div>
                )}
            </div>

            {currentUser?.username === post.author && (
                <div className="post-actions">
                    <Link to={`/edit-post/${post.id}`} className="button edit-button">
                        Редактировать
                    </Link>
                    <button
                        onClick={() => deletePost(post.id)}
                        className="button delete-button"
                    >
                        Удалить
                    </button>
                </div>
            )}
        </div>
    );
}