import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  

function Home() {
    const { user } = useAuth(); 
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formattedDateTime = dateTime.toLocaleString();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to the Personal Finance Manager</h1>
            <p>Current Date and Time: {formattedDateTime}</p>
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
