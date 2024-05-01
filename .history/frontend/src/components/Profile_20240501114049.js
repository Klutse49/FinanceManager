import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    bio: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch user data from the server
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get('/api/user/'); 
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/user/update', user); // Adjust API endpoint as necessary
      console.log('Profile updated successfully:', response.data);
      setEditMode(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>User Profile</h1>
      {!editMode ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Bio: {user.bio || 'Not provided'}</p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleInputChange}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />

          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={user.bio}
            onChange={handleInputChange}
          ></textarea>

          <button type="submit">Save Changes</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default Profile;
