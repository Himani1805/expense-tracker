# Expense Tracker App (Mobile-First)

A production-quality, pixel-accurate personal finance mobile application built with React, Vite, and modern functional hooks.This application replicates the provided design screens without relying on any external component or UI libraries.

## 🚀 Links

- **Live Demo:** [https://expense-tracker-zeta-flame-83.vercel.app/](https://expense-tracker-zeta-flame-83.vercel.app/)
- **GitHub Repository:** [https://github.com/Himani1805/expense-tracker](https://github.com/Himani1805/expense-tracker)

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

````text
src/
├── components/     # Reusable UI Elements (Header, SummaryCard, BottomNav, EmptyState, TransctionItem)
├── context/        # Global State Management (TransactionContext)
├── data/           # Predefined Categories List
├── hooks/          # Custom Hooks (useLocalStorage)
├── pages/          # Screens (Dashboard, Transactions, AddTransaction, Analytics)
├── styles/         # Global Theme & Typography Setup (global.css)
└── utils/          # Pure Helper Functions (Currency Format, Date Grouping)


## 🧠 Key Decisions Explained

### Context API + useReducer
Instead of adding heavy tools like Redux, I used the native Context API and `useReducer`. This keeps the app bundle size lightweight and centralizes all transaction logic (Add, Delete, Filter) in one clean place.

---

### Plain CSS Variables
I utilized CSS custom properties (`:root`) to maintain uniform spacing, colors, typography, and border radiuses across all screens. This ensured pixel-perfect design accuracy and made the styling highly maintainable.

---

### No Overengineering
I avoided over-splitting the UI into too many micro-components. Keeping tightly coupled UI logic close to its parent page reduced prop-drilling complexity and kept the overall codebase readable and clean.

---

### Data Optimization
I implemented `useMemo` hooks for real-time text searching, category filtering, and grouping transactions by date. This prevents unnecessary recalculations on every render, ensuring a smooth, lag-free performance on mobile devices.

---

## 🚀 How to Run Locally

```bash
# Clone the repository
git clone https://github.com/Himani1805/expense-tracker.git

# Enter the project directory
cd expense-tracker

# Install all dependencies
npm install

# Start the local development server
npm run dev

````

The application will start locally at:

```bash
http://localhost:5173


