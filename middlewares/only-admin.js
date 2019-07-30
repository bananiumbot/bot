const debug = require('debug')('bananium:only-admin')

module.exports = async ({ message, telegram }, next) => {
  const member = await telegram.getChatMember(message.chat.id, message.from.id).catch(debug)
  if (member && (member.status === 'creator' || member.status === 'administrator')) {
    return next()
  }
}
