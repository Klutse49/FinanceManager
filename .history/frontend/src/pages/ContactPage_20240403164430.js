import React, { useState } from 'react';

const ContactPage = () => {
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement sending data to the backend
        console.log(contactForm);
        alert('Thank you for your message. We will get back to you shortly.');
    };

    return (
        <div>
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={contactForm.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={contactForm.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Message:</label>
                    <textarea name="message" value={contactForm.message} onChange={handleChange} required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ContactPage;
