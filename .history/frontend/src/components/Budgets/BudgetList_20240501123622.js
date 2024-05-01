import React, { useState } from 'react';

function BudgetList() {
    const [budgets, setBudgets] = useState([
        { _id: 1, category: 'Food', limit: 500 },
        { _id: 2, category: 'Entertainment', limit: 300 },
        { _id: 3, category: 'Utilities', limit: 400 }
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = (id) => {
        setBudgets(budgets.filter(budget => budget._id !== id));
    };

    const handleUpdate = (id, updatedBudget) => {
        setBudgets(budgets.map(budget => budget._id === id ? updatedBudget : budget));
    };

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
        </div>
    );
}

export default BudgetList;
