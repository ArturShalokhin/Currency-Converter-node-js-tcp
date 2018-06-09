class Converter {
  constructor(baseCurrency, currencies = {}) {
    this._baseCurrency = baseCurrency
    this._currencies = currencies
  }

  /**
   * @param int count
   * @param string baseСurrency
   * @param string currency
   */
  convert (count, baseСurrency, currency) {
    const isExistCurrencies = this.checkIsExistCurrencies(baseСurrency, currency)

    if (!isExistCurrencies) {
      return {
        error: 'validate error',
        message: `Currencies not exist. Available currencies: ${Object.keys(this._currencies)}`
      }
    }

    const baseCurrencyUpperCase = baseСurrency.toUpperCase()
    const currencyUpperCase = currency.toUpperCase()
    const isBaseCurrency = baseCurrencyUpperCase === this._baseCurrency
    const isCurrency = currencyUpperCase === this._baseCurrency

    if (isBaseCurrency || isCurrency) {
      const currencyValue = (isCurrency)
        ? this._currencies[baseCurrencyUpperCase].Value
        : this._currencies[currencyUpperCase].Value
      const diff = currencyValue
      const diffReverse = 1 / currencyValue
      const value = diff * count
      const valueReverse = count / diff
      return {
        inOne: (isCurrency) ? diff : diffReverse,
        value: (isCurrency) ? value : valueReverse
      }
    } else {
      const baseCurrencyValue = this._currencies[baseCurrencyUpperCase].Value
      const currencyValue = this._currencies[currencyUpperCase].Value
      const diff = baseCurrencyValue / currencyValue
      const value = diff * count
      return {
        inOne: diff,
        value
      }
    }
  }

  checkIsExistCurrencies (...currencies) {
    return currencies.every((item) => {
      return Object.keys(this._currencies).some((itemCurrency) => {
        const itemUpperCase = item.toUpperCase()
        return itemCurrency === itemUpperCase || this._baseCurrency === itemUpperCase
      })
    })
  }

  set currencies (currencies) {
    this._currencies = currencies
  }
}

module.exports = Converter
