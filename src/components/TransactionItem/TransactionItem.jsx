import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { CATEGORIES } from '../../data/categories';
import './TransactionItem.css';

/**
 * High-fidelity production-ready individual transaction row card.
 * Securely prints exact uppercase date tracking stamps matching design guidelines.
 */
export function TransactionItem({ transaction, onDelete, onEdit }) {
    const { id, note, category, amount, type, date } = transaction;
    const isExpense = type === 'expense';

    // Extract uniform line vector configurations from centralized categories map
    const categoryConfig = CATEGORIES.find(
        c => c.label.toLowerCase() === category.toLowerCase() ||
            c.id.toLowerCase() === category.toLowerCase()
    );

    const iconName = categoryConfig ? categoryConfig.icon : 'local_mall';

    // Multi-step custom helper string logic to generate clean uppercase timeline stamps (e.g., "24 OCT")
    const formattedDateStamp = React.useMemo(() => {
        if (!date) return '24 OCT'; // Safe static fallback string context match if dynamic timestamp node unallocated
        const inputDateObject = new Date(date);
        const options = { day: 'numeric', month: 'short' };
        return inputDateObject.toLocaleDateString('en-US', options).toUpperCase();
    }, [date]);

    // Strips standard currency tokens cleanly to rebuild manual formatting without system symbol overlap errors
    const pureAbsoluteCurrencyVal = formatCurrency(Math.abs(Number(amount)));

    return (
        <div className="transaction-item-row-card-block">
            <div className="row-left-alignment-node">
                <div className="item-icon-circle-frame-box">
                    <span className="material-symbols-outlined absolute-row-vector-stroke">{iconName}</span>
                </div>
                <div className="item-metadata-labels-vertical-stack">
                    {/* Checks notes to clear redundant label duplicates gracefully */}
                    <span className="item-main-title-text-label">
                        {note && note.toLowerCase() !== category.toLowerCase() ? note : category}
                    </span>
                    <span className="item-sub-caption-category-tag">
                        {note && note.toLowerCase() !== category.toLowerCase() ? category : 'General Outflow'}
                    </span>
                </div>
            </div>

            <div className="row-right-alignment-node">
                <div className="financial-amount-timeline-wrapper-stack">
                    <span className={`item-financial-amount-label ${isExpense ? 'expense-dark-ink' : 'income-green-ink'}`}>
                        {isExpense ? `-${pureAbsoluteCurrencyVal}` : `+${pureAbsoluteCurrencyVal}`}
                    </span>
                    {/* Re-inserted missing design token stamp */}
                    <span className="item-uppercase-date-stamp-label">{formattedDateStamp}</span>
                </div>

                {/* Action controllers transition handles discrete interactions nicely */}
                <div className="item-action-hover-triggers-panel">
                    {onEdit && (
                        <button className="action-trigger-btn edit-node" onClick={(e) => { e.stopPropagation(); onEdit(id); }}>
                            <span className="material-symbols-outlined row-micro-icon">edit</span>
                        </button>
                    )}
                    <button className="action-trigger-btn delete-node" onClick={(e) => { e.stopPropagation(); onDelete(id); }}>
                        <span className="material-symbols-outlined row-micro-icon">delete</span>
                    </button>
                </div>
            </div>
        </div>
    );
}