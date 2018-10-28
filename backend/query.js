const inject = require('injectinto')
const Exe = require('odoql2/exe')

inject('pod', () => {
  const app = inject.one('app')
  app.post('/query', (req, res, next) => {
    const exe = Exe()
    for (let pod of inject.many('query')) pod(req, exe)
    exe
      .now(req.body.q)
      .then((state) => res.send(state))
      .catch((error) => {
        if (error.stack != null) console.error(error.stack)
        else console.error(error)
        res.status(500).send(error)
      })
  })
})
