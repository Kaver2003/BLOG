import {useState} from 'react';
import {useAuth} from '../../contex/AuthContext';

export default function Login() {
    const {login} = useAuth();
    const [form, setForm] = useState({username: '', password: ''});

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!login(form.username, form.password)) {
            alert('Ошибка входа!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={form.username}
                onChange={(e) => setForm(p => ({...p, username: e.target.value}))}
                placeholder="Логин"
            />
            <input
                type="password"
                value={form.password}
                onChange={(e) => setForm(p => ({...p, password: e.target.value}))}
                placeholder="Пароль"
            />
            <button type="submit">Войти</button>
        </form>
    );
}