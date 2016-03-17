import test from 'ava'
import formatNumber from '../'

test('edge cases', function (t) {
  t.is(formatNumber(NaN), '0', 'NaN => 0')
  t.is(formatNumber(NaN, { nanZero: false }), 'NaN', 'NaN => NaN')
  t.is(formatNumber(NaN, { minFraction: 2, maxFraction: 2 }), '0.00', '0 => 0.00 (min, max)')

  t.is(formatNumber([]), '0', '[] => 0')
  t.is(formatNumber([3, 4]), '34', '[3, 4] => 34')

  t.is(formatNumber(undefined), '0', 'undefined => 0')
  t.is(formatNumber(null), '0', 'null => 0')
})

test('format numbers', function (t) {
  t.is(formatNumber(0), '0', '0 => 0')
  t.is(formatNumber(10000000.15), '10,000,000.15', '10000000.15 => 10,000,000.15')
  t.is(formatNumber(1.00000004), '1.00000004', '1.00000004 => 1.00000004')

  // maybe a bug?
  t.is(formatNumber(10000000.00000004), '10,000,000', '')

  t.is(formatNumber(0.0000000000044535), '0.000000000004454')
  t.is(formatNumber(0.0000000000044535, { maximumSignificantDigits: 2 }), '0.0000000000045')

  // max => expand to maximum
  t.is(formatNumber(0.0000000000044535, { maxSignificantDigits: 2 }), '0.0000000000045')

  // 'Digits' left off
  t.is(formatNumber(0.0000000000044535, { maximumSignificant: 2 }), '0.0000000000045')
  t.is(formatNumber(0.0000000000044535, { maxSignificant: 2 }), '0.0000000000045')

  t.is(formatNumber(0, { minFraction: 2, maxFraction: 2 }), '0.00', '0 => 0.00 (min, max)')
})
