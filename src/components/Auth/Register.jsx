import {useState} from 'react';
import {useAuth} from '../../contex/AuthContext';
import {useNavigate} from 'react-router-dom';

export default function Register() {
    const {register} = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        password: '',
        error: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!register(form.username, form.password)) {
            setForm(p => ({...p, error: 'Логин уже занят'}));
        } else {
            navigate('/login');
        }
    };

    return (
        <div>
            <h2>Регистрация</h2>
            {form.error && <div className="error">{form.error}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    value={form.username}
                    onChange={(e) => setForm(p => ({...p, username: e.target.value}))}
                    placeholder="Логин"
                    required
                />
                <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm(p => ({...p, password: e.target.value}))}
                    placeholder="Пароль"
                    required
                />
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    );
}