import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import styles from '../styles/Dashboard.module.css';
import BackButton from '../components/BackButton';
import BudgetList from '../components/Budgets/BudgetList';
import FinanceChart from '../components/FinanceChart';  // Make sure the import path is correct

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Sample data for the FinanceChart, this should eventually come from a real data source
    const chartData = {
        labels: ['Groceries', 'Utilities', 'Entertainment', 'Others'],
        values: [250, 150, 100, 50]
    };

    return (
        <div className={styles.dashboard}>
            <BackButton />
            <h2>Dashboard</h2>
            {user && <div>
                <p>Welcome, {user.username}!</p>
                <BudgetList />
                <FinanceChart data={chartData} />
                <div className={styles.notifications}>
                    <span className={styles.notificationIcon}>🔔</span>
                </div>
            </div>}  
            <nav className={styles.nav}>
                <Link to="/" className={styles.link}>Home</Link>
                <Link to="/transactions" className={styles.link}>Transaction History</Link>
                <Link to="/budget" className={styles.link}>Budget List</Link>
                <Link to="/settings" className={styles.link}>Settings</Link>
                <Link to="/profile" className={styles.link}>Profile</Link>
                <button onClick={handleLogout} className={styles.button}>Logout</button>
            </nav>
        </div>
    );
};

export default Dashboard;
