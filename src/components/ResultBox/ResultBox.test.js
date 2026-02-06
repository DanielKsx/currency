import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultBox from './ResultBox';

describe('Component ResultBox', () => {

  it('should render proper info about conversion when PLN -> USD ', () => {
    const testCases = [
      { amount: 100, expected: 'PLN 100.00 = $28.57' },
      { amount: 20, expected: 'PLN 20.00 = $5.71' },
      { amount: 200, expected: 'PLN 200.00 = $57.14' },
      { amount: 345, expected: 'PLN 345.00 = $98.57' },
    ];

    for (const testObj of testCases) {
      render(<ResultBox from="PLN" to="USD" amount={testObj.amount} />);

      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(testObj.expected);

      cleanup();
    }
  });


  it('should render proper info about conversion when USD -> PLN (multiple amounts)', () => {
    const testCases = [
      { amount: 10, expected: '$10.00 = PLN 35.00' },
      { amount: 20, expected: '$20.00 = PLN 70.00' },
      { amount: 50, expected: '$50.00 = PLN 175.00' },
      { amount: 100, expected: '$100.00 = PLN 350.00' },
    ];

    for (const testObj of testCases) {
      render(<ResultBox from="USD" to="PLN" amount={testObj.amount} />);

      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(testObj.expected);

      cleanup();
    }
  });

  it('should render same values when from and to are the same currency', () => {
    const testCases = [
      { currency: 'PLN', amount: 123, expected: 'PLN 123.00 = PLN 123.00' },
      { currency: 'USD', amount: 45, expected: '$45.00 = $45.00' },
    ];

    for (const testObj of testCases) {
      render(
        <ResultBox from={testObj.currency} to={testObj.currency} amount={testObj.amount} />
      );

      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(testObj.expected);

      cleanup();
    }
  });

    it('should render "Wrong value..." when amount is negative', () => {
    render(<ResultBox from="PLN" to="USD" amount={-100} />);

    const output = screen.getByTestId('output');

    expect(output).toHaveTextContent('Wrong value...');
  });
});