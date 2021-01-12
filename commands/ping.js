module.exports = {
    name: 'ping',                   // command
    description: 'Ping!',
    execute(msg, args) {            // (msg: the entire message as a string as it was sent, args: array of args via parsed msg first position containing the command followed by preceeding words)
      msg.channel.send('pong');
    },
  };