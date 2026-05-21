import React from 'react';
import './EmptyState.css';

/**
 * Reusable empty state fallback view for clear UX.
 */
export function EmptyState({ message = "No transactions found yet." }) {
    return (
        <div className="empty-state-container">
            <span className="material-symbols-outlined empty-state-icon">receipt_long</span>
            <p className="empty-state-text">{message}</p>
        </div>
    );
}