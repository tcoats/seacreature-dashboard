require('dotenv').config()
const hub = require('odo-hub')()
const inject = require('injectinto')
inject('hub', hub)

console.log('Nau mai')
const express = require('express')
const app = express()
inject('app', app)
const http = require('http')
const httpServer = http.createServer(app)
inject('httpServer', httpServer)
app.use(require('compression')())
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}))
app.use(bodyParser.json({
  limit: '50mb'
}))
app.set('json spaces', 2)

const url = require('url')
const WebSocketServer = require('ws').Server
const wsServer = new WebSocketServer({ noServer: true })
httpServer.on('upgrade', (req, socket, head) => {
  const pathname = url.parse(req.url).pathname
  if (pathname === '/wamp') wsServer.handleUpgrade(req, socket, head, (ws) =>
    wsServer.emit('connection', ws, req))
  else {
    console.log(pathname)
    socket.destroy()
  }
})
inject('socketServer', wsServer)
inject('wamp', require('odo-wamp')(wsServer))

require('./websockets')
require('./query')

for (let pod of inject.many('pod')) pod()

app.use('/dist', express.static(`${__dirname}/../dist`))
app.get('/*', (req, res, next) => {
  res.sendFile('./index.html', { root: './dist' })
})

const pjson = require('../package.json')
httpServer.listen(8080, () => {
  const host = httpServer.address().address
  const boundport = httpServer.address().port
  console.log(`http server listening on ${host}:${boundport}`)
  shutdown = () => {
    console.log(`Ōhākī shutting down`)
    hub.emit('shutdown', null).then(() => {
      console.log('E noho rā')
      process.exit(0)
    })
  }
  process.on('SIGTERM', shutdown)
  process.on('SIGINT', shutdown)
})
