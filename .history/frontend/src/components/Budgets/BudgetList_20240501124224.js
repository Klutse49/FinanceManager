import React, { useState } from 'react';

function BudgetList() {
    const [budgets, setBudgets] = useState([
        { 
            _id: 1, 
            category: 'Food', 
            limit: 500, 
            items: [
                { name: 'Groceries', amount: 200 },
                { name: 'Dining out', amount: 100 }
            ]
        },
        { 
            _id: 2, 
            category: 'Entertainment', 
            limit: 300, 
            items: [
                { name: 'Movies', amount: 50 },
                { name: 'Concerts', amount: 100 }
            ]
        },
        { 
            _id: 3, 
            category: 'Utilities', 
            limit: 400, 
            items: [
                { name: 'Electricity', amount: 150 },
                { name: 'Water', amount: 100 }
            ]
        }
    ]);
    const [newItem, setNewItem] = useState({ name: '', amount: '' });

    const handleDelete = (id) => {
        setBudgets(budgets.filter(budget => budget._id !== id));
    };

    const handleUpdate = (id, updatedBudget) => {
        setBudgets(budgets.map(budget => budget._id === id ? updatedBudget : budget));
    };

    const handleAddItem = (budgetId) => {
        setBudgets(budgets.map(budget => {
            if (budget._id === budgetId) {
                return { ...budget, items: [...budget.items, newItem] };
            }
            return budget;
        }));
        // Clear the newItem state after adding the item
        setNewItem({ name: '', amount: '' });
    };

    return (
        <div>
            <h3>Budgets</h3>
            {budgets.map((budget) => (
                <div key={budget._id}>
                    <h4>{budget.category}: ${budget.limit}</h4>
                    <ul>
                        {budget.items.map((item, index) => (
                            <li key={index}>{item.name}: ${item.amount}</li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        placeholder="Item name"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Item amount"
                        value={newItem.amount}
                        onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })}
                    />
                    <button onClick={() => handleAddItem(budget._id)}>Add Item</button>
                    <button onClick={() => handleDelete(budget._id)}>Delete</button>
                    <button onClick={() => handleUpdate(budget._id, { ...budget, limit: budget.limit + 100 })}>Increase Limit</button>
                </div>
            ))}
        </div>
    );
}

export default BudgetList;
