module.exports = {
    name: 'dev',                   // command
    description: 'dev override',
    execute(msg, args) {
        var { Tags, kayn } = require("../index.js");
        var { devs } = require("../config.json");

        // check if the user issuing the !dev command is Igifoshifo
        if (devs.indexOf(msg.author.id.toString()) < 0) {
            msg.channel.send('You do not have permission to use this command.');
        }
        else {
            // update cannon tally manually
            if (args[0] === 'cannon') {

                // function to parse a string to check if it's a positive integer
                function isNormalInteger(str) {
                    var n = Math.floor(Number(str));
                    return n !== Infinity && String(n) === str && n >= 0;
                }

                if (isNormalInteger(args[1])) {
                    // update the cannons_missed database under MooseRx
                    async function editCannonCount() {
                        const tag = await Tags.update({ cannons_missed: args[1] }, { where: { name: 'MooseRx' } });
                        if (tag > 0) {
                            // return edited loading message
                            return msg.channel.send(`Moose cannon tally updated to: **${args[1]}** cannons missed.`);
                        }
                        return msg.channel.send(`Moose cannon tally could not be udpated.`);
                    }

                    editCannonCount();
                }
                else {
                    msg.channel.send('Missing value/Value passed to cannon table must be an integer.');
                }
            }
            else if (args[0] === 'flush') {
                kayn.flushCache()
                    .then(console.log)
                    .catch(console.err)
            }
            else {
                msg.channel.send('Please specify a sub command.');
            }
        }


    },
};