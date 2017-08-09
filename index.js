const path = require('path')
const { Composer } = require('micro-bot')
const TelegrafI18n = require('telegraf-i18n')
const onlyAdmin = require('./middlewares/only-admin')
const banUser = require('./admin/ban-user')
const sendWelcome = require('./common/send-welcome')
const sendHelp = require('./common/send-help')

const i18n = new TelegrafI18n({
  defaultLanguage: 'ru',
  directory: path.resolve(__dirname, 'locales')
})

const bot = new Composer()

bot.use(i18n)
bot.command('/start', sendWelcome)
bot.command('/help', sendHelp)
bot.command('/kick', onlyAdmin, banUser)

module.exports = bot
