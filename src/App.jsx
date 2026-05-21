import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BottomNav } from './components/BottomNav/BottomNav';

// Placeholder Pages (We will implement full logic in next steps)
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Transactions } from './pages/Transactions/Transactions';
import { AddTransaction } from './pages/AddTransaction/AddTransaction';
import { Analytics } from './pages/Analytics/Analytics';

/**
 * Main Application Shell handling standard routing structure.
 * Wraps viewports inside the mobile grid frame safely.
 */
function App() {
  return (
    <Router>
      {/* Scrollable Main Application Content Area */}
      <main className="app-content" style={{ flex: 1, overflowY: 'auto', paddingBottom: '72px' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/add" element={<AddTransaction />} />
          <Route path="/edit/:id" element={<AddTransaction />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </main>

      {/* Persistent Global Navigation Controller */}
      <BottomNav />
    </Router>
  );
}

export default App;