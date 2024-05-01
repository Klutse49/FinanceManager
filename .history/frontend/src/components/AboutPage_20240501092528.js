import React from "react";

function AboutPage() {
    const styles = {
        container: {
            fontFamily: 'Arial, sans-serif',
            lineHeight: '1.6',
            padding: '20px',
            maxWidth: '800px',
            margin: 'auto',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        },
        header: {
            textAlign: 'center',
            color: '#333'
        },
        list: {
            listStyleType: 'none',
            paddingLeft: '0'
        },
        listItem: {
            marginBottom: '10px'
        },
        strong: {
            color: '#0056b3'
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>About This Project</h1>
            <p>This project is designed to simplify personal finance management, providing users with tools to track transactions, create budgets, and analyze spending patterns.</p>

            <h2 style={styles.header}>Technologies Used</h2>
            <ul style={styles.list}>
                <li style={styles.listItem}><strong style={styles.strong}>React</strong> - Chosen for its efficient data handling and responsive UI capabilities.</li>
                <li style={styles.listItem}><strong style={styles.strong}>Node.js and Express</strong> - These technologies were used to build a scalable RESTful API, thanks to their extensive middleware support and community resources.</li>
                <li style={styles.listItem}><strong style={styles.strong}>MongoDB</strong> - Selected for its flexibility with document-oriented data, allowing for adaptable data schemas as the project evolves.</li>
                <li style={styles.listItem}><strong style={styles.strong}>Docker</strong> - Used to containerize the application, ensuring consistent environments across development, testing, and production.</li>
                <li style={styles.listItem}><strong style={styles.strong}>JWT</strong> - Used </li>
                <li style={styles.listItem}>strong style={styles.strong}>JWT</strong> -
                <li>JWT - for user authentication</li>
                <li>Axios - for making HTTP requests</li>
            </ul>

            <h2 style={styles.header}>Development Process</h2>
            <p>The development of this project involved agile methodologies, with iterative testing and continuous integration/continuous deployment (CI/CD) practices to ensure quality and efficiency.</p>

            <h2 style={styles.header}>Future Plans</h2>
            <p>Future updates will include more advanced data analytics features and integration with external financial APIs for real-time data syncing.</p>
        </div>
    );
}

export default AboutPage;
