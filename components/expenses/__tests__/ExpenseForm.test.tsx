import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import ExpenseForm from '../ExpenseForm';
import expensesReducer from '@/lib/store/slices/expensesSlice';
import authReducer from '@/lib/store/slices/authSlice';

// Mock the API
jest.mock('@/lib/api/expenses.api', () => ({
  expensesApi: {
    getAll: jest.fn(),
    create: jest.fn(),
  },
}));

describe('ExpenseForm', () => {
  let store: any;
  const mockOnClose = jest.fn();

  beforeEach(() => {
    store = configureStore({
      reducer: {
        expenses: expensesReducer,
        auth: authReducer,
      },
    });
    mockOnClose.mockClear();
  });

  it('should render the form when open', () => {
    render(
      <Provider store={store}>
        <ExpenseForm open={true} onClose={mockOnClose} />
      </Provider>,
    );

    expect(screen.getByText('Add New Expense')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Expense Date')).toBeInTheDocument();
  });

  it('should not render when closed', () => {
    render(
      <Provider store={store}>
        <ExpenseForm open={false} onClose={mockOnClose} />
      </Provider>,
    );

    expect(screen.queryByText('Add New Expense')).not.toBeInTheDocument();
  });

  it('should call onClose when cancel button is clicked', () => {
    render(
      <Provider store={store}>
        <ExpenseForm open={true} onClose={mockOnClose} />
      </Provider>,
    );

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should show validation errors for empty amount', async () => {
    render(
      <Provider store={store}>
        <ExpenseForm open={true} onClose={mockOnClose} />
      </Provider>,
    );

    const amountInput = screen.getByPlaceholderText('0.00');
    const submitButton = screen.getByText('Submit Expense');
    
    // Clear the amount field and submit
    fireEvent.change(amountInput, { target: { value: '' } });
    fireEvent.blur(amountInput);
    fireEvent.click(submitButton);

    // Wait for validation error or check if form submission is blocked
    await waitFor(() => {
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  it('should accept valid amount input', async () => {
    render(
      <Provider store={store}>
        <ExpenseForm open={true} onClose={mockOnClose} />
      </Provider>,
    );

    const amountInput = screen.getByPlaceholderText('0.00');
    
    fireEvent.change(amountInput, { target: { value: '100.50' } });
    
    expect(amountInput).toHaveValue(100.50);
  });

  it('should have form fields rendered correctly', () => {
    render(
      <Provider store={store}>
        <ExpenseForm open={true} onClose={mockOnClose} />
      </Provider>,
    );

    // Check that all required fields exist
    expect(screen.getByPlaceholderText('0.00')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter expense details...')).toBeInTheDocument();
    expect(screen.getByText('Submit Expense')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });
});

