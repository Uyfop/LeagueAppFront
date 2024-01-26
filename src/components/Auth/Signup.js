import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

const Signup = ({ onSignup }) => {
    const [signupCredentials, setSignupCredentials] = useState({
        email: '',
        password: '',
        userType: 'NORMAL_USER',
    });
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupCredentials),
            });

            if (response.ok) {
                console.log('User registered successfully!');
                navigate('/login');
            } else {
                console.error(`Error during signup: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };


    return (
        <>
            <label>
                Email:
                <input
                    type="text"
                    value={signupCredentials.email}
                    onChange={(e) => setSignupCredentials({ ...signupCredentials, email: e.target.value })}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={signupCredentials.password}
                    onChange={(e) => setSignupCredentials({ ...signupCredentials, password: e.target.value })}
                />
            </label>
            {/* You can remove the input for userType if you want it to always be "NORMAL_USER" */}
            {/* <label>
                UserType:
                <input
                    type="text"
                    value={signupCredentials.userType}
                    onChange={(e) => setSignupCredentials({ ...signupCredentials, userType: e.target.value })}
                />
            </label> */}
            <button onClick={handleSignup}>Signup</button>
        </>
    );
};

export default Signup;
