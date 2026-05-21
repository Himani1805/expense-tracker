import React, { useState, useMemo } from 'react';
import { Header } from '../../components/Header/Header';
import { TransactionItem } from '../../components/TransactionItem/TransactionItem';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { useTransactions } from '../../context/TransactionContext';
import { groupTransactions } from '../../utils/groupTransactions';
import './Transactions.css';

/**
 * Screen 02: Transactions Ledger Feed Manager.
 * Supports horizontal filter capsule runways and inline text search match indexing.
 */
export function Transactions() {
    const { transactions, deleteTransaction } = useTransactions();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Static list configuration derived directly from specifications
    const filteringChips = ['All', 'Food & Dining', 'Shopping', 'Transportation', 'Bills', 'Health'];

    // 1. Process matching queries across reactive data fields
    const filteredTransactions = useMemo(() => {
        return transactions.filter(item => {
            const targetText = `${item.note || ''} ${item.category || ''}`.toLowerCase();
            const matchesSearch = targetText.includes(searchQuery.toLowerCase());

            const matchesCategory = selectedCategory === 'All' ||
                item.category.toLowerCase() === selectedCategory.toLowerCase();

            return matchesSearch && matchesCategory;
        });
    }, [transactions, searchQuery, selectedCategory]);

    // 2. Structural chronological sorting via shared grouping pipeline 
    const sortedTimelineGroups = useMemo(() => {
        return groupTransactions(filteredTransactions);
    }, [filteredTransactions]);

    return (
        <div className="transactions-page">
            <Header />

            {/* Modern Low-Contrast Floating Search Control Container */}
            <div className="search-bar-frame">
                <span className="material-symbols-outlined structural-search-icon">search</span>
                <input
                    type="text"
                    placeholder="Search transactions"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input-element"
                />
            </div>

            {/* Horizontally Scrollable Runway Filtering Module */}
            <div className="chips-scroller-runway">
                <div className="chips-internal-container">
                    {filteringChips.map((categoryLabel) => (
                        <button
                            key={categoryLabel}
                            className={`filter-capsule-btn ${selectedCategory === categoryLabel ? 'capsule-active' : ''}`}
                            onClick={() => setSelectedCategory(categoryLabel)}
                        >
                            {categoryLabel.split(' ')[0]} {/* Keeps labels minimal for 375px mobile optimization */}
                        </button>
                    ))}
                </div>
            </div>

            {/* Dynamic Render Switch for Timeline Feed */}
            <div className="transactions-feed-scroll-viewport">
                {Object.keys(sortedTimelineGroups).length === 0 ? (
                    <EmptyState message="No matching transaction matching your filter parameters." />
                ) : (
                    Object.keys(sortedTimelineGroups).map((dateHeaderLabel) => (
                        <section key={dateHeaderLabel} className="chronological-group-block">
                            <h5 className="timeline-group-header-title">{dateHeaderLabel}</h5>

                            <div className="transactions-composite-list-card">
                                {sortedTimelineGroups[dateHeaderLabel].map((transactionItem) => (
                                    <TransactionItem
                                        key={transactionItem.id}
                                        transaction={transactionItem}
                                        onDelete={deleteTransaction}
                                    />
                                ))}
                            </div>
                        </section>
                    ))
                )}
            </div>
        </div>
    );
}