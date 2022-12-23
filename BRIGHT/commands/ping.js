module.exports = {
    name: 'ping',
    description: 'test command',
    execute(msg, args) {
        msg.reply('pong');
    }
}

