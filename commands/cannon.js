module.exports = {
  name: 'cannon',                                         // command
  description: 'Count cannnon minions missed.',
  // (msg: the entire message as a string as it was sent, 
  // args: array of args via parsed msg first position containing the command followed by preceeding words)
  execute(msg, args) {
    const { Tags, kayn } = require("../index.js");

    kayn.Summoner.by.name('MooseRx')
      .callback(function (error, summoner) {
        console.log(summoner);
      })

    kayn.Matchlist.by.accountID('JazaMewXPI-bcGY_6PykYqphxv3i7T8DetrmOokdRhf86PE')
      .query({
        season: 11,
      })
      .callback(function (err, matchlist) {
        console.log(matchlist)
      });

    kayn.CurrentGame.by.summonerID('0XjtriK05VQ5-M-NJJnmbEJ1Nj8lAf3ootWGZsDMka1bW7o')
      .callback(function (err, currentMatch) {
        console.log(currentMatch)
      });

    // function to update cannon count in sql database
    // using the name MooseRx
    async function incrCannonCount() {
      const tag = await Tags.findOne({ where: { name: 'MooseRx' } });
      if (tag) {
        tag.increment('cannons_missed');
        return msg.channel.send(`Moose has missed ${tag.get('cannons_missed')} cannons.`);
      }
    }

    incrCannonCount();

  },
};