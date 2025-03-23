import {useAuth} from '../../contex/AuthContext';

export default function PostItem({post, onEdit, onDelete}) {
    const {currentUser} = useAuth();

    return (
        <div className="post">
            <h3>
                {post.title}
                {!post.isPublic && ' 🔒'}
            </h3>
            <p>Автор: {post.author}</p>
            <div>{post.content}</div>
            <div>
                {post.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                ))}
            </div>

            {currentUser?.username === post.author && (
                <div>
                    <button onClick={() => onEdit(post)}>Изменить</button>
                    <button onClick={() => onDelete(post.id)}>Удалить</button>
                </div>
            )}
        </div>
    );
}