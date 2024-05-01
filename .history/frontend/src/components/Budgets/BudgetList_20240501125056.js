import React, { useState } from 'react';
import BackButton from '..;


function BudgetList() {
    const [budgets, setBudgets] = useState([
        { 
            _id: 1, 
            category: 'Food', 
            limit: 500, 
            items: [
                { id: 1, name: 'Groceries', amount: 200 },
                { id: 2, name: 'Dining out', amount: 100 }
            ]
        },
        { 
            _id: 2, 
            category: 'Entertainment', 
            limit: 300, 
            items: [
                { id: 1, name: 'Movies', amount: 50 },
                { id: 2, name: 'Concerts', amount: 100 }
            ]
        },
        { 
            _id: 3, 
            category: 'Utilities', 
            limit: 400, 
            items: [
                { id: 1, name: 'Electricity', amount: 150 },
                { id: 2, name: 'Water', amount: 100 }
            ]
        }
    ]);
    const [newItem, setNewItem] = useState({ name: '', amount: '' });

    const generateItemId = () => {
        return Date.now(); // You can replace this with a more sophisticated ID generation method if needed
    };

    const handleDeleteItem = (budgetId, itemId) => {
        setBudgets(budgets.map(budget => {
            if (budget._id === budgetId) {
                const updatedItems = budget.items.filter(item => item.id !== itemId);
                return { ...budget, items: updatedItems };
            }
            return budget;
        }));
    };

    const handleUpdate = (id, updatedBudget) => {
        setBudgets(budgets.map(budget => budget._id === id ? updatedBudget : budget));
    };

    const handleAddItem = (budgetId) => {
        const newItemId = generateItemId();
        const newItemObject = { id: newItemId, name: newItem.name, amount: newItem.amount };

        setBudgets(budgets.map(budget => {
            if (budget._id === budgetId) {
                const newItems = [...budget.items, newItemObject];
                return { ...budget, items: newItems };
            }
            return budget;
        }));
        setNewItem({ name: '', amount: '' });
    };

    return (
        <div>
         <BackButton />

            <h3>Budgets</h3>
            {budgets.map((budget) => (
                <div key={budget._id}>
                    <h4>{budget.category}: ${budget.limit}</h4>
                    <ul>
                        {budget.items.map((item) => (
                            <li key={item.id}>{item.name}: ${item.amount}
                                <button onClick={() => handleDeleteItem(budget._id, item.id)}>Delete Item</button>
                            </li>
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
                    <button onClick={() => handleUpdate(budget._id, { ...budget, limit: budget.limit + 100 })}>Increase Limit</button>
                </div>
            ))}
        </div>
    );
}

export default BudgetList;
