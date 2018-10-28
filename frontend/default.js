const h = require('snabbdom/h').default
const ql = require('odoql2')
const inject = require('injectinto')

inject('page:default', ql.component({
  query: (state, params) => {
    return {}
  },
  render: (state, params, hub) => {
    return h('div.wrapper', [
      'Hello'
    ])
  }
}))
