module.exports = {
    name: 'commands',                   // command
    description: 'List available commands.',
    execute(msg, args) {                // (msg: the entire message as a string as it was sent, args: array of args via parsed msg first position containing the command followed by preceeding words)
      msg.channel.send('List of currently supported commands: \n\n' +
      
                        '**!intro**: displays the bot\'s introduction. \n' +
                        '**!help**: pings Igifoshifo and lists a couple helpful options.\n' +
                        '**!commands**: list a full, simple list of supported commands (what you\'re seeing now).\n' +
                        '**!cannon**: when MooseRx misses a cannon, can be called out in chat to keep a tallying count. \n' +
                        '                  - constraits: In game & hasn\'t been called recently (7 second cooldown). \n' +
                        '**!opgg** *<league username>*: links to specified users opgg. If left blank, defaults to Moose\'s accounts. \n\n' + 

                        'Plus a few hidden features!\n\n' + 

                        'For a full list of commands in detail visit: <https://github.com/williammabernathy/Moose-Bot/tree/master/commands#commands>');
    },
  };