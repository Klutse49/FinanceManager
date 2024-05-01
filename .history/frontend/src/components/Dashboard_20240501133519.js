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
            <div className={styles.header}>
                <h2 className={styles.title}>Welcome, {user.username}!</h2>
                <div className={styles.notifications}>
                    <span className={styles.notificationIcon}>🔔</span>
                    <span className={styles.notificationCount}>3</span> {/* Example notification count */}
                </div>
            </div>
            <nav className={styles.nav}>
                <Link to="/" className={styles.link}>Home</Link>
                <Link to="/transactions" className={styles.link}>Transactions</Link>
                <Link to="/budget" className={styles.link}>Budget</Link>
                <Link to="/settings" className={styles.link}>Settings</Link>
                <Link to="/profile" className={styles.link}>Profile</Link>
                <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
            </nav>
        </div>
    );
};

export default Dashboard;
