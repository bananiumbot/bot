module.exports = async ({ message, telegram, kickChatMember, replyWithSticker }, next) => {
  const bots = message.new_chat_members.filter((member) => member.is_bot)
  for (const bot of bots) {
    await kickChatMember(bot.id)
    await replyWithSticker('CAADAgADrQADVsXcB3r5IHrTHq6QAg')
  }
}
