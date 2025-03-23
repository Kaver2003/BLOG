import {useState} from 'react';
import {useAuth} from '../../context/AuthContext';
import {useNavigate} from 'react-router-dom';

export default function Login() {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({username: '', password: ''});

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!login(form.username, form.password)) {
            alert('Неверный логин или пароль!');
        } else {
            navigate('/');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2 className="auth-title">Вход</h2>
            <input
                value={form.username}
                onChange={(e) => setForm(p => ({...p, username: e.target.value}))}
                placeholder="Логин"
                className="comment-input"
                required
            />
            <input
                type="password"
                value={form.password}
                onChange={(e) => setForm(p => ({...p, password: e.target.value}))}
                placeholder="Пароль"
                className="comment-input"
                required
            />
            <button type="submit" className="button auth-button">
                Войти
            </button>
        </form>
    );
}