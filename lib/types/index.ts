export enum UserRole {
  EMPLOYEE = 'employee',
  ADMIN = 'admin',
}

export enum ExpenseStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum ExpenseCategory {
  TRAVEL = 'travel',
  FOOD = 'food',
  OFFICE_SUPPLIES = 'office_supplies',
  UTILITIES = 'utilities',
  EQUIPMENT = 'equipment',
  SOFTWARE = 'software',
  MARKETING = 'marketing',
  OTHER = 'other',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  expenseDate: string;
  status: ExpenseStatus;
  rejectionReason?: string;
  userId: string;
  user: User;
  approvedBy?: string;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateExpenseDto {
  amount: number;
  category: ExpenseCategory;
  description: string;
  expenseDate: string;
}

export interface UpdateExpenseStatusDto {
  status: ExpenseStatus;
  rejectionReason?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Analytics {
  totalExpenses: number;
  totalAmount: number;
  categoryTotals: Record<string, number>;
  statusTotals: Record<string, number>;
  statusCounts: {
    pending: number;
    approved: number;
    rejected: number;
  };
}

export interface ExpenseFilters {
  category?: ExpenseCategory;
  status?: ExpenseStatus;
  startDate?: string;
  endDate?: string;
}

