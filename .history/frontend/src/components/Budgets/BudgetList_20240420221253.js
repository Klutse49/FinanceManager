import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = '/api/budgets/';

function BudgetList() {
    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBudgets();
    }, []);

    const fetchBudgets = async () => {
        try {
            const response = await axios.get(API_URL);
            setBudgets(response.data);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch budgets');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}${id}`);
            setBudgets(budgets.filter(budget => budget._id !== id));
        } catch (error) {
            console.error('Failed to delete budget:', error);
        }
    };

    const handleAdd = async (budget) => {
        try {
            const response = await axios.post(API_URL, budget);
            setBudgets([...budgets, response.data]);
        } catch (error) {
            console.error('Failed to add budget:', error);
        }
    };

    const handleUpdate = async (id, updatedBudget) => {
        try {
            const response = await axios.put(`${API_URL}${id}`, updatedBudget);
            setBudgets(budgets.map(budget => budget._id === id ? response.data : budget));
        } catch (error) {
            console.error('Failed to update budget:', error);
        }
    };

    if (loading) return <p>Loading budgets...</p>;
    if (error) return <p>Error loading budgets: {error}</p>;

    return (
        <div>
            <h3>Budgets</h3>
            {budgets.map((budget) => (
                <div key={budget._id}>
                    <span>{budget.category}: ${budget.limit}</span>
                    <button onClick={() => handleDelete(budget._id)}>Delete</button>
                    <button onClick={() => handleUpdate(budget._id, { ...budget, limit: budget.limit + 100 })}>Increase Limit</button>
                </div>
            ))}
            <button onClick={() => handleAdd({ category: 'New Category', limit: 200 })}>Add Budget</button>
        </div>
    );
}

export default BudgetList;
