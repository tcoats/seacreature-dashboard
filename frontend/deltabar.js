const h = require('snabbdom/h').default

module.exports = (up, down) => {
  const c = [Math.max(down - up, 0), Math.max(up - down, 0)]
  const children = []
  if (up > 0) children.push(
    h('rect.green', { attrs: { x: c[0], y: 0, width: up, height: 7 } }))
  else {
    const x = c[0] + (down > 0 ? -1 : 1)
    children.push(h('line', { attrs: { x1: x, y1: 0, x2: x, y2: 8 } }))
  }
  if (down > 0) children.push(
    h('rect.red', { attrs: { x: c[1], y: 9, width: down, height: 8 } }))
  else {
    const x = c[1] + (up > 0 ? -1 : 1)
    children.push(h('line', { attrs: { x1: x, y1: 8, x2: x, y2: 16 } }))
  }
  return h('svg.delta', { attrs: { viewBox: '0 0 100 16', width: '100%', preserveAspectRatio: 'none' } }, children)
}
