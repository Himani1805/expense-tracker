# Expense Tracker App (Mobile-First)

[cite_start]A production-quality, pixel-accurate personal finance mobile application built with React, Vite, and modern functional hooks[cite: 4, 7, 12]. [cite_start]This application replicates the provided design screens without relying on any external component or UI libraries[cite: 13, 14].

## 🚀 Links
- **Live Demo:** []
- **GitHub Repository:** []

---

## 🛠️ Tech Stack
- [cite_start]**Frontend:** React + Vite [cite: 7]
- [cite_start]**Styling:** Plain CSS only (No Tailwind, MUI, or Bootstrap) [cite: 13]
- **State Management:** Context API + `useReducer` (No Redux)
- [cite_start]**Data Persistence:** `localStorage` [cite: 9]
- **Charts:** Recharts (for Analytics Screen)
- [cite_start]**Base Layout:** Strict 375px Mobile Width [cite: 8]

---

## 📂 Folder Structure
```text
src/
├── components/     # Reusable UI Elements (Header, SummaryCard, BottomNav)
├── context/        # Global State Management (TransactionContext)
├── data/           # Predefined Categories List
├── hooks/          # Custom Hooks (useLocalStorage)
├── pages/          # Screens (Dashboard, Transactions, AddTransaction, Analytics)
├── styles/         # Global Theme & Typography Setup (global.css)
└── utils/          # Pure Helper Functions (Currency Format, Date Grouping)


## 🧠 Key Decisions ExplainedContext API + useReducer: 
Used for clean and predictable global state management without adding the unnecessary bundle weight of Redux.Plain CSS Variables: Standard CSS custom properties used to maintain pixel-perfect design accuracy, strict padding ratios, and monochrome vector icon fidelity across all screens.  No Overengineering: Component files like TransactionItem or CategoryChip were merged directly into their respective pages to prevent dirty conditional props and keep the code clean and DRY.Data Optimization: Implemented useMemo hooks for real-time text searching, category filtering, and date-wise grouping to prevent re-render lags on mobile viewports.

🚀 How to Run Locally

# Clone the repository
git clone [https://github.com/Himani1805/expense-tracker.git](https://github.com/Himani1805/expense-tracker.git)

# Enter the project directory
cd expense-tracker

# Install dependencies
npm install

# Start the local development server
npm run dev
