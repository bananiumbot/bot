const naiveDB = {
  '#fsm': 'Python\n\npyTelegramBotAPI: https://groosha.gitbooks.io/telegram-bot-lessons/content/chapter11.html\naiogram: https://surik00.gitbooks.io/aiogram-lessons/content/chapter3.html\n\n#fsm',
  '#webhook': 'https://core.telegram.org/bots/webhooks #webhook'
}

module.exports = ({ message, reply }) => {
  const answer = message.entities
    .filter(({ type }) => type === 'hashtag')
    .map(({ offset, length }) => message.text.substring(offset, offset + length))
    .map((hashtag) => naiveDB[hashtag])
    .filter(Boolean)
    .join('\n')
  answer && reply(answer)
}
