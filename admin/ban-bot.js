module.exports = async ({ message, kickChatMember, replyWithSticker, deleteMessage }) => {
  const blacklistes = message.new_chat_members.filter(member => member.is_bot)

  if (blacklistes.length > 0) {
    for (const member of blacklistes) {
      await kickChatMember(member.id)
    }
  }

  await deleteMessage()
}
