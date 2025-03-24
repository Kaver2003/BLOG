import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Изменили здесь
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/ui/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PostList from './components/Post/PostList';
import PostEditor from './components/Post/PostEditor';
import SubscriptionList from './components/Subscription/SubscriptionList';

function App() {
    return (
        <Router> {/* Теперь используется HashRouter */}
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<PostList />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/create-post" element={<PostEditor />} />
                    <Route path="/edit-post/:id" element={<PostEditor />} />
                    <Route path="/subscriptions" element={<SubscriptionList />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;