# Expense Tracking Frontend

A modern, responsive web application for expense tracking and management, built with Next.js, React, TypeScript, and Material-UI.

## 🚀 Features

- **User Authentication**
  - Secure login and registration
  - JWT-based authentication with persistent sessions
  - Role-based UI rendering (Admin & Employee)

- **Expense Management**
  - Create new expenses with detailed information
  - View and filter personal expenses
  - Real-time form validation
  - Category-based organization
  - Date range filtering

- **Admin Dashboard**
  - Approve or reject pending expenses
  - View all system expenses
  - Employee directory and management
  - Comprehensive analytics and reporting

- **Analytics & Insights**
  - Interactive charts and graphs (Recharts)
  - Category-wise expense breakdown
  - Status-based statistics
  - Monthly trends and patterns

- **Modern UI/UX**
  - Clean, professional design
  - Fully responsive (mobile, tablet, desktop)
  - Gradient themes and smooth animations
  - Intuitive navigation with sidebar

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **State Management**: Redux Toolkit with Redux Persist
- **UI Components**: Material-UI (MUI) v7
- **Charts**: Recharts
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Icons**: Material Icons
- **Testing**: Jest, React Testing Library

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see backend README)

## 📦 Installation

1. **Navigate to frontend directory**
   ```bash
   cd expense-tracking-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

   **Environment Variables Explained:**
   - `NEXT_PUBLIC_API_URL`: Backend API base URL (default: http://localhost:3001/api)

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### Production Build
```bash
# Build the application
npm run build

# Start the production server
npm run start
```

### Linting
```bash
# Check for linting errors
npm run lint

# Fix linting errors
npm run lint -- --fix
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🎨 Application Structure

```
expense-tracking-frontend/
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   ├── login/                     # Login page
│   ├── register/                  # Registration page
│   ├── dashboard/                 # Dashboard page
│   ├── expenses/                  # Expenses page
│   └── admin/                     # Admin pages
│       ├── approvals/             # Expense approvals
│       └── employees/             # Employee management
│
├── components/                    # React components
│   ├── layout/                    # Layout components
│   │   └── AppLayout.tsx          # Main app layout with sidebar
│   ├── analytics/                 # Analytics components
│   │   └── AnalyticsDashboard.tsx # Charts and stats
│   ├── expenses/                  # Expense components
│   │   ├── ExpenseList.tsx        # Expense table with filters
│   │   └── ExpenseForm.tsx        # Create expense form
│   └── admin/                     # Admin components
│       ├── ApprovalList.tsx       # Pending approvals
│       └── EmployeeList.tsx       # Employee directory
│
├── lib/                           # Utilities and configurations
│   ├── store/                     # Redux store
│   │   ├── store.ts               # Store configuration
│   │   └── slices/                # Redux slices
│   │       ├── authSlice.ts       # Authentication state
│   │       └── expensesSlice.ts   # Expenses state
│   ├── api/                       # API integration
│   │   ├── axios.ts               # Axios instance
│   │   ├── auth.api.ts            # Auth endpoints
│   │   ├── expenses.api.ts        # Expense endpoints
│   │   └── users.api.ts           # User endpoints
│   ├── types/                     # TypeScript types
│   │   └── index.ts               # Shared types
│   └── providers/                 # React providers
│       └── Providers.tsx          # Redux & MUI providers
│
├── public/                        # Static files
├── .env.local                     # Environment variables (not in git)
├── jest.config.js                 # Jest configuration
├── jest.setup.js                  # Jest setup file
├── next.config.js                 # Next.js configuration
├── package.json                   # Dependencies and scripts
└── tsconfig.json                  # TypeScript configuration
```

## 📱 Pages & Routes

### Public Routes
- `/` - Landing/Home page
- `/login` - User login
- `/register` - User registration

### Protected Routes (Employee & Admin)
- `/dashboard` - Analytics dashboard
- `/expenses` - Expense management

### Admin-Only Routes
- `/admin/approvals` - Expense approvals
- `/admin/employees` - Employee directory

## 🎯 Key Features Breakdown

### Authentication
- **Login**: Email/password authentication with JWT
- **Register**: New user registration with role selection
- **Session Persistence**: Redux Persist keeps user logged in
- **Protected Routes**: Automatic redirect to login if unauthenticated

### Expense Management
- **Create**: Add new expenses with category, amount, date, and description
- **Filter**: Filter by category, status, and date range
- **Quick Status Filters**: One-click filtering (All, Pending, Approved, Rejected)
- **Validation**: Real-time form validation with error messages

### Admin Features
- **Approvals**: View and approve/reject pending expenses
- **Rejection Reason**: Add reason when rejecting expenses
- **Employee Directory**: View all users with roles and status
- **Analytics**: System-wide expense analytics

### Dashboard Analytics
- **Summary Cards**: Total expenses, amounts, and counts
- **Category Chart**: Pie chart showing category distribution
- **Trend Chart**: Line chart showing expense trends
- **Status Breakdown**: Bar chart for expense status

## 🎨 UI Components

### Layout
- **Sidebar Navigation**: Fixed left sidebar with menu items
- **Responsive Design**: Mobile drawer, desktop permanent sidebar
- **User Profile**: User info and logout in sidebar

### Forms
- **React Hook Form**: Form state management and validation
- **Material-UI Fields**: Styled input components
- **Date Pickers**: Date selection for expenses
- **Dropdowns**: Category and status selection

### Tables
- **Data Grid**: Sortable, filterable tables
- **Pagination**: Handle large datasets
- **Row Actions**: Inline actions (approve, reject, view)

### Charts
- **Recharts Integration**: Interactive, responsive charts
- **Pie Charts**: Category distribution
- **Bar Charts**: Status breakdown
- **Line Charts**: Trend analysis

## 🔐 Authentication Flow

1. User logs in with email/password
2. Backend validates credentials and returns JWT token
3. Frontend stores token in localStorage
4. Redux Persist keeps authentication state
5. Axios interceptor adds token to all requests
6. Protected routes check authentication state
7. Role-based rendering for admin features

## 🎨 Theme & Styling

- **Material-UI Theme**: Custom theme with gradients
- **Color Palette**: Purple/violet primary colors
- **Typography**: Modern font stack with consistent sizing
- **Shadows & Effects**: Subtle elevation and transitions
- **Responsive**: Mobile-first approach with breakpoints

## 🧪 Testing Strategy

### Unit Tests
- Redux slices (actions, reducers, thunks)
- Utility functions
- Form validation

### Integration Tests
- API integration
- Component rendering
- User interactions

### Component Tests
- Form submissions
- Button clicks
- Navigation

## 📊 State Management

### Redux Store Structure
```typescript
{
  auth: {
    user: User | null,
    token: string | null,
    isAuthenticated: boolean,
    isLoading: boolean,
    error: string | null
  },
  expenses: {
    expenses: Expense[],
    pendingExpenses: Expense[],
    analytics: Analytics | null,
    filters: ExpenseFilters,
    isLoading: boolean,
    error: string | null
  }
}
```

### Async Thunks
- `login()` - User authentication
- `register()` - User registration
- `fetchExpenses()` - Get expenses with filters
- `createExpense()` - Create new expense
- `updateExpenseStatus()` - Approve/reject expense
- `fetchPendingExpenses()` - Get pending expenses (admin)
- `fetchAnalytics()` - Get analytics data

## 🌐 API Integration

All API calls are made through dedicated API service files:

```typescript
// Authentication
authApi.login(credentials)
authApi.register(userData)

// Expenses
expensesApi.getAll(filters)
expensesApi.create(expense)
expensesApi.getById(id)
expensesApi.updateStatus(id, status)
expensesApi.getPending()
expensesApi.getAnalytics()

// Users
usersApi.getAllUsers()
```

## 🔧 Configuration

### Axios Configuration
- Base URL from environment variable
- Automatic token injection
- Error response handling
- Request/response interceptors

### Next.js Configuration
- TypeScript enabled
- Path aliases configured (@/)
- Image optimization
- Turbopack for faster builds

## 🎨 Design Patterns

- **Container/Presenter**: Separate logic from UI
- **Custom Hooks**: Reusable logic extraction
- **Type Safety**: Full TypeScript coverage
- **Error Boundaries**: Graceful error handling
- **Code Splitting**: Route-based code splitting

## 🚀 Performance Optimization

- **Next.js SSR**: Server-side rendering for better SEO
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Dynamic imports for heavy components
- **Redux Persist**: Reduced API calls with cached state

## 🐛 Common Issues & Troubleshooting

### Build Errors
```bash
Error: Cannot find module '@mui/material/Grid2'
```
**Solution:** The app uses CSS Grid instead of MUI Grid2 for better compatibility

### Hydration Warnings
```bash
Warning: Text content did not match
```
**Solution:** `suppressHydrationWarning` is added to layout components

### API Connection Error
```bash
Error: Network Error
```
**Solution:** Ensure backend is running and `NEXT_PUBLIC_API_URL` is correct

## 📝 Development Guidelines

1. **Code Style**: Follow React and Next.js best practices
2. **TypeScript**: Use strong typing, avoid `any`
3. **Components**: Keep components small and focused
4. **Testing**: Write tests for all new features
5. **Commits**: Use conventional commit messages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Related Projects

- [Backend Repository](../expense-tracking-backend)
