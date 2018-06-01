const { Extra } = require('micro-bot')

module.exports = ({ reply, i18n }) => reply(i18n.t('utils.func'), Extra.HTML())
