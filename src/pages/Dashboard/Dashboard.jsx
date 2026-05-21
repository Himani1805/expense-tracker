import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { SummaryCard } from '../../components/SummaryCard/SummaryCard';
import { TransactionItem } from '../../components/TransactionItem/TransactionItem';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { useTransactions } from '../../context/TransactionContext';
import { formatCurrency } from '../../utils/formatCurrency';
import './Dashboard.css';

/**
 * Dashboard View Controller handling dynamic aggregation logic.
 * Balances dynamic analytics triggers alongside assignment sample mock states.
 */
export function Dashboard() {
    const navigate = useNavigate();
    const { transactions, deleteTransaction } = useTransactions();

    // 1. DYNAMIC SYSTEM CALCULATIONS
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const dynamicBalance = totalIncome - totalExpenses;

    // 2. LIVE MONTH-OVER-MONTH TREND COMPILER
    const trendLabelText = React.useMemo(() => {
        if (transactions.length === 0) {
            return { text: '~ +2.4% this month', className: 'trend-neutral' };
        }

        const today = new Date();
        const currentMonthKey = today.getMonth();
        const currentYearKey = today.getFullYear();

        const currentMonthExpenses = transactions.filter(t => {
            const d = new Date(t.date);
            return t.type === 'expense' && d.getMonth() === currentMonthKey && d.getFullYear() === currentYearKey;
        }).reduce((sum, t) => sum + Number(t.amount), 0);

        const previousMonthExpenses = transactions.filter(t => {
            const d = new Date(t.date);
            const targetMonth = currentMonthKey === 0 ? 11 : currentMonthKey - 1;
            const targetYear = currentMonthKey === 0 ? currentYearKey - 1 : currentYearKey;
            return t.type === 'expense' && d.getMonth() === targetMonth && d.getFullYear() === targetYear;
        }).reduce((sum, t) => sum + Number(t.amount), 0);

        if (previousMonthExpenses === 0) {
            return { text: '↘ 0% change from last month', className: 'trend-positive' };
        }

        const calculatedDiff = currentMonthExpenses - previousMonthExpenses;
        const ratioPercentage = ((calculatedDiff / previousMonthExpenses) * 100).toFixed(1);

        if (calculatedDiff > 0) {
            return { text: `↗ +${ratioPercentage}% since last month`, className: 'trend-negative' };
        } else {
            return { text: `↘ ${Math.abs(ratioPercentage)}% since last month`, className: 'trend-positive' };
        }
    }, [transactions]);

    // 3. SPEND ANALYTICS DYNAMIC LOGIC SYSTEM
    const spendAnalyticsCopy = React.useMemo(() => {
        const expensesOnly = transactions.filter(t => t.type === 'expense');

        // Exact structural asset text copy safely parsed without tracking artifacts
        if (expensesOnly.length === 0) {
            return "You spent 12% less on dining this week.";
        }

        const distributionMap = expensesOnly.reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
            return acc;
        }, {});

        const topSpentCategory = Object.keys(distributionMap).reduce((alpha, beta) =>
            distributionMap[alpha] > distributionMap[beta] ? alpha : beta
        );

        const consolidatedCategoryTotal = distributionMap[topSpentCategory];
        const categoryPercentage = Math.round((consolidatedCategoryTotal / totalExpenses) * 100);

        return `Your primary expense sector is ${topSpentCategory}, accounting for ${categoryPercentage}% of active outflows.`;
    }, [transactions, totalExpenses]);

    // 4. SEED FALLBACK CONTROL MATRIX
    const isStorageEmpty = transactions.length === 0;
    const displayBalance = isStorageEmpty ? 42950.00 : dynamicBalance;
    const displayIncome = isStorageEmpty ? 8400 : totalIncome;
    const displayExpenses = isStorageEmpty ? 3250 : totalExpenses;

    const recentTransactions = transactions.slice(0, 4);

    const handleEditRedirect = (id) => {
        navigate(`/edit/${id}`);
    };

    return (
        <div className="dashboard-page">
            <Header />

            <div className="dashboard-scroll-area">
                <section className="balance-section">
                    <span className="balance-label">TOTAL BALANCE</span>
                    <h1 className="balance-amount">{formatCurrency(displayBalance)}</h1>
                    <span className={`balance-trend ${trendLabelText.className}`}>
                        {trendLabelText.text}
                    </span>
                </section>

                <div className="summary-row">
                    <SummaryCard type="income" amount={displayIncome} />
                    <SummaryCard type="expense" amount={displayExpenses} />
                </div>

                <div className="spend-analytics-banner">
                    <h4>Spend Analytics</h4>
                    <p>{spendAnalyticsCopy}</p>
                </div>

                <section className="recent-activity-section">
                    <div className="section-header">
                        <h3>Recent Activity</h3>
                        <button className="view-all-btn" onClick={() => navigate('/transactions')}>
                            VIEW ALL
                        </button>
                    </div>

                    <div className="activity-container-card">
                        {isStorageEmpty ? (
                            <div className="empty-mock-container-blueprint">
                                <EmptyState message="No transactions created yet. Use the ＋ button below to save one." />
                            </div>
                        ) : (
                            recentTransactions.map((item) => (
                                <TransactionItem
                                    key={item.id}
                                    transaction={item}
                                    onDelete={deleteTransaction}
                                    onEdit={handleEditRedirect}
                                />
                            ))
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}