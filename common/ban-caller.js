const { randomBytes } = require('crypto')
const { Extra } = require('telegraf')

module.exports = async (ctx) => {
  const now = Math.round(Date.now() / 1000)
  const period = Math.round(Math.random() * 50) + 10
  const until = now + 60 * period
  ctx.restrictChatMember(ctx.from.id, { until_date: until })
  const answer = ctx.i18n.t('self-ban', { period })
  const message = await ctx.reply(answer, Extra.inReplyTo(ctx.message.message_id))
  setTimeout(() => {
    ctx.deleteMessage()
    ctx.deleteMessage(message.message_id)
  }, 5)
}
