import React, { useState } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';

function ContactPage() {
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isValidEmail = email => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValidEmail(contactForm.email)) {
            setError('Please enter a valid email address.');
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/contact', contactForm);
            console.log('Form submitted successfully:', response.data);
            setContactForm({ name: '', email: '', message: '' });
            setSuccess('Thank you for your message. We will get back to you shortly.');
            setError('');
        } catch (error) {
            console.error('Error submitting form:', error);
            setError('Failed to send message. Please try again later.');
            setSuccess('');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="contact-container">
            <BackButton />
            <h1>Contact Me</h1>
            <p>If you have any questions about the project or would like to get in touch, feel free to contact me using the form below or through any of the following channels.</p>

            <h2>Email</h2>
            <p>klutse49@students.rowan.edu</p>

            <h2>Follow Me</h2>
            <ul>
                <li><a href="https://linkedin.com/in/yourprofile">LinkedIn</a></li>
                <li><a href="https://github.com/klutse49">GitHub</a></li>
                <li><a href="https://twitter.com/cyrilklutse">Twitter</a></li>
            </ul>

            <h2>Contact Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={contactForm.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={contactForm.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
            </form>
        </div>
    );
}

export default ContactPage;
