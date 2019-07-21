// in future this resticter can be used for other message types
// for example animated stickers

const oneDay = 60 * 60 * 24
const restrictOptions = {
  can_send_messages: true, // text messages, contacts, locations and venues
  can_send_media_messages: false, // audios, documents, photos, videos, video notes and voice notes, implies can_send_messages
  // can_send_other_messages: true, // animations, games, stickers and use inline bots, implies can_send_media_messages
  // can_add_web_page_previews = true, // web page previews to messages, implies can_send_media_messages
}

module.exports = async ({ message, restrictChatMember, deleteMessage }) => {
  deleteMessage() // delete voice message ASAP
  const now = Math.floor(new Date().getTime() / 1000)
  await restrictChatMember(message.from.id, { until_date: now + oneDay, ...restrictOptions })
}
