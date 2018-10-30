const h = require('snabbdom/h').default
const ql = require('odoql2')
const inject = require('injectinto')

const deltaline = require('./deltaline')
const totalline = require('./totalline')
const bar = require('./bar')
const deltabar = require('./deltabar')
const markdown = require('./markdown')

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
        h('div.block.r2.c5.w1.h2.centered', [
          h('div.block-unit', [
            h('div.block-value', '1.4k'),
            h('div.block-value-caption', 't of PK screened yesterday')
          ]),
          h('div.block-unit', [
            h('div.block-value', '134'),
            h('div.block-value-caption', 't of PK screened yesterday')
          ]),
          h('div.block-unit', [
            h('div.block-value', '134'),
            h('div.block-value-caption', 't of PK screened yesterday')
          ]),
          h('div.block-unit', [
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
        h('div.block.r2.c3.w2.h2', [
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
        h('div.block.r2.c1.w1.h1', markdown(`
# Title

- one
- two
- three

[link](http://google.com/)
`)),
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
                h('tr', [
                  h('th', 'Dried Distiller Grains'),
                  h('td.deltaline', deltaline([6, 5, 4, 7, 8, 9, 13])),
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
        h('div.block.r1.c6.w2.h2',
          h('div.iframe', h('iframe', { attrs: { src: 'http://downloadit.jswap.co.nz/' } }))),
        h('div.block.r1.c8.w1.h1.danger', [
          h('div.block-title', [
            h('h2', 'Production Rate'),
            h('h3', 'Nationwide')
          ]),
          h('br'),
          h('br'),
          h('br'),
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
        h('div.block.r4.c5.w2.h1', [
          h('div.block-title', [
            h('h2', 'Production Rate'),
            h('h3', 'Nationwide')
          ]),
          h('br'),
          h('br'),
          h('div.deltaline', deltaline([6, 5, 4, 7, 8, 9, 3]))
        ]),
        h('div.block.r2.c2.w1.h1', [
          h('div.block-title', [
            h('h2', 'Production Rate'),
            h('h3', 'Nationwide')
          ]),
          h('br'),
          h('div.totalline', totalline([-6, -2, -4, -2, 6, 9, 3]))
        ]),
        h('div.block.r4.c3.w2.h1', [
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
