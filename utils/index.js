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

bot.hears('!url', ({ message, reply }) => {
  const targetMessage = message.reply_to_message
  const fileId = (targetMessage.animation && targetMessage.animation.file_id) ||
    (targetMessage.audio && targetMessage.audio.file_id) ||
    (targetMessage.sticker && targetMessage.sticker.file_id) ||
    (targetMessage.video_note && targetMessage.video_note.file_id) ||
    (targetMessage.video && targetMessage.video.file_id) ||
    (targetMessage.voice && targetMessage.voice.file_id) ||
    (targetMessage.document && targetMessage.document.file_id) ||
    (targetMessage.photo && targetMessage.photo[targetMessage.photo.length - 1].file_id)
  return fileId && reply(`https://tg.now.sh/${fileId}`)
})

bot.hears('!src', ({ message, replyWithHTML }) => {
  const targetMessage = message.reply_to_message
  return targetMessage && replyWithHTML(`<pre>${JSON.stringify(targetMessage, null, 2)}</pre>`)
})

bot.hears(['!joke', '!tv'], sendAnimation)
bot.action('moar', updateAnimation)

module.exports = bot
