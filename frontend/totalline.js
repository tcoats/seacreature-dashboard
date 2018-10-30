const h = require('snabbdom/h').default

module.exports = (values) => {
  let min = 0
  let max = 0
  for (let v of values) {
    if (v < min) min = v
    if (v > max) max = v
  }
  const y = (v) => 47 - (v - min) / (max - min) * 46
  const coords = values.map((v, i) => [(i / (values.length - 1)) * 97, y(v)])
  const last = coords[coords.length - 1]
  return h('svg.totalline', { attrs: { viewBox: '0 0 100 50', width: '100%', preserveAspectRatio: 'none' } }, [
    h('polyline', { attrs: { points: coords.map((c) =>
      `${c[0]},${c[1]}`).join(' ') } }),
    h('polygon', { attrs: { points: `${coords.map((c) =>
      `${c[0]},${c[1]}`).join(' ')} 97,${y(0)} 0,${y(0)}` } }),
    h('circle', { attrs: { cx: last[0], cy: last[1], r: 2 } })
  ])
}
