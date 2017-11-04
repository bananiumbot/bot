const naiveDB = {
  '#fsm': 'Например: https://groosha.gitbooks.io/telegram-bot-lessons/content/chapter11.html #fsm'
}

module.exports = ({ message, reply }) => Promise.all(
  message.entities
    .filter(({ type }) => type === 'hashtag')
    .map(({ offset, length }) => message.text.substring(offset, offset + length))
    .map((hashtag) => naiveDB[hashtag])
    .filter((message) => message)
    .map(reply)
)
