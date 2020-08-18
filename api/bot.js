const Telegraf = require('telegraf')
const Bananium = require('../bananium')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.catch((err) => console.log(err.message, err))
bot.use(Bananium)

module.exports = bot.webhookCallback(`/api/bot?secret=${process.env.SECRET}`)
