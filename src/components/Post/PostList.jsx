import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import PostItem from './PostItem';
import { Link } from 'react-router-dom';

export default function PostList() {
    const { posts, currentUser } = useAuth();
    const [selectedTag, setSelectedTag] = useState('');


    const allTags = [
        ...new Set(
            posts
                .flatMap(post => post.tags)
                .filter(tag => tag.trim())
        )
    ];


    const filteredPosts = posts.filter(post => {
        const isVisible =
            post.isPublic ||
            (currentUser && (
                post.author === currentUser.username ||
                currentUser.subscriptions.includes(post.author)
            ));
        return isVisible && (selectedTag ? post.tags.includes(selectedTag) : true);
    });

    return (
        <div className="post-list">
            {/* Фильтр по тегам */}
            <div className="tag-filter">
                <label htmlFor="tag-select">Сортировка по тегам:</label>
                <select
                    id="tag-select"
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="tag-select"
                >
                    <option value="">Все теги</option>
                    {allTags.map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                    ))}
                </select>
            </div>

            {/* Список постов */}
            {filteredPosts.length === 0 ? (
                <div className="empty-state">
                    <h3>Пока нет ни одного поста 😔</h3>
                    <Link to="/create-post" className="cta-button">
                        Создать первый пост
                    </Link>
                </div>
            ) : (
                filteredPosts.map(post => (
                    <PostItem key={post.id} post={post} />
                ))
            )}
        </div>
    );
}