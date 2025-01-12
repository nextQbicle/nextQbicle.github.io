import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';
import { Link } from 'react-router-dom';
import './Home.css'

function Home() {
    const { logout, user } = useUserAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <div className='home-container'>
            <h2>Welcome, {user?.name}</h2>
            {user?.role === 'verification' || user?.role.includes('admin') ? (
                <Link to="/verification-dashboard">Verification Dashboard</Link>
            ) : null}

            {user?.role === 'document_upload' || user?.role.includes('admin') ? (
                <Link to="/document-upload-dashboard">Document Upload Dashboard</Link>
            ) : null}

            {user?.role === 'super_admin' &&
                <Link to="/signup">Add new user</Link>
            }

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;
