# Expense Tracking Frontend

Modern, responsive Next.js frontend for the Expense Tracking application with Redux state management and Material-UI components.

## 🚀 Features

- Server-side rendering with Next.js 16
- Redux Toolkit for state management with persistence
- Material-UI for beautiful, accessible components
- Interactive charts for analytics visualization
- Role-based UI components
- Form validation with React Hook Form
- Responsive design for mobile and desktop
- JWT authentication flow

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **State Management**: Redux Toolkit + Redux Persist
- **UI Components**: Material-UI (MUI)
- **Charts**: Recharts
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Date Handling**: Day.js

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Running backend API (see backend README)

## 🔧 Installation

1. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

2. **Set up environment variables (optional)**

Create `.env.local` if you need to customize the API URL:
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
\`\`\`

Default API URL is `http://localhost:3001/api`

## 🚀 Running the Application

### Development Mode
\`\`\`bash
npm run dev
\`\`\`

The application will be available at `http://localhost:3000`

### Production Build
\`\`\`bash
npm run build
npm start
\`\`\`

## 👥 Test Credentials

Use these credentials to test different user roles:

### Admin Account
- **Email**: admin@example.com
- **Password**: admin123
- **Features**: Full access including approval queue

### Employee Accounts
- **Email**: john.doe@example.com
- **Password**: employee123
- **Features**: Submit and view own expenses

- **Email**: jane.smith@example.com
- **Password**: employee123

## 📱 Application Pages

### Public Pages
- `/` - Home (redirects to login)
- `/login` - User login
- `/register` - User registration

### Protected Pages (Requires Authentication)
- `/dashboard` - Analytics dashboard with charts
- `/expenses` - Expense list with filtering

### Admin Only Pages
- `/admin/approvals` - Approval queue for pending expenses

## 🎨 Key Components

### Layout Components
- **AppLayout**: Main application layout with navigation
- **Providers**: Redux and MUI theme providers

### Authentication
- **LoginPage**: User login with validation
- **RegisterPage**: New user registration

### Analytics
- **AnalyticsDashboard**: 
  - Summary cards (total expenses, total amount, pending, approved)
  - Bar chart for expenses by category
  - Pie chart for status distribution

### Expenses
- **ExpenseList**:
  - Filterable table of expenses
  - Filters by category, status, and date range
  - Responsive design
- **ExpenseForm**:
  - Modal form for creating expenses
  - Field validation
  - Category selection

### Admin
- **ApprovalQueue**:
  - Table of pending expenses
  - Approve/reject actions
  - Rejection reason dialog

## 🗂 Project Structure

\`\`\`
app/
├── login/
│   └── page.tsx              # Login page
├── register/
│   └── page.tsx              # Registration page
├── dashboard/
│   └── page.tsx              # Analytics dashboard
├── expenses/
│   └── page.tsx              # Expense list
├── admin/
│   └── approvals/
│       └── page.tsx          # Admin approval queue
├── layout.tsx                # Root layout
├── page.tsx                  # Home (redirects to login)
└── globals.css               # Global styles

components/
├── layout/
│   └── AppLayout.tsx         # Main app layout
├── analytics/
│   └── AnalyticsDashboard.tsx # Analytics component
├── expenses/
│   ├── ExpenseForm.tsx       # Expense creation form
│   └── ExpenseList.tsx       # Expense list with filters
└── admin/
    └── ApprovalQueue.tsx     # Admin approval interface

lib/
├── api/
│   ├── axios.ts              # Axios instance with interceptors
│   ├── auth.api.ts           # Auth API calls
│   └── expenses.api.ts       # Expense API calls
├── store/
│   ├── index.ts              # Redux store configuration
│   ├── hooks.ts              # Typed Redux hooks
│   └── slices/
│       ├── authSlice.ts      # Auth state management
│       └── expensesSlice.ts  # Expenses state management
├── types/
│   └── index.ts              # TypeScript interfaces
└── providers/
    └── Providers.tsx         # App providers (Redux, MUI)
\`\`\`

## 🔄 State Management

### Auth Slice
- User authentication state
- Login/logout actions
- Token management
- Persistent storage

### Expenses Slice
- Expense list
- Pending expenses (admin)
- Analytics data
- Filters
- Create/update actions

## 🎨 UI/UX Features

### Material-UI Theme
- Custom color palette
- Responsive breakpoints
- Consistent typography
- Global CSS baseline

### Responsive Design
- Mobile-first approach
- Adaptive layouts
- Touch-friendly interfaces
- Collapsible filters on mobile

### User Experience
- Loading states with spinners
- Error handling with alerts
- Form validation feedback
- Success confirmations
- Keyboard navigation

## 🔐 Authentication Flow

1. User enters credentials on login page
2. Frontend sends request to `/api/auth/login`
3. Backend validates and returns JWT token + user data
4. Token stored in localStorage and Redux
5. Axios interceptor adds token to all subsequent requests
6. Protected routes check authentication state
7. Auto-redirect to login if token expires

## 📊 Analytics Features

### Summary Cards
- Total number of expenses
- Total amount spent
- Pending expense count
- Approved expense count

### Charts
- **Bar Chart**: Expenses by category
- **Pie Chart**: Status distribution
- Interactive tooltips
- Responsive sizing

## 🔍 Filtering System

### Available Filters
- **Category**: Filter by expense type
- **Status**: Filter by approval status
- **Date Range**: Start and end dates
- Combined filters support

### Filter Behavior
- Real-time filter application
- URL query parameter sync (optional enhancement)
- Clear all filters option
- Persistent filter state in Redux

## 🛡️ Role-Based Access

### Employee View
- Create expenses
- View own expenses
- Filter and search
- View personal analytics

### Admin View
- All employee features
- View all team expenses
- Approval queue access
- Team-wide analytics
- Approve/reject capabilities

## 🧪 Testing

\`\`\`bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch
\`\`\`

## 📦 Building for Production

\`\`\`bash
# Create optimized production build
npm run build

# Start production server
npm start
\`\`\`

## 🚀 Deployment

### Recommended Platform: Vercel

1. **Connect Repository**
\`\`\`bash
vercel
\`\`\`

2. **Set Environment Variables**
- `NEXT_PUBLIC_API_URL`: Your production API URL

3. **Deploy**
\`\`\`bash
vercel --prod
\`\`\`

### Other Platforms
- **Netlify**: Configure build command as `npm run build`
- **AWS Amplify**: Connect Git repository
- **Azure Static Web Apps**: Deploy via GitHub Actions

## 🎯 Performance Optimization

- Server-side rendering for initial load
- Code splitting with Next.js
- Lazy loading of components
- Optimized images
- Cached API responses
- Minimal bundle size

## 🔧 Development Tools

### Code Quality
- ESLint for linting
- TypeScript for type safety
- Prettier for formatting (optional)

### Browser DevTools
- Redux DevTools for state inspection
- React DevTools for component debugging

## 📝 Best Practices

- TypeScript strict mode enabled
- Component modularity
- Custom hooks for reusability
- Consistent naming conventions
- Error boundary implementation
- Accessibility considerations

## 🤝 Contributing

When contributing to the frontend:
1. Follow the existing component structure
2. Use TypeScript types consistently
3. Test across different screen sizes
4. Ensure accessibility standards
5. Update this README for new features

## 📄 License

MIT License

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Material-UI for the component library
- Redux team for state management tools
- Recharts for beautiful charts
