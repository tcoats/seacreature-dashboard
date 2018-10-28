import classes from './index.styl'

// extension points
require('./default')

// snabbdom
const patch = require('snabbdom').init([
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/props').default,
  require('snabbdom/modules/attributes').default,
  require('snabbdom/modules/style').default,
  require('snabbdom/modules/eventlisteners').default,
])
let current = document.querySelector('#root')
const update = (next) => {
  patch(current, next)
  current = next
}

// odo
const Hub = require('odo-hub')
let state = {}
let params = {
  websocket: { isconnected: false },
  page: 'default'
}
const hub = Hub()

// relay
const inject = require('injectinto')
const exe = require('odoql2/exe')()
exe.missing((queries) => fetch('/query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ q: queries })
  })
  .then(res => res.json()))
exe.on('update', (results) => {
  state = results
  update(inject.one(`page:${params.page}`)(state, params, hub))
})
hub.on('update', p => {
  Object.assign(params, p)
  exe.run(inject.one(`page:${params.page}`).query(state, params) || {})
})

const socket = Hub()
const autobahn = require('autobahn')
const conn = new autobahn.Connection({
  url: 'ws://localhost:8080/wamp', realm: 'seacreature.dashboard'})
let session = null
let currentversion = null
let onopen = []
conn.onopen = (_session, details) => {
  session = _session
  hub.emit('update', { websocket: { isconnected: true }})
  socket.call('server version').then((version) => {
    if (currentversion == null) {
      currentversion = version
      return
    } else if (currentversion != version) {
      location.reload(true)
    }
  }).catch((err) => console.error(err))
  for (let cb of onopen) cb()
  onopen = []
}
conn.onclose = (reason, details) => {
  session = null
  hub.emit('update', { websocket: { isconnected: false }})
}
conn.open()

socket.call = (...args) =>
  session ? session.call(...args)
  : Promise.reject('Socket not open')
socket.publish = (...args) =>
  session ? session.publish(...args)
  : Promise.reject('Socket not open')
socket.subscribe = (topic, fn) => {
  const bind = () => session.subscribe(topic, fn)
  if (session) return bind()
  onopen.push(bind)
}

// execute pods
for (let pod of inject.many('pod')) pod(hub, exe, socket)

// start relay
hub.emit('update')
