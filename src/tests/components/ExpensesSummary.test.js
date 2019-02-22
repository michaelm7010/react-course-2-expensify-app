import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

test('should render expense summary with no expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={0} expensesTotal={0}/>);
    expect(wrapper).toMatchSnapshot();
});
test('should render expense summary with 1 expense', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={234}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render expense summary with multiple expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={12} expensesTotal={1234}/>);
    expect(wrapper).toMatchSnapshot();
});