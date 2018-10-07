const Fuse = require('fuse.js')
const helpTopics = require('./bot-api-help.json')

const fuse = new Fuse(helpTopics, {
  shouldSort: true,
  threshold: 0.10,
  keys: ['title', 'description', 'meta']
})

module.exports = ({ inlineQuery, answerInlineQuery }) => {
  const offset = parseInt(inlineQuery.offset) || 0
  const results = fuse.search(inlineQuery.query)
    .slice(offset, offset + 30)
    .map(({ url, title, description }) => ({
      type: 'article',
      id: url.slice(0, 64),
      url,
      title,
      description,
      input_message_content: {
        parse_mode: 'HTML',
        message_text: `<b>${title}</b>\n${description}\n\n${url}`,
        disable_web_page_preview: true
      }
    }))
  return answerInlineQuery(results, { next_offset: offset + 30 })
}
