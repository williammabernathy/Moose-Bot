module.exports = {
    name: 'daddy',                   // command
    description: 'T1 meme',
    execute(msg, args) {
        const { Discord } = require("../index.js");

        const daddyEmbed = new Discord.MessageEmbed()
            .setColor('#FF4500')
            .setTitle('Tyler1')
            .setURL('https://i.imgur.com/dyQKrEk.jpg')
            .setAuthor('Tyler1', 'https://i.imgur.com/dyQKrEk.jpg', 'https://www.twitch.tv/loltyler1')
            .setDescription('You guys watch T1 recently?')
            .setThumbnail('https://i.imgur.com/dyQKrEk.jpg')
            .addFields(
                { name: 'T1 streaming right now', value: 'Jesus Murphy, he\'s cracked', inline: true },
            )
            .setImage('https://i.imgur.com/dyQKrEk.jpg')
            .setFooter('Daddy pls');

        msg.channel.send(daddyEmbed);
    },
};