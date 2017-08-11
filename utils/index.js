const { Composer } = require('micro-bot')
const fetch = require('node-fetch')

async function sendUtilsHelp ({ reply, i18n }) {
  return reply(i18n.t('utils.help'))
}

async function sendGag ({ replyWithVideo, i18n }) {
  const page = Math.floor(Math.random() * 100)
  const data = await fetch(`http://developerslife.ru/top/${page}?json=true`).then((res) => res.json())
  const index = Math.floor(Math.random() * data.result.length)
  const gag = data.result[index]
  return replyWithVideo(gag.videoURL, { caption: gag.description })
}

const bot = new Composer()

bot.hears('!bananium joke', sendGag)
bot.use(sendUtilsHelp)

module.exports = bot
