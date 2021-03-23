module.exports = {
  name: 'intro',                   // command
  description: 'Bot introduction',
  execute(msg, args) {
    // (msg: the entire message as a string as it was sent, 
    //args: array of args via parsed msg first position containing the command followed by preceeding words)
    const { Discord } = require("../index.js");

    const introEmbed = new Discord.MessageEmbed()
      .setTitle('Moose Bot')
      .setDescription('Some description here')
      .addFields(
        { name: 'Regular field title', value: 'Some value here' },
        { name: '\u200B', value: '\u200B' },
        { name: 'Inline field title', value: 'Some value here', inline: true },
        { name: 'Inline field title', value: 'Some value here', inline: true },
      )
      .setTimestamp()
      .setFooter('Full details at: <https://github.com/williammabernathy/Moose-Bot>');

    msg.channel.send(introEmbed);
  },
};