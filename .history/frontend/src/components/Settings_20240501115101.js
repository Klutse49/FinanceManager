import React, { useState } from 'react';
import axios from 'axios';
import { useAuthToken } from '../services/authService'; 
import { useAuth } from '../../context/AuthContext';
import BackButton from '../components/BackButton';

function Settings() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [token] = useAuthToken(); 

    const handleChangePassword = async (event) => {
        event.preventDefault();

        if (!password) {
            setError('Password cannot be empty');
            return;
        }

        setError('');
        setSuccess('');

        try {
            const apiUrl = process.env.REACT_APP_API_URL || 'http://your-api-url.com';
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, credentials);

            await axios.post(`${apiUrl}/user/updatePassword`, { newPassword: password }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setPassword('');
            setSuccess('Password updated successfully!');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to update password');
        }
    };

    return (
        <div>
            <BackButton /> {/* Add the BackButton at the top of the settings */}
            <h1>Settings</h1>
            <form onSubmit={handleChangePassword}>
                <div>
                    <label>
                        New Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            required
                        />
                    </label>
                </div>
                <button type="submit">Change Password</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
            </form>
        </div>
    );
}

export default Settings;
