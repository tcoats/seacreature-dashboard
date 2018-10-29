const h = require('snabbdom/h').default
const ql = require('odoql2')
const inject = require('injectinto')

inject('page:default', ql.component({
  query: (state, params) => {
    return {}
  },
  render: (state, params, hub) => {
    return h('div.wrapper', [
      h('div.grid', [
        h('div.header', 'Hello'),
        h('div.block.r3.c7.w1.h2', [
          'He',
          h('br'),
          'Ho'
        ]),
        h('div.block.r3.c6.w1.h1'),
        h('div.block.r4.c6.w1.h1'),
        h('div.block.r2.c3.w3.h3'),
        h('div.block.r1.c1.w1.h1'),
        h('div.block.r2.c1.w1.h1'),
        h('div.block.r3.c1.w1.h1'),
        h('div.block.r4.c1.w1.h1'),
        h('div.block.r1.c2.w1.h1'),
        h('div.block.r2.c2.w1.h1'),
        h('div.block.r3.c2.w1.h1'),
        h('div.block.r4.c2.w1.h1'),
        h('div.block.r1.c3.w2.h1'),
        h('div.block.r1.c5.w1.h1'),
        h('div.block.r1.c6.w2.h2'),
        h('div.block.r1.c8.w1.h1'),
        h('div.block.r2.c8.w1.h1'),
        h('div.block.r3.c8.w1.h1'),
        h('div.block.r4.c8.w1.h1')
      ])
    ])
  }
}))
