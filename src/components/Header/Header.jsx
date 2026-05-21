import React from 'react';
import './Header.css';

export function Header({ title = "Financial Serenity", showProfile = true, isClosable = false, onClose }) {
    return (
        <header className="app-header">
            <div className="header-left">
                {isClosable ? (
                    <button className="close-btn" onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                ) : (
                    <button className="menu-btn">
                        <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#111111' }}>menu</span>
                    </button>
                )}
                <span className="header-title">{title}</span>
            </div>
            {showProfile && (
                <div className="profile-container">
                    <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                        alt="User profile"
                        className="profile-img"
                    />
                </div>
            )}
        </header>
    );
}