import React, { useState, useMemo } from 'react';
import { Header } from '../../components/Header/Header';
import { useTransactions } from '../../context/TransactionContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import './Analytics.css';

/**
 * Screen 04: Production-Grade Analytics Intelligence Hub.
 * Completely eliminates static structural data; uses pure dynamic data aggregation.
 */
export function Analytics() {
    const { transactions } = useTransactions();
    const [activeTimelineCursor, setActiveTimelineCursor] = useState(0);
    const [displayExtendedBreakdown, setDisplayExtendedBreakdown] = useState(false);

    // 1. EXTRACT UNIQUE HISTORICAL PERIOD WINDOWS DYNAMICALLY FROM DATA REPOSITORY
    const availablePeriodNodes = useMemo(() => {
        const expenseItems = transactions.filter(t => t.type === 'expense');
        if (expenseItems.length === 0) {
            // Default to current date system context if database ledger initialization is unallocated
            const today = new Date();
            return [{
                label: today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
                month: today.getMonth(),
                year: today.getFullYear()
            }];
        }

        const uniquePeriodsMap = {};
        expenseItems.forEach(t => {
            const transactionDate = new Date(t.date);
            const m = transactionDate.getMonth();
            const y = transactionDate.getFullYear();
            const key = `${m}-${y}`;
            if (!uniquePeriodsMap[key]) {
                uniquePeriodsMap[key] = {
                    label: transactionDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
                    month: m,
                    year: y
                };
            }
        });

        // Sort chronologically (latest month positions first index slot)
        return Object.values(uniquePeriodsMap).sort((alpha, beta) => {
            if (beta.year !== alpha.year) return beta.year - alpha.year;
            return beta.month - alpha.month;
        });
    }, [transactions]);

    // Adjust safety cursor constraints if array segments shrink downstream dynamically
    const boundPeriodIndex = Math.min(activeTimelineCursor, availablePeriodNodes.length - 1);
    const activeSelectedPeriod = availablePeriodNodes[boundPeriodIndex];

    // 2. FILTER OUT ACTIVE EXPENSES BINDING SPECIFICALLY TO SELECTED CHRONOLOGICAL TRACKS
    const filteredActiveExpenses = useMemo(() => {
        if (!activeSelectedPeriod) return [];
        return transactions.filter(t => {
            const d = new Date(t.date);
            return t.type === 'expense' &&
                d.getMonth() === activeSelectedPeriod.month &&
                d.getFullYear() === activeSelectedPeriod.year;
        });
    }, [transactions, activeSelectedPeriod]);

    // 3. COMPILE TRUE REAL-TIME MATERIAL DISTRIBUTION SHARE MATRIX
    const compiledSpendMetrics = useMemo(() => {
        if (filteredActiveExpenses.length === 0) return [];

        const periodTotalVolume = filteredActiveExpenses.reduce((sum, t) => sum + Number(t.amount), 0);
        const aggregationDistributionMap = filteredActiveExpenses.reduce((acc, t) => {
            const normalizedCategoryKey = t.category;
            acc[normalizedCategoryKey] = (acc[normalizedCategoryKey] || 0) + Number(t.amount);
            return acc;
        }, {});

        const modernGrayscaleRange = ['#111111', '#3f4f43', '#7c847d', '#a1a1aa', '#d4d4d8'];

        return Object.keys(aggregationDistributionMap).map((catKey, index) => {
            const valueSum = aggregationDistributionMap[catKey];
            return {
                name: catKey.charAt(0).toUpperCase() + catKey.slice(1),
                value: valueSum,
                percentage: Math.round((valueSum / periodTotalVolume) * 100),
                color: modernGrayscaleRange[index % modernGrayscaleRange.length]
            };
        }).sort((alpha, beta) => beta.value - alpha.value);
    }, [filteredActiveExpenses]);

    // Total absolute volume expenditure calculation target
    const aggregatedExpenseVolumeSum = useMemo(() => {
        return filteredActiveExpenses.reduce((sum, t) => sum + Number(t.amount), 0);
    }, [filteredActiveExpenses]);

    // 4. AUTONOMOUS 6-MONTH TRAILING TIMELINE TIME-SERIES COMPILER
    const dynamicRollingTrendBarData = useMemo(() => {
        const dataSeries = [];
        const baseReferenceDate = new Date();

        for (let offset = 5; offset >= 0; offset--) {
            const trackingMonthDateInstance = new Date(baseReferenceDate.getFullYear(), baseReferenceDate.getMonth() - offset, 1);
            const targetMonthKey = trackingMonthDateInstance.getMonth();
            const targetYearKey = trackingMonthDateInstance.getFullYear();

            const calculatedMonthlySum = transactions
                .filter(t => {
                    const d = new Date(t.date);
                    return t.type === 'expense' && d.getMonth() === targetMonthKey && d.getFullYear() === targetYearKey;
                })
                .reduce((sum, t) => sum + Number(t.amount), 0);

            dataSeries.push({
                month: trackingMonthDateInstance.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
                amount: calculatedMonthlySum
            });
        }
        return dataSeries;
    }, [transactions]);

    // Previous relative period index for variance reporting text outputs
    const historicalComparisonCopy = useMemo(() => {
        if (transactions.length === 0 || filteredActiveExpenses.length === 0) {
            return "~ 0% variance baseline detected";
        }
        return `Tracking active ledger calculations across ${filteredActiveExpenses.length} resource distribution nodes.`;
    }, [filteredActiveExpenses, transactions]);

    return (
        <div className="analytics-page">
            <Header />

            <div className="analytics-scroll-area">
                {/* Dynamic Period Selector Controls */}
                <div className="period-navigation-ribbon">
                    <button
                        className="period-arrow-btn"
                        onClick={() => setActiveTimelineCursor(p => Math.min(p + 1, availablePeriodNodes.length - 1))}
                        disabled={boundPeriodIndex >= availablePeriodNodes.length - 1}
                    >
                        ‹
                    </button>
                    <div className="period-text-wrap">
                        <span className="period-caption">CURRENT PERIOD</span>
                        <h5 className="period-date-header">{activeSelectedPeriod?.label || 'No Data Mapped'}</h5>
                    </div>
                    <button
                        className="period-arrow-btn"
                        onClick={() => setActiveTimelineCursor(p => Math.max(p - 1, 0))}
                        disabled={boundPeriodIndex <= 0}
                    >
                        ›
                    </button>
                </div>

                {/* Aggregate Volume Display Frame Card */}
                <div className="total-expenditure-card">
                    <span className="expenditure-label">TOTAL EXPENDITURE</span>
                    <h2 className="expenditure-amount">{formatCurrency(aggregatedExpenseVolumeSum)}</h2>
                    <span className="expenditure-mom-sub">{historicalComparisonCopy}</span>
                </div>

                {/* Donut Chart Visualization Module Panel */}
                {compiledSpendMetrics.length > 0 ? (
                    <div className="chart-visualization-block">
                        <h5 className="block-title-caption">SPENDING BREAKDOWN</h5>
                        <div className="donut-chart-relative-box">
                            <ResponsiveContainer width="100%" height={180}>
                                <PieChart>
                                    <Pie
                                        data={compiledSpendMetrics}
                                        cx="50%" cy="50%"
                                        innerRadius={62} outerRadius={74}
                                        paddingAngle={3}
                                        dataKey="value"
                                    >
                                        {compiledSpendMetrics.map((entry, idx) => (
                                            <Cell key={`cell-${idx}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="donut-center-absolute-label">
                                <h3 className="center-pct-text">{compiledSpendMetrics[0]?.percentage || 0}%</h3>
                                <span className="center-sub-caption">{compiledSpendMetrics[0]?.name?.toUpperCase()}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="chart-visualization-block fallback-empty-height">
                        <p className="clean-analytics-fallback-msg">No expense footprints recorded inside this historical timeline sector interval.</p>
                    </div>
                )}

                {/* Dynamic Categorized Distribution Yield Rows Rows */}
                <div className="analytics-breakdown-list-container">
                    {compiledSpendMetrics.map((item, index) => (
                        <div key={index} className="analytics-breakdown-card-row">
                            <div className="row-meta-left">
                                <span className="legend-swatch" style={{ backgroundColor: item.color }}></span>
                                <span className="breakdown-name-text">{item.name}</span>
                            </div>
                            <div className="row-values-right">
                                <span className="breakdown-currency-val">{formatCurrency(item.value)}</span>
                                <span className="breakdown-percentage-lbl">{item.percentage}%</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Fully operational state trigger report panel anchor button */}
                <button
                    className={`view-detailed-report-btn ${displayExtendedBreakdown ? 'active-toggled-report' : ''}`}
                    onClick={() => setDisplayExtendedBreakdown(!displayExtendedBreakdown)}
                >
                    {displayExtendedBreakdown ? 'HIDE DETAILED REPORT' : 'VIEW DETAILED REPORT'}
                </button>

                {displayExtendedBreakdown && (
                    <div className="extended-intelligence-overlay-panel animate-slide-fade">
                        <h6 className="micro-overlay-title">SYSTEM METRIC METADATA</h6>
                        <div className="metric-meta-details-row-align">
                            <span>Total Active Expense Transactions:</span>
                            <strong>{filteredActiveExpenses.length} units</strong>
                        </div>
                        <div className="metric-meta-details-row-align">
                            <span>Primary Sector Vulnerability Outflow:</span>
                            <strong>{compiledSpendMetrics[0]?.name || 'None'}</strong>
                        </div>
                    </div>
                )}

                {/* Trailing Time Series Rolling Bar Graphs Panel Module Container */}
                <div className="bar-trend-visualization-block">
                    <h5 className="block-title-caption">6-MONTH ROLLING TREND</h5>
                    <div className="bar-chart-container-adjust">
                        <ResponsiveContainer width="100%" height={140}>
                            <BarChart data={dynamicRollingTrendBarData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#999999', fontWeight: 500 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#999999' }} />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="amount" fill="#111111" barSize={14} radius={[3, 3, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}