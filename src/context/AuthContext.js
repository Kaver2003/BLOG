import {createContext, useContext, useState, useEffect} from 'react';

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('currentUser')) || null
    );
    const [users, setUsers] = useState(
        JSON.parse(localStorage.getItem('users')) || []
    );
    const [posts, setPosts] = useState(
        JSON.parse(localStorage.getItem('posts')) || [
            {
                id: 1,
                title: "Пример поста",
                content: "Привет! Это Вероника! Если хотите создать новый пост, то для начала зарегистрируйтесь. А дальше, в шапке будет возможность создать новый пост!",
                tags: ["пример", "новости"],
                isPublic: true,
                author: "Админ",
                comments: []
            }
        ]
    );


    useEffect(() => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }, [currentUser]);

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts));
    }, [posts]);


    const updateUser = (updatedUser) => {
        setUsers(prevUsers =>
            prevUsers.map(u => u.username === updatedUser.username ? updatedUser : u)
        );
        if (currentUser?.username === updatedUser.username) {
            setCurrentUser(updatedUser);
        }
    };

    const value = {
        currentUser,
        users,
        posts,
        setPosts,
        login: (username, password) => {
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                setCurrentUser(user);
                return true;
            }
            return false;
        },
        logout: () => {
            setCurrentUser(null);
            localStorage.removeItem('currentUser');
        },
        register: (username, password) => {
            if (users.some(u => u.username === username)) return false;
            const newUser = {username, password, subscriptions: []};
            setUsers(prev => [...prev, newUser]);
            return true;
        },
        createPost: (post) => setPosts(prev => [...prev, post]),
        updatePost: (updatedPost) => {
            setPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
        },
        deletePost: (postId) => {
            setPosts(prev => prev.filter(p => p.id !== postId));
        },
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);