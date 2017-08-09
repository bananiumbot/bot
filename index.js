const { Composer } = require('micro-bot')
const onlyAdmin = require('./middlewares/only-admin')
const banUser = require('./admin/ban-user')
const sendWelcome = require('./common/send-welcome')
const sendHelp = require('./common/send-help')

const bot = new Composer()

bot.command('/start', sendWelcome)
bot.command('/help', sendHelp)
bot.command('/kick', onlyAdmin, banUser)

module.exports = bot
