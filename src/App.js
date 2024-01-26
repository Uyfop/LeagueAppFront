import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from "./components/HomePage.js";
import ChampionPage from "./components/Champion/ChampionPage.js";
import MainNav from "./components/MainNav.js";
import {AuthProvider} from "./services/AuthProvider.js";
import Signup from "./components/Auth/Signup.js";
import Login from "./components/Auth/Login.js";
import AbilitiesPage from "./components/abilities/AbilitiesPage.js"

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <MainNav />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/champions" element={<ChampionPage/>} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/abilities" element={<AbilitiesPage/>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
