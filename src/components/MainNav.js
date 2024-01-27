import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MainNav.css';
import { useAuth } from '../services/AuthProvider.js';

const MainNav = () => {
    const { isAuthenticated, logout } = useAuth();

    useEffect(() => {
    }, [isAuthenticated]);

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="main-nav">
            <ul className="nav-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/champions">Champions</Link>
                </li>
                <li>
                    <Link to="/abilities">Abilities</Link>
                </li>
                <li>
                    <Link to="/items">Items</Link>
                </li>
                <li>
                    <Link to="/builds">Builds</Link>
                </li>
                {isAuthenticated ? (
                    <li className="nav-login">
                        <Link to="/" onClick={handleLogout}>Logout</Link>
                    </li>
                ) : (
                    <>
                        <li className="nav-login">
                            <Link to="/signup">Signup</Link>
                        </li>
                        <li className="nav-login">
                            <Link to="/login">Login</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default MainNav;
