module.exports = async ({ message, kickChatMember, replyWithSticker }) => {
  const blacklistes = message.new_chat_members.filter((member) => (
    member.is_bot ||
    member.first_name.startsWith(`╋VX,QQ（同号）`)
  ))

  if (blacklistes.length > 0) {
    for (const member of blacklistes) {
      await kickChatMember(member.id)
    }
    await replyWithSticker('CAADAgADrQADVsXcB3r5IHrTHq6QAg')
  }
}
