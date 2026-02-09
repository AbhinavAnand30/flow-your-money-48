

# ExpenseFlow — Personal Finance Tracker

A clean, mobile-first personal finance tracker with Supabase backend for data persistence.

## Pages & Navigation

### 1. Landing Page (`/`)
- Hero section with app name "ExpenseFlow" and tagline
- Brief feature highlights (track expenses, visualize spending, stay on budget)
- Call-to-action button → Dashboard

### 2. Dashboard (`/dashboard`)
- **Summary cards**: Total Income, Total Expenses, Remaining Balance — color-coded with icons
- **Quick Add**: Inline forms to quickly add income or expense without leaving the page
- **Pie chart**: Category-wise expense breakdown (Food, Transport, Bills, Entertainment, etc.)
- **Bar chart**: Monthly expense trend (last 6 months)
- **Recent Transactions**: List of last 10 transactions with type, amount, category, date

### 3. Expenses Page (`/expenses`)
- Full list of all expenses with search and filters (by category, date range)
- Each row shows amount, category, date, note
- Edit and delete actions per row with confirmation dialog
- Sort by date or amount

### 4. Add Expense (`/expenses/add`)
- Form fields: Amount, Category (dropdown), Date (date picker), Note (optional text)
- Real-time validation with clear error messages
- Success toast notification on submission
- Quick "Add Another" option after saving

### 5. Settings (`/settings`)
- Currency selector (USD, EUR, GBP, INR, etc.)
- Theme toggle (light/dark mode)
- Reset all data button with confirmation dialog

## Design Approach
- Mobile-first responsive layout
- Bottom navigation bar on mobile, sidebar on desktop
- Clear typography with good contrast
- Accessible color palette
- Smooth transitions and feedback on all interactions

## Backend (Supabase via Lovable Cloud)
- **`expenses` table**: id, amount, category, date, note, created_at
- **`income` table**: id, amount, source, date, note, created_at
- **`settings` table**: id, currency, theme
- No authentication — single-user app for simplicity

