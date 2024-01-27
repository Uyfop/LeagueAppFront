import React, { useState } from 'react';
import { useAuth } from '../../services/AuthProvider.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();
    const handleLogin = async () => {
        console.log(credentials);
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(credentials),
            });

            if (response.ok) {
                const token = await response.text();
                console.log(token);
                login(token);
                console.log(login);
                setCredentials({ email: '', password: '' });
                navigate('/champions');
            } else {
                console.error('Login failed. Status:', response.status);
                const errorText = await response.text();
                console.error('Error details:', errorText);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div>
            <label>
                Email:
                <input
                    type="text"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
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
        </div>
    );
};

export default Login;
