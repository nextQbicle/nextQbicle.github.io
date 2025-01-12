import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useUserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true)
        try {
            await login(email, password);
            navigate("/home");
        } catch (e) {
            console.log(e.message);
            setError("Wrong username or password.")
        }
        setLoading(false);
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" name="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}

export default Login;
