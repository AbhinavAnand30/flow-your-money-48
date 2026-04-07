# ExpenseFlow

ExpenseFlow is a personal finance tracker web application that helps users manage daily expenses through a clean and user-friendly interface. Users can add expenses, monitor spending patterns, view summaries, and track their remaining balance through visual charts and dashboard components.

## Features

- Dashboard with total income, total expenses, and remaining balance
- Quick expense entry form
- Recent transaction list
- Expense filtering by category and date
- Edit and delete expense records
- Monthly spending charts and category-based analytics
- Responsive design for desktop, tablet, and mobile devices
- Settings for theme, currency, and data reset

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- React
- Chart.js / Recharts
- shadcn/ui
- Node.js
- Next.js API Routes

## Folder Structure

```bash
app/
│── page.tsx
│
├── dashboard/
│   └── page.tsx
│
├── expenses/
│   ├── page.tsx
│   └── add/
│       └── page.tsx
│
├── settings/
│   └── page.tsx
│
├── api/
│   ├── expenses/
│   │   ├── route.ts
│   │   └── [id]/
│   │       └── route.ts
│   │
│   └── income/
│       └── route.ts
│
├── components/
├── lib/
├── hooks/
└── styles/
