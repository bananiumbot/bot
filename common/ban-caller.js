const { randomBytes } = require('crypto')
const { Extra } = require('micro-bot')

const randomRange = {
  start: 10,
  end: 60,
}

const getRandomInt = (min, max) => {
  // Math.random() is not cryptographically secure
  const randomNumber = randomBytes(4).readUIntLE(0, 4) / 0xFFFFFFFF
  return Math.floor(randomNumber * (max - min + 1)) + min
}

module.exports = async (ctx) => {
  const now = Math.floor(Date.now() / 1000)
  const period = getRandomInt(randomRange.start, randomRange.end)
  const until = now + 60 * period
  ctx.restrictChatMember(ctx.from.id, { until_date: until })
  const answer = ctx.i18n.t('self-ban', { period })
  const message = await ctx.reply(answer, Extra.inReplyTo(ctx.message.message_id))
  setTimeout(() => {
    ctx.deleteMessage()
    ctx.deleteMessage(message.message_id)
  }, 5000)
}
