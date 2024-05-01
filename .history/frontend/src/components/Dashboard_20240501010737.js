import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import styles from '../styles/Dashboard.module.css';
import BackButton from '../components/BackButton';
import BudgetList from '../components/Budgets/BudgetList';

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
            {user && <div>
              <p>Welcome, {user.username}!</p>
              <
              {/* Example notification icon */}
              <div className={styles.notifications}>
                <span className={styles.notificationIcon}>🔔</span>
              </div>
            </div>}  
            <nav className={styles.nav}>
                <Link to="/" className={styles.link}>Home</Link>
                <Link to="/transactions" className={styles.link}>Transaction History</Link>
                <Link to="/budget" className={styles.link}>Budget List</Link>
                <Link to="/settings" className={styles.link}>Settings</Link>
                <Link to="/profile" className={styles.link}>Profile</Link> {/* New Profile Link */}
                <button onClick={handleLogout} className={styles.button}>Logout</button>
            </nav>
        </div>
    );
};

export default Dashboard;
