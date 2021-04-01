module.exports = {
    name: 'commands',                   // command
    description: 'List available commands.',
    execute(msg, args) {                // (msg: the entire message as a string as it was sent, args: array of args via parsed msg first position containing the command followed by preceeding words)
      msg.channel.send('List of currently supported commands: \n\n' +
      
                        '**!intro**: displays the bot\'s introduction. \n' +
                        '**!help**: pings Igifoshifo and lists a couple helpful options.\n' +
                        '**!commands**: list a full, simple list of supported commands (what you\'re seeing now).\n' +
                        '**!cannon** *<count: options>*: when MooseRx misses a cannon, can be called out in chat to keep a tallying count. !cannon count will display total cannons missed without incrementing the tally. \n' +
                        '                    - constraits: In game & hasn\'t been called recently (10 second cooldown). \n' +
                        '**!rank** *<league username: options>*: displays current ranked 5v5 solo/duo stats. If left blank, defaults to MooseRx. \n' + 
                        '**!mastery** *<league username: options>*: displays mastery points for 15 champions with highest mastery level. If left blank, defaults to MooseRx. \n' + 
                        '**!history** *<league username: options>*: displays most recent 5 games played. If left blank, defaults to MooseRx. \n' +
                        '**!opgg** *<league username: options>*: links to specified users opgg. If left blank, defaults to Moose\'s accounts. \n\n' + 

                        'Plus a few hidden features!\n\n' + 

                        '**Spoilers!** For a full list of commands in detail visit: <https://github.com/williammabernathy/Moose-Bot/tree/master/commands#commands>');
    },
  };