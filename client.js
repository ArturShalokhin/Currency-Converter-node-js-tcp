const net = require('net')
const readline = require('readline')

const rl = readline.createInterface(process.stdin, process.stdout, null);

const client = net.createConnection({ port: 8124 }, () => {
	rl.question('*** Converter *** \n example (1 byn->usd) \n Write: ', question);
})

client.on('end', () => {
  console.log('disconnected from server')
})

client.on('data', (data) => {
  console.log('ответ> ' + data);
})

function question (answer) {
	const answerSplit = answer.toString().split(/[\s->]+/)
	const count = answerSplit[0]
	const baseCurrency = answerSplit[1]
	const currency = answerSplit[2]
	const data = { baseCurrency, currency, count }
	const buf = Buffer.from(JSON.stringify(data))
  client.write(buf)

  rl.question('Write: ', question);
}

