const { Markup, Extra } = require('telegraf')
const markup = Extra
  .HTML()
  .markup(Markup.inlineKeyboard([
    Markup.urlButton('🤖 Bot source code', 'https://github.com/bananiumbot/bot'),
  ]))

module.exports = ({ reply, i18n }) => reply(i18n.t('common.help'), markup)
