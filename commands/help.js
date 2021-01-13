module.exports = {
    name: 'help',                   // command
    description: 'List general commands and basic bot interactions.',
    execute(msg, args) {            // (msg: the entire message as a string as it was sent, args: array of args via parsed msg first position containing the command followed by preceeding words)
      msg.channel.send('Help command called.');
    },
  };