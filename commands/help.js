module.exports = {
    name: 'help',                   // command
    description: 'List general commands and basic bot interactions.',
    execute(msg, args) {            // (msg: the entire message as a string as it was sent, args: array of args via parsed msg first position containing the command followed by preceeding words)
      msg.channel.send('Help us @Igifoshifo you\'re our only hope (A message has also been sent). \n' +
                        'Familiar with node.js, or discord bots in general? Consider putting in a ticket here: <https://github.com/williammabernathy/Moose-Bot/issues> \n' +
                        'Is this part of a correction or update? Submit the pull request here: <https://github.com/williammabernathy/Moose-Bot/pulls>');
    },
  };