module.exports = {
  name: 'intro',                   // command
  description: 'Bot introduction',
  execute(msg, args) {
    // (msg: the entire message as a string as it was sent, 
    //args: array of args via parsed msg first position containing the command followed by preceeding words)
    const { Discord } = require("../index.js");

    const introEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Moose Bot')
      .setDescription('Bot designed to track MooseRx\'s League of Legends endeavors with additional features regarding League of Legends stats and more!')
      .addFields(
        { name: '!intro', value: 'Posts this embedded message.', inline: true },
        { name: '!commands', value: 'Displays a quick and simple list of commands', inline: true },
        { name: '!help', value: 'Pings Igifoshifo and also sends a message requesting help.', inline: true },
        { name: '!opgg <username: optional>', value: 'Post link to opgg of specified username. \nIf left blank, defaults to list of Moose\'s accounts', inline: true },
        { name: '!cannon <\'cannon\': option>', value: 'Keeps a tally of cannons missed by Moose (not bound to specific account, but collection of accounts). !cannon count display total cannons missed.', inline: true },
        { name: 'And more...', value: 'Additional hidden features not mentioned by the bot or in documentation! \nCheck out the full list by following the footer link, so use !commands to see a simple list.', inline: true },

      )
      .setFooter('Full details at: <https://github.com/williammabernathy/Moose-Bot#moose-bot>');

    msg.channel.send(introEmbed);
  },
};
