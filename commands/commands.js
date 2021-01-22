module.exports = {
    name: 'commands',                   // command
    description: 'List available commands.',
    execute(msg, args) {                // (msg: the entire message as a string as it was sent, args: array of args via parsed msg first position containing the command followed by preceeding words)
      msg.channel.send('List of currently supported commands: \n' +
                        '!intro: displays the bot\'s introduction. \n' +
                        '!help: pings Igifoshifo and lists a couple helpful options.\n' +
                        '!commands: list a full list of supported commands (what you\'re seeing now.\n' +
                        '!cannon: when MooseRx misses a cannon, can be called out in chat to keep a tallying count. \n' +
                        '!opgg <league tag>: links to specified users opgg. If left blank, defaults to MooseRx.\n');
    },
  };