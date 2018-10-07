const { Extra, optional } = require('micro-bot')

module.exports = optional(({ message }) => message && message.reply_to_message,
  ({ message, reply, i18n }) => reply(i18n.t('meta.done'), Extra.inReplyTo(message.reply_to_message.message_id))
)
