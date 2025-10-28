'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Typography,
  CircularProgress,
  TextField,
  MenuItem,
  Button,
  Stack,
  Collapse,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Add,
  Close,
  ExpandMore,
  ExpandLess,
  HourglassEmpty,
  CheckCircle,
  Cancel,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { fetchExpenses, setFilters } from '@/lib/store/slices/expensesSlice';
import { ExpenseCategory, ExpenseStatus } from '@/lib/types';
import ExpenseForm from './ExpenseForm';

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

const STATUS_COLORS: Record<ExpenseStatus, 'default' | 'warning' | 'success' | 'error'> = {
  [ExpenseStatus.PENDING]: 'warning',
  [ExpenseStatus.APPROVED]: 'success',
  [ExpenseStatus.REJECTED]: 'error',
};

export default function ExpenseList() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { expenses, isLoading, filters } = useAppSelector((state) => state.expenses);
  const [formOpen, setFormOpen] = useState(false);
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    category: filters.category || '',
    status: filters.status || '',
    startDate: filters.startDate || '',
    endDate: filters.endDate || '',
  });

  useEffect(() => {
    dispatch(fetchExpenses(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (field: string, value: string) => {
    const newFilters = { ...localFilters, [field]: value };
    setLocalFilters(newFilters);
    
    // Auto-apply filters
    const cleanFilters: Record<string, string> = {};
    if (newFilters.category) cleanFilters.category = newFilters.category;
    if (newFilters.status) cleanFilters.status = newFilters.status;
    if (newFilters.startDate) cleanFilters.startDate = newFilters.startDate;
    if (newFilters.endDate) cleanFilters.endDate = newFilters.endDate;

    dispatch(setFilters(cleanFilters));
  };

  const clearFilters = () => {
    setLocalFilters({
      category: '',
      status: '',
      startDate: '',
      endDate: '',
    });
    dispatch(setFilters({}));
  };

  const activeFilterCount = [
    localFilters.category,
    localFilters.status,
    localFilters.startDate,
    localFilters.endDate,
  ].filter(Boolean).length;

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            My Expenses
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Track and manage all your expenses
          </Typography>
        </Box>
        <Button
          variant="contained"
          size="large"
          startIcon={<Add />}
          onClick={() => setFormOpen(true)}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1.5,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
            },
          }}
        >
          Add Expense
        </Button>
      </Box>

      {/* Quick Status Filters */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          mb: 3,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
        }}
      >
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight={600}>
            Quick Filters
          </Typography>
          {activeFilterCount > 0 && (
            <Button
              size="small"
              startIcon={<Close />}
              onClick={clearFilters}
              sx={{ color: 'text.secondary' }}
            >
              Clear All ({activeFilterCount})
            </Button>
          )}
        </Box>

        {/* Status Chips */}
        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
          <Chip
            label="All"
            onClick={() => handleFilterChange('status', '')}
            color={!localFilters.status ? 'primary' : 'default'}
            variant={!localFilters.status ? 'filled' : 'outlined'}
            sx={{ fontWeight: !localFilters.status ? 600 : 400 }}
          />
          <Chip
            label="Pending"
            icon={<HourglassEmpty />}
            onClick={() => handleFilterChange('status', ExpenseStatus.PENDING)}
            color={localFilters.status === ExpenseStatus.PENDING ? 'warning' : 'default'}
            variant={localFilters.status === ExpenseStatus.PENDING ? 'filled' : 'outlined'}
            sx={{ fontWeight: localFilters.status === ExpenseStatus.PENDING ? 600 : 400 }}
          />
          <Chip
            label="Approved"
            icon={<CheckCircle />}
            onClick={() => handleFilterChange('status', ExpenseStatus.APPROVED)}
            color={localFilters.status === ExpenseStatus.APPROVED ? 'success' : 'default'}
            variant={localFilters.status === ExpenseStatus.APPROVED ? 'filled' : 'outlined'}
            sx={{ fontWeight: localFilters.status === ExpenseStatus.APPROVED ? 600 : 400 }}
          />
          <Chip
            label="Rejected"
            icon={<Cancel />}
            onClick={() => handleFilterChange('status', ExpenseStatus.REJECTED)}
            color={localFilters.status === ExpenseStatus.REJECTED ? 'error' : 'default'}
            variant={localFilters.status === ExpenseStatus.REJECTED ? 'filled' : 'outlined'}
            sx={{ fontWeight: localFilters.status === ExpenseStatus.REJECTED ? 600 : 400 }}
          />
        </Stack>

        {/* Advanced Filters Toggle */}
        <Button
          size="small"
          onClick={() => setFiltersExpanded(!filtersExpanded)}
          endIcon={filtersExpanded ? <ExpandLess /> : <ExpandMore />}
          sx={{ color: 'text.secondary' }}
        >
          Advanced Filters
        </Button>

        <Collapse in={filtersExpanded}>
          <Box
            sx={{
              mt: 2,
              pt: 2,
              borderTop: `1px solid ${theme.palette.divider}`,
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 2,
            }}
          >
            <TextField
              select
              label="Category"
              value={localFilters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            >
              <MenuItem value="">All Categories</MenuItem>
              {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={localFilters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />

            <TextField
              label="End Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={localFilters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>
        </Collapse>
      </Paper>

      {/* Table */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
        }}
      >
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : expenses.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body1" color="textSecondary">
              No expenses found. Click "Add Expense" to create one.
            </Typography>
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                }}
              >
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Submitted By</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow
                  key={expense.id}
                  hover
                  sx={{
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.02),
                    },
                  }}
                >
                  <TableCell>
                    <Typography variant="body2" fontWeight={500}>
                      {dayjs(expense.expenseDate).format('MMM DD, YYYY')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={CATEGORY_LABELS[expense.category]}
                      size="small"
                      variant="outlined"
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{expense.description}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600} color="primary">
                      ${Number(expense.amount).toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                      color={STATUS_COLORS[expense.status]}
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {expense.user.firstName} {expense.user.lastName}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <ExpenseForm open={formOpen} onClose={() => setFormOpen(false)} />
    </Box>
  );
}

