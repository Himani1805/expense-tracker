import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Create context for state management
const TransactionContext = createContext();

/**
 * Reducer function managing centralized transaction actions
 * Ensures predictable state mutations for addition, editing, and deletion
 */
function transactionReducer(state, action) {
    switch (action.type) {
        case 'ADD_TRANSACTION':
            // New transactions are prepended to appear at the top of the feed
            return [action.payload, ...state];

        case 'EDIT_TRANSACTION':
            return state.map(item => item.id === action.payload.id ? action.payload : item);

        case 'DELETE_TRANSACTION':
            return state.filter(item => item.id !== action.payload);

        default:
            return state;
    }
}

/**
 * Context Provider wrapping the component tree
 * Bridges the gap between state management and persistent storage
 */
export function TransactionProvider({ children }) {
    // Fetch previously stored transactions on load
    const [persistedTransactions, setPersistedTransactions] = useLocalStorage('transactions', []);

    // Initialize data layer state
    const [transactions, dispatch] = useReducer(transactionReducer, persistedTransactions);

    // Sync state changes back to localStorage automatically
    useEffect(() => {
        setPersistedTransactions(transactions);
    }, [transactions, setPersistedTransactions]);

    // Direct action wrappers to simplify component interaction
    const addTransaction = (transaction) => {
        dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    };

    const editTransaction = (transaction) => {
        dispatch({ type: 'EDIT_TRANSACTION', payload: transaction });
    };

    const deleteTransaction = (id) => {
        dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    };

    return (
        <TransactionContext.Provider value={{ transactions, addTransaction, editTransaction, deleteTransaction }}>
            {children}
        </TransactionContext.Provider>
    );
}

// Named hook for cleaner context consumption inside application pages
export function useTransactions() {
    const context = useContext(TransactionContext);
    if (!context) {
        throw new Error('useTransactions must be used within a TransactionProvider');
    }
    return context;
}