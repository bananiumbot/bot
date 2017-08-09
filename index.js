const { Composer } = require('micro-bot')

const bot = new Composer()
bot.command('/start', ({ reply }) => reply('Hey!'))

module.exports = bot
