const { Extra } = require('micro-bot')

module.exports = async ({ message, reply, i18n, telegram }) => {
  const answerOptions = Extra.inReplyTo(message.message_id)
  if (!message.reply_to_message) {
    return reply(i18n.t('report.help'), answerOptions)
  }
  await reply(i18n.t('report.done', { user: message.reply_to_message.from }), answerOptions)
  const admins = await telegram.getChatAdministrators(message.chat.id)
  const notification = i18n.t('report.notification')
  const notificationOptions = Extra
    .inReplyTo(message.message_id)
    .HTML()
  await Promise.all(
    admins.map(({ user }) => telegram.sendMessage(user.id, notification, notificationOptions).catch(() => {})
  ))
}
