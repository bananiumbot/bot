const { Composer, Markup, Extra } = require('micro-bot');

const bot = new Composer();
bot.command('/start', ({ reply }) => reply('Hey!'));

bot.command('/github', ({ reply }) =>
  reply('Исходники бота',
    Markup.inlineKeyboard([
      Markup.urlButton('GitHub', 'https://github.com/bananiumbot/bot'),
    ]).extra()
  )
);

bot.command('/help', ({ reply }) =>
  reply(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. <a href="https://github.com/bananiumbot/bot">Source</a>`,
    Extra.webPreview(false).HTML()
  )
);

module.exports = bot
