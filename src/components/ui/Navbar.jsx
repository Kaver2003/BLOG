import {Link} from 'react-router-dom';
import {useAuth} from '../../contex/AuthContext';

export default function Navbar() {
    const {currentUser, logout} = useAuth();

    return (
        <nav>
            <div className="nav-left">
                <Link to="/">Главная</Link>
                {currentUser && <Link to="/subscriptions">Подписки</Link>}
            </div>

            <div className="nav-right">
                {currentUser ? (
                    <>
                        <span>Привет, {currentUser.username}!</span>
                        <button onClick={logout}>Выйти</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Вход</Link>
                        <Link to="/register">Регистрация</Link>
                    </>
                )}
            </div>
        </nav>
    );
}