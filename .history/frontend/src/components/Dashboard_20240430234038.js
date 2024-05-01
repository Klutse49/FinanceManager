import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import styles from '../styles/Dashboard.module.css';
import BackButton from '../components/BackButton';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); 
        navigate('/'); 
    };

    return (
        <div className={styles.dashboard}>
            <BackButton />
            <h2>Dashboard</h2>
            {user && <MyCalendar userId={user._id} />}
            {user && <p>Welcome, {user.username}!</p>}  
            <nav className={styles.nav}>
                <Link to="/" className={styles.link}>Home</Link>
                <Link to="/transactions" className={styles.link}>Transaction History</Link>
                <Link to="/settings" className={styles.link}>Settings</Link>
                <button onClick={handleLogout} className={styles.button}>
                    Logout
                </button>
            </nav>
        </div>
    );
};

export default Dashboard;
