const { Extra } = require('micro-bot')

module.exports = async ({ message, reply, i18n, telegram }) => {
  const answerOptions = Extra.inReplyTo(message.message_id)
  if (!message.reply_to_message) {
    return reply(i18n.t('report.help'), answerOptions)
  }
  await reply(i18n.t('report.done', { user: message.reply_to_message.from }), answerOptions)
  let chatLink = message.chat.title
  if (message.chat.type) {
    if (message.chat.username) {
      chatLink = i18n('utils.link', {
        link: 'https://t.me/' + message.chat.username + '/' + message.message_id,
        title: message.chat.title,
      })
    } else {
      chatLink = i18n('utils.link', {
        link: 'https://t.me/c/' + (0 - message.chat.id - 1000000000000) + '/' + message.message_id, // Костыл ЫЫЫЫЫ
        title: message.chat.title,
      })
    }
  } else {
    chatLink = message.chat.title
  }

  const notification = i18n.t('report.notification', { chat_link: chatLink })
  const admins = await telegram.getChatAdministrators(message.chat.id)
  for (const { user } of admins) {
    await telegram.sendMessage(user.id, notification, Extra.HTML()).catch(() => {})
  }
}
