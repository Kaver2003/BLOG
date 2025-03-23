import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
    const { currentUser, logout } = useAuth();

    return (
        <nav className="nav">
            <div className="nav-left">
                <Link to="/" className="nav-brand">
                    Зелененький Блог 🌿
                </Link>
            </div>

            <div className="nav-right">
                {currentUser ? (
                    <>
            <span className="current-user">
              Вы вошли как: <strong>{currentUser.username}</strong>
            </span>
                        <Link to="/create-post" className="button nav-button">
                            ✍️ Новый пост
                        </Link>
                        <Link to="/subscriptions" className="button nav-button">
                            💚 Мои подписки
                        </Link>
                        <button onClick={logout} className="button nav-button logout-button">
                            🚪 Выйти
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="button nav-button">
                            🔑 Войти
                        </Link>
                        <Link to="/register" className="button nav-button">
                            📝 Регистрация
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}