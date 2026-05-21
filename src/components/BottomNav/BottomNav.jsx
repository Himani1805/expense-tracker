import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BottomNav.css';

/**
 * Pixel-perfect Bottom Navigation using native ultra-thin Material Symbols.
 */
export function BottomNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const isDashboard = location.pathname === "/";
    const isActive = (path) => location.pathname === path;
    // console.log(location.pathname)
    return (
        <nav className="bottom-nav">
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

            <button
                className="nav-item-center"
                // {1==1 &&(<p></p>)}
                onClick={() => navigate('/add')}
            >
                ＋
            </button>

            {/* <div className="icon-container"> */}
            {/* First + Icon */}
            {/* <button className={`plus-icon ${isDashboard ? "dashboard-style" : "plain-style"}`}>
                    <span className="material-symbols-outlined">add</span>
                </button> */}

            {/* Second + Icon */}
            {/* <button className={`plus-icon ${isDashboard ? "dashboard-style" : "plain-style"}`}>
                    <span className="material-symbols-outlined">add</span>
                </button> */}
            {/* </div> */}

            <button
                className={`nav-item ${isActive('/analytics') ? 'active' : ''}`}
                onClick={() => navigate('/analytics')}
            >
                <span className="material-symbols-outlined">analytics</span>
            </button>
            {
                location.pathname == "/" && (
                    <button className="nav-item">
                        <span className="material-symbols-outlined">person</span>
                    </button>
                )
            }
        </nav>
    );
}