import { getQueryParams } from './addQueryParams';

describe('add query params', () => {
  test('with only one param', () => {
    const params = {
      value: '1',
    };
    expect(getQueryParams(params)).toBe('?value=1');
  });

  test('with multiple params', () => {
    const params = {
      value: '1',
      name: 'test',
    };
    expect(getQueryParams(params)).toBe('?value=1&name=test');
  });

  test('with undefined params', () => {
    const params = {
      value: '1',
      name: undefined,
    };
    expect(getQueryParams(params)).toBe('?value=1');
  });
});
