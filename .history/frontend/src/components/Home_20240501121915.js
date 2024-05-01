import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  
import Login from '../components'

function Home() {
    const { user } = useAuth(); 

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to the Personal Finance Manager</h1>
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