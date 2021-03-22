module.exports = {
  name: 'cannon',                                         // command
  description: 'Count cannnon minions missed.',
  // (msg: the entire message as a string as it was sent, 
  // args: array of args via parsed msg first position containing the command followed by preceeding words)
  execute(msg, args) { 
    const { Tags, kayn } = require("../index.js");incrCannonCount();

    kayn.Summoner.by.name('MooseRx').callback(function(err, summoner) {
      // do something
    })

    async function incrCannonCount() {
      const tag = await Tags.findOne({ where: { name: 'MooseRx' } });
      if (tag) {
        tag.increment('cannons_missed');
        return msg.channel.send(`Moose has missed ${tag.get('cannons_missed')} cannons.`);
      }
    }

  },
};