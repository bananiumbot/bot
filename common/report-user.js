const { Extra } = require('telegraf')

module.exports = async ({ message, reply, i18n, telegram }) => {
  const answerOptions = Extra.inReplyTo(message.message_id)
  if (!message.reply_to_message) {
    return reply(i18n.t('report.help'), answerOptions)
  }
  await reply(i18n.t('report.done', { user: message.reply_to_message.from }), answerOptions)
  const notification = i18n.t('report.notification')
  const admins = await telegram.getChatAdministrators(message.chat.id)
  for (const { user } of admins) {
    await telegram.sendMessage(user.id, notification, Extra.HTML()).catch(() => {})
  }
}
