import {useState} from 'react';
import {useAuth} from '../../contex/AuthContext';

export default function PostEditor({post, onSave}) {
    const {currentUser} = useAuth();
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
            comments: post?.comments || []
        };
        onSave(newPost);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={form.title}
                onChange={(e) => setForm(p => ({...p, title: e.target.value}))}
                placeholder="Заголовок"
            />
            <textarea
                value={form.content}
                onChange={(e) => setForm(p => ({...p, content: e.target.value}))}
            />
            <input
                value={form.tags}
                onChange={(e) => setForm(p => ({...p, tags: e.target.value}))}
                placeholder="Теги через запятую"
            />
            <label>
                <input
                    type="checkbox"
                    checked={form.isPublic}
                    onChange={(e) => setForm(p => ({...p, isPublic: e.target.checked}))}
                />
                Публичный пост
            </label>
            <button type="submit">Сохранить</button>
        </form>
    );
}