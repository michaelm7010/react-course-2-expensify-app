import getExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses', () => {
    const result = getExpensesTotal([]);
    expect(result).toBe(0);
});

test('should return single expense total', () => {
    const result = getExpensesTotal([expenses[0]]);
    expect(result).toBe(195);
});
 
// 
test('should return multiple expense total', () => {
    const result = getExpensesTotal(expenses);
    expect(result).toBe(114195);
});
