import datetimeElapsed from '@/filters/datetime-elapsed';

describe('datetimeElapsed', () => {
  it.each([
    [''],
    [undefined],
    [null],
  ])('returns \'-\' when passed a falsy value',
    (time) => {
      const actual = datetimeElapsed(time);
      expect(actual).toBe('-');
    });
});
