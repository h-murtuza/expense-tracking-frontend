import { ExpenseStatus, ExpenseCategory, UserRole } from '@/lib/types';

describe('Type validations', () => {
  describe('ExpenseStatus', () => {
    it('should have correct status values', () => {
      expect(ExpenseStatus.PENDING).toBe('pending');
      expect(ExpenseStatus.APPROVED).toBe('approved');
      expect(ExpenseStatus.REJECTED).toBe('rejected');
    });
  });

  describe('ExpenseCategory', () => {
    it('should have correct category values', () => {
      expect(ExpenseCategory.TRAVEL).toBe('travel');
      expect(ExpenseCategory.FOOD).toBe('food');
      expect(ExpenseCategory.OFFICE_SUPPLIES).toBe('office_supplies');
      expect(ExpenseCategory.UTILITIES).toBe('utilities');
      expect(ExpenseCategory.EQUIPMENT).toBe('equipment');
      expect(ExpenseCategory.SOFTWARE).toBe('software');
      expect(ExpenseCategory.MARKETING).toBe('marketing');
      expect(ExpenseCategory.OTHER).toBe('other');
    });
  });

  describe('UserRole', () => {
    it('should have correct role values', () => {
      expect(UserRole.EMPLOYEE).toBe('employee');
      expect(UserRole.ADMIN).toBe('admin');
    });
  });
});

describe('Amount validation', () => {
  const validateAmount = (amount: number): boolean => {
    return amount > 0 && !isNaN(amount);
  };

  it('should validate positive numbers', () => {
    expect(validateAmount(100)).toBe(true);
    expect(validateAmount(0.01)).toBe(true);
    expect(validateAmount(999999.99)).toBe(true);
  });

  it('should reject zero and negative numbers', () => {
    expect(validateAmount(0)).toBe(false);
    expect(validateAmount(-1)).toBe(false);
    expect(validateAmount(-100.5)).toBe(false);
  });

  it('should reject NaN', () => {
    expect(validateAmount(NaN)).toBe(false);
  });
});

describe('Date validation', () => {
  const validateDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  it('should validate correct date strings', () => {
    expect(validateDate('2024-01-15')).toBe(true);
    expect(validateDate('2024-12-31')).toBe(true);
  });

  it('should reject invalid date strings', () => {
    expect(validateDate('invalid-date')).toBe(false);
    expect(validateDate('')).toBe(false);
  });
});

