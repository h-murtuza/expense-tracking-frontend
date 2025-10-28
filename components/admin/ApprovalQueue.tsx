'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import {
  fetchPendingExpenses,
  updateExpenseStatus,
  fetchExpenses,
} from '@/lib/store/slices/expensesSlice';
import { Expense, ExpenseCategory, ExpenseStatus } from '@/lib/types';

const CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  [ExpenseCategory.TRAVEL]: 'Travel',
  [ExpenseCategory.FOOD]: 'Food',
  [ExpenseCategory.OFFICE_SUPPLIES]: 'Office Supplies',
  [ExpenseCategory.UTILITIES]: 'Utilities',
  [ExpenseCategory.EQUIPMENT]: 'Equipment',
  [ExpenseCategory.SOFTWARE]: 'Software',
  [ExpenseCategory.MARKETING]: 'Marketing',
  [ExpenseCategory.OTHER]: 'Other',
};

export default function ApprovalQueue() {
  const dispatch = useAppDispatch();
  const { pendingExpenses, isLoading } = useAppSelector((state) => state.expenses);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchPendingExpenses());
  }, [dispatch]);

  const handleApprove = async (expenseId: string) => {
    setIsSubmitting(true);
    try {
      await dispatch(
        updateExpenseStatus({
          id: expenseId,
          data: { status: ExpenseStatus.APPROVED },
        })
      ).unwrap();
      await dispatch(fetchPendingExpenses());
      await dispatch(fetchExpenses({}));
    } catch (error) {
      console.error('Failed to approve expense:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRejectClick = (expense: Expense) => {
    setSelectedExpense(expense);
    setRejectDialogOpen(true);
  };

  const handleRejectConfirm = async () => {
    if (!selectedExpense || !rejectionReason.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(
        updateExpenseStatus({
          id: selectedExpense.id,
          data: {
            status: ExpenseStatus.REJECTED,
            rejectionReason: rejectionReason.trim(),
          },
        })
      ).unwrap();
      await dispatch(fetchPendingExpenses());
      await dispatch(fetchExpenses({}));
      setRejectDialogOpen(false);
      setRejectionReason('');
      setSelectedExpense(null);
    } catch (error) {
      console.error('Failed to reject expense:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRejectCancel = () => {
    setRejectDialogOpen(false);
    setRejectionReason('');
    setSelectedExpense(null);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Approval Queue
      </Typography>

      <Paper sx={{ mb: 2, p: 2, bgcolor: '#fff3cd' }}>
        <Typography variant="body1">
          <strong>{pendingExpenses.length}</strong> expense(s) pending approval
        </Typography>
      </Paper>

      <TableContainer component={Paper}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : pendingExpenses.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body1" color="textSecondary">
              No pending expenses to review.
            </Typography>
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Submitted</TableCell>
                <TableCell>Employee</TableCell>
                <TableCell>Expense Date</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingExpenses.map((expense) => (
                <TableRow key={expense.id} hover>
                  <TableCell>
                    {dayjs(expense.createdAt).format('MMM DD, YYYY')}
                  </TableCell>
                  <TableCell>
                    {expense.user.firstName} {expense.user.lastName}
                  </TableCell>
                  <TableCell>
                    {dayjs(expense.expenseDate).format('MMM DD, YYYY')}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={CATEGORY_LABELS[expense.category]}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell align="right">
                    <strong>${Number(expense.amount).toFixed(2)}</strong>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        startIcon={<CheckCircle />}
                        onClick={() => handleApprove(expense.id)}
                        disabled={isSubmitting}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<Cancel />}
                        onClick={() => handleRejectClick(expense)}
                        disabled={isSubmitting}
                      >
                        Reject
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onClose={handleRejectCancel} maxWidth="sm" fullWidth>
        <DialogTitle>Reject Expense</DialogTitle>
        <DialogContent>
          <Typography variant="body2" gutterBottom>
            Please provide a reason for rejecting this expense:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Reason for rejection..."
            sx={{ mt: 2 }}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRejectCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={handleRejectConfirm}
            variant="contained"
            color="error"
            disabled={isSubmitting || !rejectionReason.trim()}
          >
            {isSubmitting ? <CircularProgress size={24} /> : 'Reject Expense'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

