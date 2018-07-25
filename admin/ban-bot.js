module.exports = async ({ message, telegram, kickChatMember, replyWithSticker }) => {
  const bots = message.new_chat_members.filter((member) => (
    member.is_bot
    || member.first_name.startsWith(`╋VX,QQ（同号）`)
  ))

  if (bots.length > 0) {
    for (const member of bots) {
      await kickChatMember(member.id)
    }
    await replyWithSticker('CAADAgADrQADVsXcB3r5IHrTHq6QAg')
    await context.deleteMessage()
  }
}
