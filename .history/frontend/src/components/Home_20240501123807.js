import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Ensure the path matches where your AuthContext is located

function Home() {
    const { user } = useAuth(); // Using the auth context to check if the user is logged in

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to Our Website</h1>
            {user ? (
                <p>Welcome back, {user.username}! What would you like to do today?</p>
            ) : (
                <p>Please <Link to="/login">log in</Link> or <Link to="/register">register</Link> to continue.</p>
            )}
            <div>
                <Link to="/about" style={{ marginRight: '10px' }}>About Us</Link>
                <Link to="/contact" style={{ marginRight: '10px' }}>Contact</Link>
                {user && <Link to="/dashboard">Dashboard</Link>}
            </div>
        </div>
    );
}

export default Home;
