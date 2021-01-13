module.exports = {
    name: 'intro',                   // command
    description: 'Bot introduction',
    execute(msg, args) {            // (msg: the entire message as a string as it was sent, args: array of args via parsed msg first position containing the command followed by preceeding words)
      msg.channel.send('Greetings! Intro here.');
    },
  };