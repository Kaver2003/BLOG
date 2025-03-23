import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', password: '', error: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!register(form.username, form.password)) {
            setForm(p => ({ ...p, error: 'Логин уже занят' }));
        } else {
            navigate('/login');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2 className="auth-title">Регистрация</h2>
            {form.error && <div className="auth-error">{form.error}</div>}
            <input
                value={form.username}
                onChange={(e) => setForm(p => ({ ...p, username: e.target.value }))}
                placeholder="Логин"
                className="comment-input"
                required
            />
            <input
                type="password"
                value={form.password}
                onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))}
                placeholder="Пароль"
                className="comment-input"
                required
            />
            <button type="submit" className="button auth-button">
                Зарегистрироваться
            </button>
        </form>
    );
}