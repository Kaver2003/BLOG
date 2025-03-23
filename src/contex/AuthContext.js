import {createContext, useContext, useEffect, useState} from 'react';

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState(
        JSON.parse(localStorage.getItem('users')) || []
    );
    const [posts, setPosts] = useState(
        JSON.parse(localStorage.getItem('posts')) || []
    );

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('posts', JSON.stringify(posts));
    }, [users, posts]);

    const value = {
        currentUser,
        users,
        posts,
        login: (username, password) => {
            const user = users.find(u => u.username === username && u.password === password);
            if (user) setCurrentUser(user);
            return !!user;
        },
        register: (username, password) => {
            if (users.some(u => u.username === username)) return false;
            setUsers(prev => [...prev, {username, password, subscriptions: []}]);
            return true;
        },
        logout: () => setCurrentUser(null),
        createPost: (post) => setPosts(prev => [...prev, post]),
        updatePost: (updatedPost) => {
            setPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
        },
        deletePost: (postId) => {
            setPosts(prev => prev.filter(p => p.id !== postId));
        },
        updateUser: (updatedUser) => {
            setUsers(prev => prev.map(u => u.username === updatedUser.username ? updatedUser : u));

        }
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);