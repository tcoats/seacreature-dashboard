const h = require('snabbdom/h').default

module.exports = (percentage) => {
  return h('svg.bar', { attrs: { viewBox: '0 0 100 16', width: '100%', preserveAspectRatio: 'none' } }, [
    h('rect', { attrs: { x: 0, y: 0, width: percentage, height: 16 } })
  ])
}
