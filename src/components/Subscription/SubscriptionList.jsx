import {useAuth} from "../../contex/AuthContext";

export default function SubscriptionList() {
    const {currentUser, users, updateUser} = useAuth(); // Добавьте updateUser в контекст

    const handleSubscribe = (username) => {
        const updatedUser = {
            ...currentUser,
            subscriptions: currentUser.subscriptions.includes(username)
                ? currentUser.subscriptions.filter(u => u !== username)
                : [...currentUser.subscriptions, username]
        };

        updateUser(updatedUser);
    };

    return (
        <div className="subscriptions">
            <h2>Все пользователи</h2>
            {users
                .filter(u => u.username !== currentUser.username)
                .map(user => (
                    <div key={user.username} className="user-item">
                        <span>{user.username}</span>
                        <button
                            onClick={() => handleSubscribe(user.username)}
                            className={currentUser.subscriptions.includes(user.username) ? 'unsubscribe' : ''}
                        >
                            {currentUser.subscriptions.includes(user.username) ? '✓ Подписан' : 'Подписаться'}
                        </button>
                    </div>
                ))}
        </div>
    );
}