const path = require('path')
const { Composer } = require('micro-bot')
const TelegrafI18n = require('telegraf-i18n')
const onlyAdmin = require('./middlewares/only-admin')
const sendWelcome = require('./common/send-welcome')
const sendHelp = require('./common/send-help')
const reportUser = require('./common/report-user')
const inlineHelp = require('./common/inline-help')
const banUser = require('./admin/ban-user')
const banBot = require('./admin/ban-bot')
const restrictUser = require('./admin/restrict-user')
const handleUserCommand = require('./utils')

const i18n = new TelegrafI18n({
  defaultLanguage: 'ru',
  directory: path.resolve(__dirname, 'locales')
})

const bot = new Composer()

bot.use(i18n)
bot.on('new_chat_member', banBot)
bot.on('inline_query', inlineHelp)
bot.command('/start', sendWelcome)
bot.command('/help', sendHelp)
bot.command('/report', reportUser)
bot.command('/ro', onlyAdmin, restrictUser)
bot.command('/ban', onlyAdmin, banUser)
bot.hears(/^!b .*/, handleUserCommand)
bot.on('audio', ({ message, reply }) => reply(`https://tg.now.sh/${message.audio.file_id}`))

module.exports = bot
