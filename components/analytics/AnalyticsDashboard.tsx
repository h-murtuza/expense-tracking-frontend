'use client';

import { useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Stack,
  alpha,
  useTheme,
  LinearProgress,
  Divider,
} from '@mui/material';
import {
  AttachMoney,
  HourglassEmpty,
  CheckCircle,
  Receipt,
  Cancel,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { fetchAnalytics } from '@/lib/store/slices/expensesSlice';
import { ExpenseCategory } from '@/lib/types';

const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6', '#14b8a6', '#f97316', '#ef4444'];

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

export default function AnalyticsDashboard() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { analytics, isLoading } = useAppSelector((state) => state.expenses);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  if (isLoading || !analytics) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  const categoryData = Object.entries(analytics.categoryTotals)
    .map(([category, amount]) => ({
      name: CATEGORY_LABELS[category as ExpenseCategory],
      amount: Number(amount),
    }))
    .sort((a, b) => b.amount - a.amount);

  const pieData = categoryData.map((item) => ({
    name: item.name,
    value: item.amount,
  }));

  const statCards = [
    {
      title: 'Total Spent',
      value: `$${analytics.totalAmount.toFixed(2)}`,
      icon: AttachMoney,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      shadowColor: alpha('#667eea', 0.4),
    },
    {
      title: 'Total Expenses',
      value: analytics.totalExpenses,
      subtitle: 'This month',
      icon: Receipt,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      shadowColor: alpha('#f093fb', 0.4),
    },
    {
      title: 'Pending',
      value: analytics.statusCounts.pending,
      subtitle: 'Awaiting approval',
      icon: HourglassEmpty,
      gradient: 'linear-gradient(135deg, #fad961 0%, #f76b1c 100%)',
      shadowColor: alpha('#fad961', 0.4),
    },
    {
      title: 'Approved',
      value: analytics.statusCounts.approved,
      subtitle: 'Completed',
      icon: CheckCircle,
      gradient: 'linear-gradient(135deg, #a8edea 0%, #10b981 100%)',
      shadowColor: alpha('#10b981', 0.4),
    },
    {
      title: 'Rejected',
      value: analytics.statusCounts.rejected,
      subtitle: 'Declined',
      icon: Cancel,
      gradient: 'linear-gradient(135deg, #fa709a 0%, #dc2626 100%)',
      shadowColor: alpha('#dc2626', 0.4),
    },
  ];

  const topCategories = categoryData.slice(0, 5);
  const maxAmount = Math.max(...topCategories.map((c) => c.amount), 1);

  // Custom label for pie chart
  const renderCustomLabel = (props: { name?: string }) => {
    const name = props.name || '';
    return name.length > 12 ? `${name.substring(0, 10)}...` : name;
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track and manage your expenses efficiently
        </Typography>
      </Box>

      {/* Stat Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(5, 1fr)',
          },
          gap: 3,
          mb: 4,
        }}
      >
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Box key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  background: card.gradient,
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 20px 40px ${card.shadowColor}`,
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 100,
                    height: 100,
                    background: alpha('#fff', 0.1),
                    borderRadius: '50%',
                    transform: 'translate(30%, -30%)',
                  },
                }}
              >
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>
                        {card.title}
                      </Typography>
                      <Typography variant="h3" fontWeight={700} sx={{ mt: 1, mb: 0.5 }}>
                        {card.value}
                      </Typography>
                      {card.subtitle && (
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>
                          {card.subtitle}
                        </Typography>
                      )}
                    </Box>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: alpha('#fff', 0.2),
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <Icon sx={{ fontSize: 28 }} />
                    </Box>
                  </Stack>
                </Stack>
              </Paper>
            </Box>
          );
        })}
      </Box>

      {/* Charts Row */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
          gap: 3,
          mb: 4,
        }}
      >
        {/* Bar Chart */}
        <Box>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Expenses by Category
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Your spending breakdown
            </Typography>
            <Divider sx={{ mb: 3 }} />
            {categoryData.length > 0 ? (
              <Box sx={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                  <BarChart
                    data={categoryData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                  >
                    <defs>
                      <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.6} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.3)} />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      interval={0}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
                      label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 12,
                        border: 'none',
                        boxShadow: theme.shadows[8],
                        backgroundColor: theme.palette.background.paper,
                      }}
                      formatter={(value: number | string) => [`$${Number(value).toFixed(2)}`, 'Amount']}
                    />
                    <Bar dataKey="amount" fill="url(#colorBar)" radius={[8, 8, 0, 0]} maxBarSize={60} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 400 }}>
                <Typography variant="body2" color="text.secondary">
                  No expense data available
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>

        {/* Pie Chart */}
        <Box>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Top Categories
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Distribution overview
            </Typography>
            <Divider sx={{ mb: 3 }} />
            {pieData.length > 0 ? (
              <Box sx={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="45%"
                      labelLine={true}
                      label={renderCustomLabel}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: 12,
                        border: 'none',
                        boxShadow: theme.shadows[8],
                        backgroundColor: theme.palette.background.paper,
                      }}
                      formatter={(value: number | string) => [`$${Number(value).toFixed(2)}`, 'Amount']}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: 12 }}
                      formatter={(value: string) => value.length > 15 ? `${value.substring(0, 13)}...` : value}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 400 }}>
                <Typography variant="body2" color="text.secondary">
                  No data available
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>
      </Box>

      {/* Category Breakdown */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Category Breakdown
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Detailed spending by category
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {topCategories.map((category, index) => (
            <Box key={index}>
              <Stack spacing={1.5}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: COLORS[index],
                      }}
                    />
                    <Typography variant="body2" fontWeight={600}>
                      {category.name}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" fontWeight={700} color="primary">
                    ${category.amount.toFixed(2)}
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={(category.amount / maxAmount) * 100}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: alpha(COLORS[index], 0.1),
                    '& .MuiLinearProgress-bar': {
                      bgcolor: COLORS[index],
                      borderRadius: 4,
                    },
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  {((category.amount / maxAmount) * 100).toFixed(1)}% of top spending
                </Typography>
              </Stack>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}
