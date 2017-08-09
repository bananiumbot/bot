const { Markup, Extra } = require('micro-bot')
const markup = Extra
  .HTML()
  .webPreview(false)
  .markup(Markup.inlineKeyboard([
    Markup.urlButton('GitHub', 'https://github.com/bananiumbot/bot')
  ]))

module.exports = ({ reply }) => {
  return reply(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. <a href="https://github.com/bananiumbot/bot">Source</a>`, markup)
}
