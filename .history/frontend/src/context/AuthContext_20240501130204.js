// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const verifyUser = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const config = { headers: { Authorization: `Bearer ${token}` } };
                    const response = await axios.get(`${API_URL}/api/users/me`, config);
                    setUser(response.data); // Assuming the response.data contains the user object
                    setError(null);
                } else {
                    throw new Error("No token found");
                }
            } catch (error) {
                console.error('Error verifying token:', error);
                setError(error);
                localStorage.removeItem('token');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        verifyUser();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/api/users/login`, { email, password });
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user); // Assuming the response.data.user contains the user object
            setError(null);
        } catch (error) {
            console.error('Login failed:', error);
            setError(error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user: user || {}, setUser, login, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext)