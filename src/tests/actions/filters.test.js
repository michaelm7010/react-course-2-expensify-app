import moment from 'moment';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../../actions/filters';

test('should generate set start date action object', () => {
    const action = setStartDate(moment().startOf('year'));
    expect(action).toEqual({
        type:  'SET_START_DATE',
        startDate:  moment().startOf('year')
    });
});

test('should generate set end date action object', () => {
    const action = setEndDate(moment().endOf('year'));
    expect(action).toEqual({
        type:  'SET_END_DATE',
        endDate:  moment().endOf('year')
    });
});

test('should set text filter action object with provided value', () => {
    const testText = 'ab cd';
    const action = setTextFilter(testText);
    expect(action).toEqual({
        type:  'SET_TEXT_FILTER',
        text:  testText  
    });
});

test('should set text filter action object with default value', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type:  'SET_TEXT_FILTER',
        text:  ''  
    });
});

test('should set sort-by-date action object', () => {
    expect(sortByDate()).toEqual({ type:  'SORT_BY_DATE' });
});

test('should set sort-by-amount action object', () => {
    expect(sortByAmount()).toEqual({ type:  'SORT_BY_AMOUNT' });
})