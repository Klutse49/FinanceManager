import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  

function Home() {
    const { user } = useAuth(); 

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to the Personal Finance Manager</h1>
            {user ? (
                <p>Welcome back, {user.username}! What would you like to do today?</p>
            ) : (
                <div>
                    <div>
                        <Link to="/login" style={{ margin: '10px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', textDecoration: 'none', borderRadius: '5px' }}>Log In</Link>
                        <Link to="/register" style={{ margin: '10px', padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', textDecoration: 'none', borderRadius: '5px' }}>Register</Link>
                    </div>
                </div>
            )}
            <div>
                <Link to="/about" style={{ marginRight: '10px' }}>About Us</Link>
                <Link to="/contact" style={{ marginRight: '10px' }}>Contact</Link>
                 
                {user && <Link to="/dashboard">Dashboard</Link>}
            </div>
            <div style={{ marginTop: '50px', backgroundColor: '#f8d7da', padding: '20px', borderRadius: '10px' }}>
                <h2>Get Started Today!</h2>
                <p>Start managing your personal finances more effectively.</p>
                <Link to="/register" style={{ margin: '10px', padding: '10px 20px', backgroundColor: '#dc3545', color: '#fff', textDecoration: 'none', borderRadius: '5px' }}>Sign Up Now</Link>
            </div>
        </div>
    );
}

export default Home;
