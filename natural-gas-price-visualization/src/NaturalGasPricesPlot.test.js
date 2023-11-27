/**
 * Jest Unit Testing NaturalGasPricesPlot.test.js
 * @ author - Frank Luo
 * Sources Used: 
 * https://www.testim.io/blog/jest-testing-a-helpful-introductory-tutorial/
 * https://jestjs.io/docs/getting-started
 * https://dev.to/dstrekelj/how-to-write-unit-tests-in-javascript-with-jest-2e83
 * https://www.youtube.com/watch?v=FgnxcUQ5vho 
 */

// Importing necessary components
import { loadData, leastSquares } from './NaturalGasPricesPlot';
import * as d3 from 'd3';

// Mocking d3.csvParse and global fetch
jest.mock('d3', () => ({
  csvParse: jest.fn(),
}));

global.fetch = jest.fn();

describe('NaturalGasPricesPlot Helper Functions', () => {
  // Resetting mocks before each test
  beforeEach(() => {
    fetch.mockClear();
    d3.csvParse.mockClear();
  });

  // Testing loadData function
  describe('loadData', () => {
    it('Fetches data and parses it correctly', async () => {
      // Mocking fetch and csvParse responses
      fetch.mockImplementationOnce(() => Promise.resolve({
        text: () => Promise.resolve("Date,Price\n1997-01-07,3.82\n1997-01-08,3.80"),
      }));
      d3.csvParse.mockImplementationOnce(rawData => rawData.split('\n').slice(1).map(row => {
        const [date, price] = row.split(',');
        return { date: new Date(date), price: parseFloat(price) };
      }));

      const data = await loadData('/daily_csv.csv');
      expect(fetch).toHaveBeenCalledWith('/daily_csv.csv');
      expect(d3.csvParse).toHaveBeenCalled();
      expect(data).toEqual([
        { date: new Date('1997-01-07'), price: 3.82 },
        { date: new Date('1997-01-08'), price: 3.80 },
      ]);
    });

    it('should handle fetch errors', async () => {
      fetch.mockImplementationOnce(() => Promise.reject(new Error('Network error')));
      const data = await loadData('/daily_csv.csv');
      expect(data).toEqual([]); // Expecting an empty array in case of an error
    });
  });

  // Testing leastSquares function
  describe('leastSquares', () => {
    it('Calculates the correct regression line', () => {
      const dataPoints = [
        { date: new Date('2021-01-01'), price: 20 },
        { date: new Date('2021-02-01'), price: 25 }
      ];
      const [m, b] = leastSquares(dataPoints);

      const expectedSlope = 1.8667861409796892e-9; 
      const expectedIntercept = -2984.516129032258; 

      expect(m).toBeCloseTo(expectedSlope, 5);
      expect(b).toBeCloseTo(expectedIntercept, 5);
    });
  });
});
