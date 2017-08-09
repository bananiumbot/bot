module.exports = ({ message, reply }) => message.reply_to_message
  ? reply(`User Banned ${message.reply_to_message.from.first_name}`)
  : reply('W00t?')
