const naiveDB = {
  '#fsm': 'https://groosha.gitbooks.io/telegram-bot-lessons/content/chapter11.html #fsm',
  '#webhook': 'https://core.telegram.org/bots/webhooks #webhook'
}

module.exports = ({ message, reply }) => {
  const answer = message.entities
    .filter(({ type }) => type === 'hashtag')
    .map(({ offset, length }) => message.text.substring(offset, offset + length))
    .map((hashtag) => naiveDB[hashtag])
    .filter(x => x)
    .join('\n')
  answer && reply(answer)
}
