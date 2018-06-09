const axios = require('axios')
const net = require('net')

const Converter = require('./Converter')
const API_CONVERTER = 'https://www.cbr-xml-daily.ru/daily_json.js'

const converter = new Converter('RUB')
const server = net.createServer((c) => {
  console.log('client connected')
  c.on('end', () => {
    console.log('client disconnected')
  })

  c.on('data', async function (data) {
    const { count, baseCurrency, currency } = JSON.parse(data.toString())
    if (count === undefined || baseCurrency === undefined || currency === undefined) {
      c.write('incorrect data :(')
      return false
    }

    try {
      const response = await axios.get(API_CONVERTER)
      converter.currencies = response.data.Valute
    } catch (error) {
        c.write('api error :(')
        return false
    }

    const value = converter.convert(count, baseCurrency, currency)
    const buf = Buffer.from(JSON.stringify(value))
    c.write(buf)
  })
})

server.on('error', (err) => {
  throw err
})

server.listen(8124, () => {
  console.log('server bound')
})
