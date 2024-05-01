import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home'; 
import About from './components/AboutPage';
import ContactPage from './pages/ContactPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TransactionList from './components/Transactions/TransactionList';
import BudgetList from './components/Budgets/BudgetList';
import Settings from './components/Settings';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import FinanceChart from './components/FinanceChart'; // Import the FinanceChart component
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<TransactionList />} />
          <Route path="/budget" element={<BudgetList />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/finance-chart" element={<FinanceChart />} /> {/* New route for the FinanceChart */}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
