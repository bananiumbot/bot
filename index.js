const path = require('path')
const { Composer } = require('micro-bot')
const TelegrafI18n = require('telegraf-i18n')
const onlyAdmin = require('./middlewares/only-admin')
const sendWelcome = require('./common/send-welcome')
const sendHelp = require('./common/send-help')
const reportUser = require('./common/report-user')
const inlineHelp = require('./common/inline-help')
const handleHashtag = require('./common/handle-hashtag')
const banCaller = require('./common/ban-caller')
const banUser = require('./admin/ban-user')
const banBot = require('./admin/ban-bot')
const restrictUser = require('./admin/restrict-user')
const handleUserCommand = require('./utils')
const handleFunction = require('./utils/function')

const i18n = new TelegrafI18n({
  defaultLanguage: 'ru',
  directory: path.resolve(__dirname, 'locales')
})

const bot = new Composer()

bot.use(i18n)

bot.start(sendWelcome)
bot.command('help', sendHelp)
bot.command('about', sendHelp)
bot.command(['do_not_click', 'ban_me_please'], banCaller)

bot.hears('!report', reportUser)
bot.hears(/^!ro($|\s.*)/, onlyAdmin, restrictUser)
bot.hears('!ban', onlyAdmin, banUser)
bot.hears(/^!\S+$/, handleUserCommand)
bot.hears(/(\sфункционала?(\s|$))/im, handleFunction)

bot.on('new_chat_members', banBot)
bot.on('inline_query', inlineHelp)
bot.hashtag(handleHashtag)

module.exports = bot
