const convert = require('./convert')

test('Convert > Quote 4; Amount 4', () => {
    expect(convert.convert(4, 4)).toBe(16)
})

test('convert > Quote 0; Amount 4', () => {
    expect(convert.convert(0, 4)).toBe(0)
})

test('convert > Quote 4; Amount 0', () => {
    expect(convert.convert(4, 0)).toBe(0)
})

test('formatMoney > 4 -> 4.00', () => {
    expect(convert.formatMoney(4)).toBe('4.00')
})

test('formatMoney > (as string) 4 -> 4.00', () => {
    expect(convert.formatMoney('4')).toBe('4.00')
})