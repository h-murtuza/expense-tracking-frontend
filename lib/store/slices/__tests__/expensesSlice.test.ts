import expensesReducer, {
  setFilters,
  fetchExpenses,
  createExpense,
  fetchAnalytics,
} from '../expensesSlice';
import { ExpenseStatus, ExpenseCategory } from '@/lib/types';

describe('expensesSlice', () => {
  const initialState = {
    expenses: [],
    pendingExpenses: [],
    analytics: null,
    isLoading: false,
    error: null,
    filters: {},
  };

  const mockExpense = {
    id: '1',
    amount: 100,
    category: ExpenseCategory.FOOD,
    description: 'Test expense',
    expenseDate: '2024-01-15',
    status: ExpenseStatus.PENDING,
    userId: 'user1',
    user: {
      id: 'user1',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'employee' as const,
    },
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  };

  const mockAnalytics = {
    totalExpenses: 10,
    totalAmount: 1000,
    categoryTotals: {
      [ExpenseCategory.FOOD]: 500,
      [ExpenseCategory.TRAVEL]: 300,
    },
    statusTotals: {
      [ExpenseStatus.PENDING]: 3,
      [ExpenseStatus.APPROVED]: 5,
    },
    statusCounts: {
      pending: 3,
      approved: 5,
      rejected: 2,
    },
  };

  it('should return the initial state', () => {
    expect(expensesReducer(undefined, { type: 'unknown' })).toEqual(
      initialState,
    );
  });

  describe('setFilters', () => {
    it('should set filters', () => {
      const filters = { category: ExpenseCategory.FOOD };
      const state = expensesReducer(initialState, setFilters(filters));
      expect(state.filters).toEqual(filters);
    });

    it('should clear filters', () => {
      const stateWithFilters = {
        ...initialState,
        filters: { category: ExpenseCategory.FOOD },
      };
      const state = expensesReducer(stateWithFilters, setFilters({}));
      expect(state.filters).toEqual({});
    });
  });

  describe('fetchExpenses', () => {
    it('should handle fetchExpenses.pending', () => {
      const action = { type: fetchExpenses.pending.type };
      const state = expensesReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should handle fetchExpenses.fulfilled', () => {
      const expenses = [mockExpense];
      const action = {
        type: fetchExpenses.fulfilled.type,
        payload: expenses,
      };
      const state = expensesReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.expenses).toEqual(expenses);
      expect(state.error).toBe(null);
    });

    it('should handle fetchExpenses.rejected', () => {
      const action = {
        type: fetchExpenses.rejected.type,
        payload: 'Failed to fetch expenses',
      };
      const state = expensesReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Failed to fetch expenses');
    });
  });

  describe('createExpense', () => {
    it('should handle createExpense.pending', () => {
      const action = { type: createExpense.pending.type };
      const state = expensesReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should handle createExpense.fulfilled', () => {
      const action = {
        type: createExpense.fulfilled.type,
        payload: mockExpense,
      };
      const state = expensesReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.expenses).toContainEqual(mockExpense);
      expect(state.error).toBe(null);
    });

    it('should handle createExpense.rejected', () => {
      const action = {
        type: createExpense.rejected.type,
        payload: 'Failed to create expense',
      };
      const state = expensesReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Failed to create expense');
    });
  });

  describe('fetchAnalytics', () => {
    it('should handle fetchAnalytics.pending', () => {
      const action = { type: fetchAnalytics.pending.type };
      const state = expensesReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should handle fetchAnalytics.fulfilled', () => {
      const action = {
        type: fetchAnalytics.fulfilled.type,
        payload: mockAnalytics,
      };
      const state = expensesReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.analytics).toEqual(mockAnalytics);
      expect(state.error).toBe(null);
    });

    it('should handle fetchAnalytics.rejected', () => {
      const action = {
        type: fetchAnalytics.rejected.type,
        payload: 'Failed to fetch analytics',
      };
      const state = expensesReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Failed to fetch analytics');
    });
  });
});

