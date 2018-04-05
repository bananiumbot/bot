module.exports = async ({ message, reply, i18n, restrictChatMember }) => {
  if (!message.reply_to_message) {
    return reply(i18n.t('admin.restrict-help'))
  }
  const now = Math.floor(new Date().getTime() / 1000)
  const targetUser = message.reply_to_message.from
  await reply(i18n.t('admin.user-restricted', { user: targetUser }))
  await restrictChatMember(targetUser.id, { until_date: now + 60 * 15 })
}
