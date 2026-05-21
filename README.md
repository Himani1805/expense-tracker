# Expense Tracker App (Mobile-First)

A production-quality, pixel-accurate personal finance mobile application built with React, Vite, and modern functional hooks.This application replicates the provided design screens without relying on any external component or UI libraries.

## 🚀 Links

- **Live Demo:** [https://expense-tracker-zeta-flame-83.vercel.app/]
- **GitHub Repository:** [https://github.com/Himani1805/expense-tracker/blob/master/README.md]

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite
- **Styling:** Plain CSS only (No Tailwind, MUI, or Bootstrap)
- **State Management:** Context API + `useReducer` (No Redux)
- **Data Persistence:** `localStorage`
- **Charts:** Recharts (for Analytics Screen)
- **Base Layout:** Strict 375px Mobile Width

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
```
