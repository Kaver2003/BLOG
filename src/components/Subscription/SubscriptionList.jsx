import { useAuth } from '../../context/AuthContext';

export default function SubscriptionList() {
    const { currentUser, users, updateUser } = useAuth();

    const handleSubscribe = (username) => {
        if (!currentUser) return;

        const isSubscribed = currentUser.subscriptions.includes(username);
        const updatedSubscriptions = isSubscribed
            ? currentUser.subscriptions.filter(u => u !== username)
            : [...currentUser.subscriptions, username];

        const updatedUser = {
            ...currentUser,
            subscriptions: updatedSubscriptions,
        };

        updateUser(updatedUser);
    };

    return (
        <div className="subscriptions">
            <h2>Все пользователи</h2>
            {users
                .filter(u => u.username !== currentUser?.username)
                .map(user => (
                    <div key={user.username} className="user-item">
                        <span>{user.username}</span>
                        <button
                            onClick={() => handleSubscribe(user.username)}
                            className={`button ${currentUser?.subscriptions.includes(user.username) ? 'unsubscribe' : 'subscribe'}`}
                        >
                            {currentUser?.subscriptions.includes(user.username) ? '✓ Подписан' : 'Подписаться'}
                        </button>
                    </div>
                ))}
        </div>
    );
}