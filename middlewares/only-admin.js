const debug = require('debug')('bananium:only-admin')

module.exports = async ({ message, reply, i18n, telegram }, next) => {
  const member = await telegram.getChatMember(message.chat.id, message.from.id).catch(debug)
  if (member && (member.status === 'creator' || member.status === 'administrator')) {
    return next()
  }
  return reply(i18n.t('admin.acces-denied'))
}
