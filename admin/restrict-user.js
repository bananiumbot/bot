module.exports = ({ message, reply, i18n }) => message.reply_to_message
  ? reply(i18n.t('admin.user-restricted', { user: message.reply_to_message.from }))
  : reply(i18n.t('admin.restrict-help'))
