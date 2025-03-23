import {useState} from 'react';
import {useAuth} from '../../contex/AuthContext';
import PostItem from './PostItem';
import PostEditor from './PostEditor';

export default function PostList() {
    const {currentUser, posts} = useAuth();
    const [editingPost, setEditingPost] = useState(null);
    const [filterTag, setFilterTag] = useState('');

    const filteredPosts = posts.filter(post => {
        const isVisible = post.isPublic ||
            post.author === currentUser?.username ||
            currentUser?.subscriptions.includes(post.author);

        return isVisible && (filterTag ? post.tags.includes(filterTag) : true);
    });

    const allTags = [...new Set(posts.flatMap(p => p.tags))];

    return (
        <div className="post-list">
            <div className="filters">
                <select
                    value={filterTag}
                    onChange={(e) => setFilterTag(e.target.value)}
                >
                    <option value="">Все теги</option>
                    {allTags.map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                    ))}
                </select>
            </div>

            {editingPost ? (
                <PostEditor
                    post={editingPost}
                    onSave={() => setEditingPost(null)}
                />
            ) : (
                filteredPosts.map(post => (
                    <PostItem
                        key={post.id}
                        post={post}
                        onEdit={setEditingPost}
                        onDelete={() => {/* Реализуйте удаление в контексте */
                        }}
                    />
                ))
            )}
        </div>
    );
}