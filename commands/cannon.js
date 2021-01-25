module.exports = {
  name: 'cannon',                                         // command
  description: 'Count cannnon minions missed.',
  execute(msg, args) {                                    // (msg: the entire message as a string as it was sent, args: array of args via parsed msg first position containing the command followed by preceeding words)
    const Tags = require("./index.js");

    if (Tags === null) 
    {
      console.info('Tags is null');
    }

    incrCannonCount();

    async function incrCannonCount() {
      const tag = await Tags.findOne({ where: { name: 'cannon' } });
      if (tag) {
        tag.increment('cannons_missed');
        return msg.channel.send(`Moose has missed ${tag.get('cannons_missed')} cannons ):`);
      }
    }

  },
};