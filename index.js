const { Composer } = require('micro-bot')

const bot = new Composer()
bot.command('/start', ({ reply }) => reply('Hey!'));
bot.command('/github', ({reply}) => reply('github.com/bananiumbot/bot'));
module.exports = bot
