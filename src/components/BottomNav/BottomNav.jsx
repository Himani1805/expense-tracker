import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BottomNav.css';

/**
 * Pixel-perfect Bottom Navigation matching layout conditional states safely.
 */
export function BottomNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const isDashboard = location.pathname === "/";
    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`bottom-nav ${isDashboard ? 'dashboard-mode-bar' : 'inner-mode-bar'}`}>
            <button
                className={`nav-item ${isActive('/') ? 'active' : ''}`}
                onClick={() => navigate('/')}
            >
                <span className="material-symbols-outlined">dashboard</span>
            </button>

            <button
                className={`nav-item ${isActive('/transactions') ? 'active' : ''}`}
                onClick={() => navigate('/transactions')}
            >
                <span className="material-symbols-outlined">receipt_long</span>
            </button>

            {/* CONDITIONAL CENTER ACTION BUTTON BLOCK */}
            {isDashboard ? (
                <button
                    className="nav-item-center-dashboard"
                    onClick={() => navigate('/add')}
                >
                    ＋
                </button>
            ) : (
                <button
                    className="nav-item-center-inner-pages"
                    onClick={() => navigate('/add')}
                >
                    <span className="material-symbols-outlined inner-circle-plus-vector">add_circle</span>
                </button>
            )}

            <button
                className={`nav-item ${isActive('/analytics') ? 'active' : ''}`}
                onClick={() => navigate('/analytics')}
            >
                <span className="material-symbols-outlined">analytics</span>
            </button>

            {/* Renders Profile ONLY when current node corresponds strictly onto baseline dashboard route */}
            {isDashboard && (
                <button className="nav-item">
                    <span className="material-symbols-outlined">person</span>
                </button>
            )}
        </nav>
    );
}