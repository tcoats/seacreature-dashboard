const inject = require('injectinto')

inject('pod', () => {
  const wamp = inject.one('wamp')
  const os = require('os')
  const cpuStat = require('cpu-stat')
  const ƒ = require('seacreature/flow')
  const stream = ƒ.stream()
  const index = ƒ.coalesce((e) => e.name)

  ƒ([
    stream,
    index
  ])

  ƒ([
    stream,
    ƒ.filter((e) => e.name == 'cpu'),
    ƒ.contexttime(10000),
    ƒ.map((events) => {
      return {
      time: ƒ.now(),
      ttl: ƒ.m(1),
      name: 'cpuhistory',
      value: events.map((e) => e.value)
    }}),
    index
  ])

  setInterval(() => {
    const loadavg = os.loadavg()
    stream.emit({
      time: ƒ.now(),
      ttl: ƒ.m(1),
      name: 'load',
      loadavg1: loadavg[0],
      loadavg5: loadavg[1],
      loadavg15: loadavg[2],
      totalmem: os.totalmem(),
      freemem: os.freemem(),
      uptime: os.uptime()
    })
  }, 1000)

  setInterval(() => {
    cpuStat.usagePercent((err, percent, seconds) => {
      if (err) return console.error(err)
      stream.emit({
        time: ƒ.now(),
        ttl: ƒ.m(1),
        name: 'cpu',
        value: percent
      })
    })
  }, 1000)

  const randomId = () => Math.floor(Math.random() * 9007199254740992)
  setInterval(() => {
    wamp.publish('seacreature.dashboard', 'com.seacreature.lake', randomId(), [index.all()], {})
  }, 1000)
})
