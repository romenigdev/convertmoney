const convert = (quote, amount) => quote * amount

const formatMoney = (value) => parseFloat(value).toFixed(2)

module.exports = {
    convert,
    formatMoney
}