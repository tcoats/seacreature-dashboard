const h = require('snabbdom/h').default
const ql = require('odoql2')
const inject = require('injectinto')
const snabby = require('snabby')
const markdownit = require('markdown-it')
const md = require('markdown-it')({
  hmtl: true, breaks: true, linkify: true, typographer: true
})

const deltaline = (values) => {
  let min = +Infinity
  let max = -Infinity
  for (let v of values) {
    if (v < min) min = v
    if (v > max) max = v
  }
  const y = (v) => 14 - (v - min) / (max - min) * 12
  const coords = values.map((v, i) => [(i / (values.length - 1)) * 97, y(v)])
  const last = coords[coords.length - 1]
  return h('svg.deltaline', { attrs: { viewBox: '0 0 100 16', width: '100%', preserveAspectRatio: 'none' } }, [
    h('polyline', { attrs: { points: coords.map((c) =>
      `${c[0]},${c[1]}`).join(' ') } }),
    h('circle', { attrs: { cx: last[0], cy: last[1], r: 2 } })
  ])
}

const totalline = (values) => {
  let min = 0
  let max = 0
  for (let v of values) {
    if (v < min) min = v
    if (v > max) max = v
  }
  const y = (v) => 48 - (v - min) / (max - min) * 46
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

const bar = (percentage) => {
  return h('svg.bar', { attrs: { viewBox: '0 0 100 16', width: '100%', preserveAspectRatio: 'none' } }, [
    h('rect', { attrs: { x: 0, y: 0, width: percentage, height: 16 } })
  ])
}

const deltabar = (up, down) => {
  const c = [Math.max(down - up, 0), Math.max(up - down, 0)]
  const children = []
  if (up > 0) children.push(
    h('rect.green', { attrs: { x: c[0], y: 0, width: up, height: 8 } }))
  else {
    const x = c[0] + (down > 0 ? -1 : 1)
    children.push(h('line', { attrs: { x1: x, y1: 0, x2: x, y2: 8 } }))
  }
  if (down > 0) children.push(
    h('rect.red', { attrs: { x: c[1], y: 8, width: down, height: 8 } }))
  else {
    const x = c[1] + (up > 0 ? -1 : 1)
    children.push(h('line', { attrs: { x1: x, y1: 8, x2: x, y2: 16 } }))
  }
  return h('svg.delta', { attrs: { viewBox: '0 0 100 16', width: '100%', preserveAspectRatio: 'none' } }, children)
}

inject('page:default', ql.component({
  query: (state, params) => {
    return {}
  },
  render: (state, params, hub) => {
    return h('div.wrapper', h('div.dashboard', [
      h('div.dashboard-title', [
        h('h1', 'Super Important Dashboard'),
        h('p', 'Some text here to describe the stuff.')
      ]),
      h('div.dashboard-logo', h('img', { props: { src: '/dist/logo.svg' } })),
      ...[
        h('div.block.r3.c6.w1.h2.centered', [
          h('div.block-unit', [
            h('div.block-value', '1.4k'),
            h('div.block-value-caption', 't of PK screened yesterday')
          ]),
          h('div.block-unit', [
            h('div.block-value', '134'),
            h('div.block-value-caption', 't of PK screened yesterday')
          ]),
          h('div.block-unit.danger', [
            h('div.block-value', '134'),
            h('div.block-value-caption', 't of PK screened yesterday')
          ]),
          h('div.block-unit.danger', [
            h('div.block-value', '134'),
            h('div.block-value-caption', 't of PK screened yesterday')
          ])
        ]),
        h('div.block.r1.c2.w1.h1', [
          h('div.block-title', [
            h('h2', 'Important Block'),
            h('h3', 'Caption goes here.')
          ]),
          h('div.block-unit', [
            h('div.block-value', '1.4k'),
            h('div.block-value-caption', 't of PK screened yesterday')
          ])
        ]),
        h('div.block.r2.c3.w3.h3.x1point5', [
          h('div.block-title', [
            h('h2', 'Product Stock'),
            h('h3', 'Nationwide')
          ]),
          h('div.block-unit', [
            h('table', [
              h('thead.rotate', h('tr', [
                h('th', h('div', h('span', ''))),
                h('th', h('div', h('span', 'Papakura'))),
                h('th', h('div', h('span', 'Mount'))),
                h('th', h('div', h('span', 'Matamata'))),
                h('th', h('div', h('span', 'New Plymouth'))),
                h('th', h('div', h('span', 'Christchurch')))
              ])),
              h('tbody', [
                h('tr', [
                  h('th', 'Palm Kernel'),
                  h('td', '1.9k'),
                  h('td', '1.9k'),
                  h('td', '1.9k'),
                  h('td', '1.9k'),
                  h('td', '1.9k')
                ]),
                h('tr', [
                  h('th', 'Dried Distiller Grains'),
                  h('td', '1.9k'),
                  h('td', '1.9k'),
                  h('td', '1.9k'),
                  h('td', '1.9k'),
                  h('td', '1.9k')
                ]),
                h('tr', [
                  h('th', 'Tapioca Meal'),
                  h('td', '1.9k'),
                  h('td', '1.9k'),
                  h('td.danger', '1.9k'),
                  h('td', '1.9k'),
                  h('td', '1.9k')
                ]),
                h('tr', [
                  h('th', 'Palm Kernel'),
                  h('td', '1.9k'),
                  h('td', '1.9k'),
                  h('td', '1.9k'),
                  h('td', '1.9k'),
                  h('td', '1.9k')
                ]),
                h('tr', [
                  h('th', 'Dried Distiller Grains'),
                  h('td', '1.9k'),
                  h('td', '1.9k'),
                  h('td', '1.9k'),
                  h('td', '1.9k'),
                  h('td', '1.9k')
                ]),
                h('tr', [
                  h('th', 'Tapioca Meal'),
                  h('td', '1.9k'),
                  h('td', '1.9k'),
                  h('td.danger', '1.9k'),
                  h('td', '1.9k'),
                  h('td', '1.9k')
                ])
              ])
            ])
          ])
        ]),
        h('div.block.r2.c1.w1.h1',
          snabby([`<div class='markdown'>${md.render(`
# Title

- one
- two
- three

[link](http://google.com/)
`)}</div>`], [])),
        h('div.block.r1.c1.w1.h1', [
          h('div.block-title', [
            h('h2', 'Release countdown'),
            h('h3', 'Time until we release')
          ]),
          h('div.block-unit', [
            h('div.block-value', '5d 25h'),
            h('div.block-value-caption', '23m 39s')
          ])
        ]),
        h('div.block.r3.c1.w2.h2', [
          h('div.block-title', [
            h('h2', 'Production Rate'),
            h('h3', 'Per day over the last month')
          ]),
          h('div.block-unit', [
            h('table', [
              h('tbody', [
                h('tr', [
                  h('th', 'Palm Kernel'),
                  h('td.bar', bar(65)),
                  h('td', '1.4kt')
                ]),
                h('tr', [
                  h('th', 'Dried Distiller Grains'),
                  h('td.deltaline', deltaline([6, 5, 4, 7, 8, 9, 3])),
                  h('td', '27.5kt')
                ]),
                h('tr.danger', [
                  h('th', 'Tapioca Meal'),
                  h('td.bar.green', bar(100)),
                  h('td', '1.9kt')
                ]),
                h('tr', [
                  h('th', 'Tapioca Meal'),
                  h('td.bar', deltabar(20, 10)),
                  h('td', '1.9kt')
                ]),
                h('tr', [
                  h('th', 'Tapioca Meal'),
                  h('td.bar', deltabar(10, 60)),
                  h('td', '1.9kt')
                ]),
                h('tr', [
                  h('th', 'Tapioca Meal'),
                  h('td.bar', deltabar(0, 60)),
                  h('td', '1.9kt')
                ]),
                h('tr', [
                  h('th', 'Tapioca Meal'),
                  h('td.bar', deltabar(10, 0)),
                  h('td', '1.9kt')
                ]),
                h('tr', [
                  h('th', 'Tapioca Meal'),
                  h('td.bar', deltabar(0, 0)),
                  h('td', '1.9kt')
                ])
              ])
            ])
          ])
        ]),
        h('div.block.r1.c3.w2.h1', [
          h('div.block-title', [
            h('h2', 'Product Stock'),
            h('h3', 'Nationwide')
          ]),
          h('div.block-unit', [
            h('table', [
              h('tbody', [
                h('tr', [
                  h('th', 'Palm Kernel'),
                  h('td.bar.green', bar(65)),
                  h('td', '1.4kt')
                ]),
                h('tr', [
                  h('th', 'Dried Distiller Grains'),
                  h('td.bar.green', bar(80)),
                  h('td', '27.5kt')
                ]),
                h('tr.danger', [
                  h('th', 'Tapioca Meal'),
                  h('td.bar.green', bar(100)),
                  h('td', '1.9kt')
                ])
              ])
            ])
          ])
        ]),
        h('div.block.r1.c5.w1.h1', [
          h('div.block-title', [
            h('h2', 'Product Stock'),
            h('h3', 'Nationwide')
          ]),
          h('div.block-unit', [
            h('table', [
              h('tbody', [
                h('tr.danger', [
                  h('th', 'PK'),
                  h('td', h('span.green', '+1.4kt   ▲'))
                ]),
                h('tr', [
                  h('th', 'DDG'),
                  h('td', h('span.red', '-27kt   ▼'))
                ]),
                h('tr', [
                  h('th', 'TAP'),
                  h('td', h('span.green', '+27kt   ▲'))
                ])
              ])
            ])
          ])
        ]),
        h('div.block.r1.c6.w2.h2'),
        h('div.block.r1.c8.w1.h1.danger', [
          h('div.block-title', [
            h('h2', 'Production Rate'),
            h('h3', 'Nationwide')
          ]),
          h('div.totalline', totalline([6, 5, 4, 7, 8, 9, 3]))
        ]),
        h('div.block.r2.c8.w1.h1.purple', [
          h('div.block-title', [
            h('h2', 'Production Rate'),
            h('h3', 'Nationwide')
          ]),
          h('div.block-unit', [
            h('div.block-value', '134'),
            h('div.block-value-caption', 't of PK screened yesterday')
          ]),
          h('div.deltaline', deltaline([6, 5, 4, 7, 8, 9, 3]))
        ]),
        h('div.block.r2.c2.w1.h1', [
          h('div.block-title', [
            h('h2', 'Production Rate'),
            h('h3', 'Nationwide')
          ]),
          h('div.totalline', totalline([-6, -2, -4, -2, 6, 9, 3]))
        ]),
        h('div.block.r3.c7.w2.h2', [
          h('div.block-title', [
            h('h2', 'Production Rate'),
            h('h3', 'Nationwide')
          ]),
          h('table.comparison', h('tbody', [
            h('tr', [
              h('td', [
                h('div.block-value', '134'),
                h('div.block-value-caption', 't of PK screened yesterday')
              ]),
              h('td', [
                h('div.block-value-small', h('span.green', '+5%  ▲')),
                h('div.block-value-caption', 'compared')
              ])
            ]),
            h('tr', [
              h('td', [
                h('div.block-value', '134'),
                h('div.block-value-caption', 't of PK screened yesterday')
              ]),
              h('td', [
                h('div.block-value-small', h('span.green', '+5%  ▲')),
                h('div.block-value-caption', 'compared')
              ])
            ]),
            h('tr', [
              h('td', [
                h('div.block-value', '134'),
                h('div.block-value-caption', 't of PK screened yesterday')
              ]),
              h('td', [
                h('div.block-value-small', h('span.green', '+5%  ▲')),
                h('div.block-value-caption', 'compared')
              ])
            ])
          ]))
        ])
      ]
    ]))
  }
}))
