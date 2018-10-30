const snabby = require('snabby')
const markdownit = require('markdown-it')
const md = require('markdown-it')({
  hmtl: true, breaks: true, linkify: true, typographer: true
})

module.exports = (s) =>
  snabby([`<div class='markdown'>${md.render(s)}</div>`], [])
