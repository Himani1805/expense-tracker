import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { useTransactions } from '../../context/TransactionContext';
import { CATEGORIES } from '../../data/categories';
import './AddTransaction.css';

/**
 * Screen 03: Precision Transaction Input Engine.
 * Implements type="text" translation to bypass persistent browser arrow bugs seamlessly.
 */
export function AddTransaction() {
    const navigate = useNavigate();
    const { addTransaction } = useTransactions();

    const dateInputRef = useRef(null);
    const noteInputRef = useRef(null);

    const [type, setType] = useState('expense');
    const [amount, setAmount] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Shopping');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [note, setNote] = useState('');
    const [validationError, setValidationError] = useState('');

    const handleAmountTextValidation = (e) => {
        const rawValue = e.target.value;

        // Strict evaluation matching standard decimal strings and digits formatting rules only
        if (rawValue === '' || /^\d*\.?\d*$/.test(rawValue)) {
            setAmount(rawValue);
            if (validationError) setValidationError('');
        }
    };

    const handleSaveCommit = (e) => {
        e.preventDefault();

        if (!amount || Number(amount) <= 0) {
            setValidationError('Please enter a valid computational total.');
            return;
        }

        const payloadObject = {
            id: Date.now(),
            type,
            amount: parseFloat(amount),
            category: selectedCategory,
            note: note.trim() || selectedCategory,
            date
        };

        addTransaction(payloadObject);
        navigate('/');
    };

    const triggerDatePicker = () => {
        if (dateInputRef.current) {
            dateInputRef.current.showPicker();
        }
    };

    const triggerNoteFocus = () => {
        if (noteInputRef.current) {
            noteInputRef.current.focus();
        }
    };

    return (
        <div className="add-transaction-page">
            <Header title="Add Transaction" showProfile={true} isClosable={true} onClose={() => navigate('/')} />

            <form onSubmit={handleSaveCommit} className="add-transaction-form-body">

                {/* Toggle Expense / Income Option Panel */}
                <div className="toggle-pill-capsule">
                    <button
                        type="button"
                        className={`pill-btn ${type === 'expense' ? 'active' : ''}`}
                        onClick={() => setType('expense')}
                    >
                        EXPENSE
                    </button>
                    <button
                        type="button"
                        className={`pill-btn ${type === 'income' ? 'active' : ''}`}
                        onClick={() => setType('income')}
                    >
                        INCOME
                    </button>
                </div>

                {/* Amount Parameter Section */}
                <div className="amount-input-deck">
                    <span className="structural-amount-indicator-label">AMOUNT</span>
                    <div className="numeric-row-align">
                        <span className="currency-prefix">$</span>
                        <input
                            type="text"
                            inputMode="decimal"
                            placeholder="0.00"
                            value={amount}
                            onChange={handleAmountTextValidation}
                            className="massive-amount-field"
                            autoFocus
                        />
                    </div>
                </div>
                {validationError && <p className="inline-form-error">{validationError}</p>}

                {/* Dynamic Matrix Container */}
                <div className="category-grid-section">
                    <h5 className="grid-label-caption">CATEGORY</h5>
                    <div className="icon-matrix-grid-frame">
                        {CATEGORIES.map((cat) => {
                            const isSelected = selectedCategory.toLowerCase() === cat.label.toLowerCase() ||
                                selectedCategory.toLowerCase() === cat.id.toLowerCase();
                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    className={`grid-icon-cell ${isSelected ? 'selected' : ''}`}
                                    onClick={() => setSelectedCategory(cat.label)}
                                >
                                    <div className="cell-icon-wrap">
                                        <span className="material-symbols-outlined matrix-raw-icon">{cat.icon}</span>
                                    </div>
                                    <span className="cell-text-label">{cat.id.toUpperCase()}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Form Interactive Stack Inputs */}
                <div className="meta-inputs-vertical-stack">
                    <div className="input-row-group clickable-form-row" onClick={triggerDatePicker}>
                        <label className="row-input-caption">DATE</label>
                        <div className="interactive-input-row-container">
                            <input
                                type="date"
                                ref={dateInputRef}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="native-date-selector"
                            />
                            <span className="material-symbols-outlined interactive-field-decorator-icon single-gray-icon">calendar_today</span>
                        </div>
                    </div>

                    <div className="input-row-group clickable-form-row" onClick={triggerNoteFocus}>
                        <label className="row-input-caption">NOTE</label>
                        <div className="interactive-input-row-container">
                            <input
                                type="text"
                                ref={noteInputRef}
                                placeholder="Add a description..."
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="inline-note-field"
                            />
                            <span className="material-symbols-outlined interactive-field-decorator-icon single-gray-icon">notes</span>
                        </div>
                    </div>
                </div>

                {/* Restored High-Quality Notebook Graphic Vector Card Overlay */}
                <div className="decorative-bottom-media-card">
                    <img
                        src="https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&auto=format&fit=crop&q=60"
                        alt="Notebook concept composition asset"
                        className="notebook-render-graphic-img"
                    />
                </div>

                {/* Submit Commit Action Bar Footer */}
                <div className="form-submit-anchor">
                    <button type="submit" className="solid-action-submit-btn">
                        Save Transaction
                    </button>
                </div>
            </form>
        </div>
    );
}