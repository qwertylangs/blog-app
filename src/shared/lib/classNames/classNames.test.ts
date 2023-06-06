import { classNames } from './classNames';

describe('classNames', () => {
  test('with only first param', () => {
    expect(classNames('cls')).toBe('cls');
  });

  test('with additional class', () => {
    const expected = 'cls class1 class2';
    expect(classNames('cls', {}, ['class1', 'class2'])).toBe(expected);
  });

  test('with mods', () => {
    const expected = 'cls class1 class2 hovered scrollable';
    expect(
      classNames(
        'cls',
        { hovered: true, scrollable: true },
        ['class1', 'class2'],
      ),
    ).toBe(expected);
  });

  test('with mods false', () => {
    const expected = 'cls class1 class2 hovered';
    expect(
      classNames(
        'cls',
        { hovered: true, scrollable: false },
        ['class1', 'class2'],
      ),
    ).toBe(expected);
  });

  test('with mods undefined', () => {
    const expected = 'cls class1 class2 hovered';
    expect(
      classNames(
        'cls',
        { hovered: true, scrollable: undefined },
        ['class1', 'class2'],
      ),
    ).toBe(expected);
  });
});
