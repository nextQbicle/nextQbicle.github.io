import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import "./Signup.css";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
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
        <div className="signup-container">
            <h2>Add new user</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} required />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="" selected disabled>--select role--</option>
                    <option value="super_admin">Super Admin</option>
                    <option value="admin">Admin</option>
                    <option value="document_upload">Document upload</option>
                    <option value="verification">Verification</option>
                </select>
                <input type="email" name="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" name="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}

export default Signup;
