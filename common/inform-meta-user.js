const { Extra } = require('micro-bot')

module.exports = async ({ message, reply, i18n, telegram }) => {
  const answerOptions = Extra.inReplyTo(message.message_id)
  if (message.reply_to_message) {
    return reply(i18n.t('meta.done', { user: message.reply_to_message.from }), answerOptions)
  }
}
