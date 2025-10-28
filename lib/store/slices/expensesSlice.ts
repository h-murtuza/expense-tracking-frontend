import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { expensesApi } from '../../api/expenses.api';
import {
  Expense,
  CreateExpenseDto,
  UpdateExpenseStatusDto,
  ExpenseFilters,
  Analytics,
} from '../../types';

interface ExpensesState {
  expenses: Expense[];
  pendingExpenses: Expense[];
  analytics: Analytics | null;
  isLoading: boolean;
  error: string | null;
  filters: ExpenseFilters;
}

const initialState: ExpensesState = {
  expenses: [],
  pendingExpenses: [],
  analytics: null,
  isLoading: false,
  error: null,
  filters: {},
};

export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async (filters: ExpenseFilters, { rejectWithValue }) => {
    try {
      return await expensesApi.getAll(filters);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch expenses'
      );
    }
  }
);

export const createExpense = createAsyncThunk(
  'expenses/createExpense',
  async (data: CreateExpenseDto, { rejectWithValue }) => {
    try {
      return await expensesApi.create(data);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create expense'
      );
    }
  }
);

export const updateExpenseStatus = createAsyncThunk(
  'expenses/updateStatus',
  async (
    { id, data }: { id: string; data: UpdateExpenseStatusDto },
    { rejectWithValue }
  ) => {
    try {
      return await expensesApi.updateStatus(id, data);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update expense status'
      );
    }
  }
);

export const fetchPendingExpenses = createAsyncThunk(
  'expenses/fetchPending',
  async (_, { rejectWithValue }) => {
    try {
      return await expensesApi.getPending();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch pending expenses'
      );
    }
  }
);

export const fetchAnalytics = createAsyncThunk(
  'expenses/fetchAnalytics',
  async (_, { rejectWithValue }) => {
    try {
      return await expensesApi.getAnalytics();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch analytics'
      );
    }
  }
);

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch expenses
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Create expense
    builder
      .addCase(createExpense.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.expenses.unshift(action.payload);
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update expense status
    builder
      .addCase(updateExpenseStatus.fulfilled, (state, action) => {
        const index = state.expenses.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) {
          state.expenses[index] = action.payload;
        }
        const pendingIndex = state.pendingExpenses.findIndex(
          (e) => e.id === action.payload.id
        );
        if (pendingIndex !== -1) {
          state.pendingExpenses.splice(pendingIndex, 1);
        }
      });

    // Fetch pending expenses
    builder
      .addCase(fetchPendingExpenses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPendingExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pendingExpenses = action.payload;
      })
      .addCase(fetchPendingExpenses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch analytics
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.analytics = action.payload;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, clearError } = expensesSlice.actions;
export default expensesSlice.reducer;

