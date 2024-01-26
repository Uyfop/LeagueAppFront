import React, { useState } from 'react';
import { useAuth } from '../services/AuthProvider.js';

const Login = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleLogin = async () => {
        // Your login logic here
        onLogin(credentials);
    };

    return (
        <>
            <label>
                Username:
                <input
                    type="text"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
            </label>
            <button onClick={handleLogin}>Login</button>
        </>
    );
};

export default Login;