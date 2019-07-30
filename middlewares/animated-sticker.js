module.exports = async ({ message }, next) => {
  if (message.sticker && message.sticker.is_animated) {
    return next()
  }
}
