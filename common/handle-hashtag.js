const KnownHashtags = ['fsm', 'webhook', 'aws', 'chats', 'api']

module.exports = ({ message, i18n, replyWithHTML }) => {
  const answer = message.entities
    .filter(({ type }) => type === 'hashtag')
    .map(({ offset, length }) => message.text.substring(offset + 1, offset + length))
    .filter((hashtag) => KnownHashtags.includes(hashtag))
    .map((hashtag) => i18n.t(`topics.${hashtag}`))
    .join('\n')
  answer && replyWithHTML(answer)
}
