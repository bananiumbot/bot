const { Composer, Markup } = require('micro-bot')
const fetch = require('node-fetch')

async function sendGag ({ replyWithVideo, i18n }) {
  const page = Math.floor(Math.random() * 100)
  const data = await fetch(`http://developerslife.ru/top/${page}?json=true`).then((res) => res.json())
  const index = Math.floor(Math.random() * data.result.length)
  const gag = data.result[index]
  return replyWithVideo(gag.videoURL, { caption: gag.description })
}

const HideKeyboardExtra = Markup.removeKeyboard().extra()
const AuctionKeyboardExtra = Markup
  .keyboard([
    Markup.button('1BTC'),
    Markup.button('3.50ETH'),
    Markup.button('В личку написал'),
    Markup.button('А есть ссылка на ТЗ?')
  ])
  .resize()
  .extra()

const bot = new Composer()

bot.hears('!joke', sendGag)
bot.hears('!auction', ({ reply }) => reply('Auction mode on', AuctionKeyboardExtra))
bot.hears('!clear', ({ reply }) => reply('Auction mode off', HideKeyboardExtra))
bot.hears('!joke', sendGag)

module.exports = bot
