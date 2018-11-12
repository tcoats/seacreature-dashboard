const fs = require('fs')
const inject = require('injectinto')

inject('pod', () => {
  const hub = inject.one('hub')
  const wamp = inject.one('wamp')

  wamp.regrpc('seacreature.dashboard', 'com.seacreature.version', (id) =>
    fs.stat('./dist/index.html', (err, info) => {
      if (err != null) {
        console.error(err)
        return wamp.resrpc(id, err)
      }
      wamp.resrpc(id, null, [info.mtime.toString()])
    }))
})
