const h = require('snabbdom/h').default
const ql = require('odoql2')
const inject = require('injectinto')

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
        h('div.block.r3.c7.w1.h2.centered', [
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
        h('div.block.r3.c6.w1.h1', [
          h('div.block-title', [
            h('h2', 'Important Block'),
            h('h3', 'Caption goes here.')
          ]),
          h('div.block-unit', [
            h('div.block-value', '1.4k'),
            h('div.block-value-caption', 't of PK screened yesterday')
          ])
        ]),
        h('div.block.r4.c6.w1.h1'),
        h('div.block.r2.c3.w3.h3', [
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
        h('div.block.r1.c1.w1.h1', [
          h('div.block-unit.full.centered', [
            h('div.block-unit', [
              h('div.block-value', '134'),
              h('div.block-value-caption', 't of PK screened yesterday')
            ])
          ])
        ]),
        h('div.block.r2.c1.w1.h1'),
        h('div.block.r3.c1.w1.h1', [
          h('div.block-unit.full.centered.danger', h('div.block-unit', [
            h('div.block-value', '134'),
            h('div.block-value-caption', 't of PK screened yesterday')
          ]))
        ]),
        h('div.block.r4.c1.w1.h1'),
        h('div.block.r1.c2.w1.h1'),
        h('div.block.r2.c2.w1.h1'),
        h('div.block.r3.c2.w1.h1'),
        h('div.block.r4.c2.w1.h1'),
        h('div.block.r1.c3.w2.h1'),
        h('div.block.r1.c5.w1.h1'),
        h('div.block.r1.c6.w2.h2.x2', [
          h('div.block-unit.full.centered', h('div.block-unit', [
            h('div.block-value', '134'),
            h('div.block-value-caption', 't of PK screened yesterday')
          ]))
        ]),
        h('div.block.r1.c8.w1.h1'),
        h('div.block.r2.c8.w1.h1'),
        h('div.block.r3.c8.w1.h1'),
        h('div.block.r4.c8.w1.h1')
      ]
    ]))
  }
}))
