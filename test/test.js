const formatNumber = require("..//index")

test('edge cases', () => {
  expect(formatNumber(NaN)).toBe('0')
  expect(formatNumber(NaN, { nanZero: false })).toBe('NaN')
  expect(formatNumber(NaN, { minFraction: 2, maxFraction: 2 })).toBe('0.00')

  expect(formatNumber([])).toBe('0')
  expect(formatNumber([3, 4])).toBe('34')

  expect(formatNumber(undefined)).toBe('0')
  expect(formatNumber(null)).toBe('0')
})

test('format numbers', () => {
  expect(formatNumber(0)).toBe('0')
  expect(formatNumber(10000000.15)).toBe('10,000,000.15')
  expect(formatNumber(1.00000004)).toBe('1.00000004')

  // maybe a bug?
  expect(formatNumber(10000000.00000004)).toBe('10,000,000')

  expect(formatNumber(0.0000000000044535)).toBe('0.000000000004454')
  expect(formatNumber(0.0000000000044535, { maximumSignificantDigits: 2 })).toBe('0.0000000000045')

  expect(formatNumber(0, { minFraction: 2, maxFraction: 2 })).toBe('0.00')
})

test('call Intl.NumberFormat correctly', () => {
  global.Intl.NumberFormat = function (locale, opts) {
    this.format = () => ({ locale, opts })
  }

  expect(formatNumber(0, { maxSignificant: 2 }).opts.maximumSignificantDigits).toBe(2)
  expect(formatNumber(0, { maxSignificantDigits: 2 }).opts.maximumSignificantDigits).toBe(2)
  expect(formatNumber(0, { maximumSignificant: 2 }).opts.maximumSignificantDigits).toBe(2)
  expect(formatNumber(0, { minSignificant: 2 }).opts.minimumSignificantDigits).toBe(2)
  expect(formatNumber(0, { minSignificantDigits: 2 }).opts.minimumSignificantDigits).toBe(2)
  expect(formatNumber(0, { minimumSignificant: 2 }).opts.minimumSignificantDigits).toBe(2)
  expect(formatNumber(0, { maxInteger: 2 }).opts.maximumIntegerDigits).toBe(2)

  expect(formatNumber(0).locale).toEqual(['en-US'])
  expect(formatNumber(0).opts).toEqual({
    nanZero: true,
    locale: 'en-US',
    localeMatcher: 'best fit',
    useGrouping: true,
    maximumFractionDigits: 15,
    style: 'decimal'
  })
})
