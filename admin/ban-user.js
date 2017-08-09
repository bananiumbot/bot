module.exports = ({ message, reply, i18n }) => message.reply_to_message
  ? reply(i18n.t('admin.user-banned', { user: message.reply_to_message.from }))
  : reply(i18n.t('admin.ban-help'))
