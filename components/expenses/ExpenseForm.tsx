'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Alert,
  CircularProgress,
  Box,
  Typography,
  IconButton,
  InputAdornment,
  Divider,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Close,
  AttachMoney,
  Category,
  Description,
  CalendarToday,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { useAppDispatch } from '@/lib/store/hooks';
import { createExpense, fetchExpenses } from '@/lib/store/slices/expensesSlice';
import { CreateExpenseDto, ExpenseCategory } from '@/lib/types';

interface ExpenseFormProps {
  open: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  { value: ExpenseCategory.TRAVEL, label: 'Travel' },
  { value: ExpenseCategory.FOOD, label: 'Food' },
  { value: ExpenseCategory.OFFICE_SUPPLIES, label: 'Office Supplies' },
  { value: ExpenseCategory.UTILITIES, label: 'Utilities' },
  { value: ExpenseCategory.EQUIPMENT, label: 'Equipment' },
  { value: ExpenseCategory.SOFTWARE, label: 'Software' },
  { value: ExpenseCategory.MARKETING, label: 'Marketing' },
  { value: ExpenseCategory.OTHER, label: 'Other' },
];

export default function ExpenseForm({ open, onClose }: ExpenseFormProps) {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateExpenseDto>({
    defaultValues: {
      amount: 0,
      category: ExpenseCategory.OTHER,
      description: '',
      expenseDate: dayjs().format('YYYY-MM-DD'),
    },
  });

  const onSubmit = async (data: CreateExpenseDto) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Convert amount to number to avoid validation errors
      const expenseData = {
        ...data,
        amount: Number(data.amount),
      };
      await dispatch(createExpense(expenseData)).unwrap();
      await dispatch(fetchExpenses({}));
      reset();
      onClose();
    } catch (err: any) {
      setError(err || 'Failed to create expense');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      reset();
      setError(null);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: theme.shadows[24],
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          p: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Add New Expense
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
            Fill in the details below to submit a new expense
          </Typography>
        </Box>
        <IconButton
          onClick={handleClose}
          disabled={isSubmitting}
          sx={{
            color: 'white',
            bgcolor: alpha('#fff', 0.1),
            '&:hover': {
              bgcolor: alpha('#fff', 0.2),
            },
          }}
        >
          <Close />
        </IconButton>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ p: 3 }}>
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2,
              }}
            >
              {error}
            </Alert>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Amount Field */}
            <Box>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                color="text.secondary"
                sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}
              >
                <AttachMoney sx={{ fontSize: 18 }} />
                Amount
              </Typography>
              <Controller
                name="amount"
                control={control}
                rules={{
                  required: 'Amount is required',
                  min: { value: 0.01, message: 'Amount must be greater than 0' },
                  validate: (value) => {
                    const num = Number(value);
                    return (!isNaN(num) && num > 0) || 'Please enter a valid amount';
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="0.00"
                    type="number"
                    inputProps={{ step: '0.01', min: '0.01' }}
                    error={!!errors.amount}
                    helperText={errors.amount?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography fontWeight={600} color="text.secondary">
                            $
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.primary.main, 0.02),
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.04),
                        },
                        '&.Mui-focused': {
                          bgcolor: 'transparent',
                        },
                      },
                    }}
                  />
                )}
              />
            </Box>

            {/* Category Field */}
            <Box>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                color="text.secondary"
                sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}
              >
                <Category sx={{ fontSize: 18 }} />
                Category
              </Typography>
              <Controller
                name="category"
                control={control}
                rules={{ required: 'Category is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    select
                    placeholder="Select a category"
                    error={!!errors.category}
                    helperText={errors.category?.message}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.primary.main, 0.02),
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.04),
                        },
                        '&.Mui-focused': {
                          bgcolor: 'transparent',
                        },
                      },
                    }}
                  >
                    {CATEGORIES.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>

            {/* Description Field */}
            <Box>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                color="text.secondary"
                sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}
              >
                <Description sx={{ fontSize: 18 }} />
                Description
              </Typography>
              <Controller
                name="description"
                control={control}
                rules={{
                  required: 'Description is required',
                  minLength: {
                    value: 3,
                    message: 'Description must be at least 3 characters',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="Enter expense details..."
                    multiline
                    rows={4}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.primary.main, 0.02),
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.04),
                        },
                        '&.Mui-focused': {
                          bgcolor: 'transparent',
                        },
                      },
                    }}
                  />
                )}
              />
            </Box>

            {/* Date Field */}
            <Box>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                color="text.secondary"
                sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}
              >
                <CalendarToday sx={{ fontSize: 18 }} />
                Expense Date
              </Typography>
              <Controller
                name="expenseDate"
                control={control}
                rules={{ required: 'Date is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.expenseDate}
                    helperText={errors.expenseDate?.message}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.primary.main, 0.02),
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.04),
                        },
                        '&.Mui-focused': {
                          bgcolor: 'transparent',
                        },
                      },
                    }}
                  />
                )}
              />
            </Box>
          </Box>
        </DialogContent>

        <Divider />

        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            onClick={handleClose}
            disabled={isSubmitting}
            variant="outlined"
            size="large"
            sx={{
              borderRadius: 2,
              px: 3,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            size="large"
            sx={{
              borderRadius: 2,
              px: 4,
              textTransform: 'none',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
              },
              '&:disabled': {
                background: alpha(theme.palette.primary.main, 0.5),
              },
            }}
          >
            {isSubmitting ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                Submitting...
              </>
            ) : (
              'Submit Expense'
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

