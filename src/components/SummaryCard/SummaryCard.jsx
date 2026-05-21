import React from 'react';
import './SummaryCard.css';
import { formatCurrency } from '../../utils/formatCurrency';

/**
 * Reusable card to show aggregated metrics (Income/Expense blocks)
 */
export function SummaryCard({ type, amount }) {
    const isIncome = type === 'income';

    return (
        <div className="summary-card">
            <div className="summary-meta">
                <span className={`summary-arrow ${isIncome ? 'arrow-down' : 'arrow-up'}`}>
                    {isIncome ? '↓' : '↑'}
                </span>
                <span className="summary-label">{isIncome ? 'INCOME' : 'EXPENSES'}</span>
            </div>
            <h3 className="summary-amount">{formatCurrency(amount).replace('.00', '')}</h3>
        </div>
    );
}