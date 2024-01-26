const Signup = ({ onSignup }) => {
    const [signupCredentials, setSignupCredentials] = useState({ email: '', password: '' });

    const handleSignup = async () => {
        // Your signup logic here
        onSignup(signupCredentials);
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
            <button onClick={handleSignup}>Signup</button>
        </>
    );
};
