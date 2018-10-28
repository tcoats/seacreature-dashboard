const fs = require('fs')
const inject = require('injectinto')
const EventEmitter = require('events')

inject('pod', () => {
  const hub = inject.one('hub')
  const wamp = inject.one('wamp')

  wamp.regrpc('seacreature.dashboard', 'server version', (id) =>
    fs.stat('./dist/index.html', (err, info) => {
      if (err != null) {
        console.error(err)
        return wamp.resrpc(id, err)
      }
      wamp.resrpc(id, null, [info.mtime.toString()])
    }))
})
