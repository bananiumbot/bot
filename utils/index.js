const { Composer, Markup, Extra } = require('micro-bot')
const fetch = require('node-fetch')

const extra = Extra.markup(Markup.inlineKeyboard([
  Markup.callbackButton('MOAR', 'moar')
]))

async function getRandomAnimation () {
  const page = Math.floor(Math.random() * 100)
  const data = await fetch(`http://developerslife.ru/top/${page}?json=true`).then((res) => res.json())
  const index = Math.floor(Math.random() * data.result.length)
  return data.result[index]
}

async function sendAnimation ({ replyWithAnimation }) {
  const gag = await getRandomAnimation()
  return replyWithAnimation(gag.videoURL, { caption: gag.description, ...extra })
}

async function updateAnimation ({ answerCbQuery, editMessageMedia, callbackQuery }) {
  const lastUpdated = callbackQuery.message.edit_date || callbackQuery.message.date
  const delta = Math.floor(Date.now() / 1000) - lastUpdated
  if (delta < 10) {
    return answerCbQuery('⏳ Ожидайте')
  }
  answerCbQuery()
  const gag = await getRandomAnimation()
  return editMessageMedia({
    type: 'animation',
    media: gag.videoURL,
    caption: gag.description
  }, extra)
}

const bot = new Composer()

bot.hears(['!joke', '!tv'], sendAnimation)
bot.action('moar', updateAnimation)

module.exports = bot
