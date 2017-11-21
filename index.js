const path = require('path')
const { Composer } = require('micro-bot')
const TelegrafI18n = require('telegraf-i18n')
const onlyAdmin = require('./middlewares/only-admin')
const sendWelcome = require('./common/send-welcome')
const sendHelp = require('./common/send-help')
const reportUser = require('./common/report-user')
const inlineHelp = require('./common/inline-help')
const handleHashtag = require('./common/handle-hashtag')
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
bot.hashtag(handleHashtag)
bot.command('/start', sendWelcome)
bot.command('/help', sendHelp)
bot.hears(['/report', '!report'], reportUser)
bot.hears(['/ro', '!ro'], onlyAdmin, restrictUser)
bot.hears(['/ban', '!ban'], onlyAdmin, banUser)
bot.hears(/^!\S+$/, handleUserCommand)

module.exports = bot
