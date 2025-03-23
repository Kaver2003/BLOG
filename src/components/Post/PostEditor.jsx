import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function PostEditor({ post }) {
    const { currentUser, createPost, updatePost } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: post?.title || '',
        content: post?.content || '',
        tags: post?.tags?.join(',') || '',
        isPublic: post?.isPublic || false
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPost = {
            ...post,
            id: post?.id || Date.now(),
            author: currentUser.username,
            title: form.title,
            content: form.content,
            tags: form.tags.split(',').map(t => t.trim()),
            isPublic: form.isPublic,
            comments: post?.comments || [],
            createdAt: post?.createdAt || new Date().toISOString(), // Добавляем дату создания
        };

        if (post) {
            updatePost(newPost);
        } else {
            createPost(newPost);
        }

        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit} className="post-editor">
            <input
                value={form.title}
                onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))}
                placeholder="Заголовок"
                className="post-editor-input"
                required
            />
            <textarea
                value={form.content}
                onChange={(e) => setForm(p => ({ ...p, content: e.target.value }))}
                placeholder="Содержание"
                className="post-editor-textarea"
                required
            />
            <input
                value={form.tags}
                onChange={(e) => setForm(p => ({ ...p, tags: e.target.value }))}
                placeholder="Теги через запятую"
                className="post-editor-input"
            />
            <label className="post-editor-checkbox">
                <input
                    type="checkbox"
                    checked={form.isPublic}
                    onChange={(e) => setForm(p => ({ ...p, isPublic: e.target.checked }))}
                />
                Публичный пост
            </label>
            <button type="submit" className="button save-button">
                Сохранить
            </button>
        </form>
    );
}