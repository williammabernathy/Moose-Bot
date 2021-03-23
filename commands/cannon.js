module.exports = {
  name: 'cannon',                                         // command
  description: 'Count cannnon minions missed.',
  // (msg: the entire message as a string as it was sent, 
  // args: array of args via parsed msg first position containing the command followed by preceeding words)
  execute(msg, args) {
    const { Tags, kayn } = require("../index.js");

    msg.channel.send(`One moment, checking constraints..`);

    // value used to check if moose is currently in a game
    var isInGame = false;

    var accSummIDs = [
      '0XjtriK05VQ5-M-NJJnmbEJ1Nj8lAf3ootWGZsDMka1bW7o',
      'FwyAqeEP_SiJ2RrP2ZoqzjrAztG-RQx9Tw1NEbmsDSIzgDhEw8aCOfQUzw',
      'T70Zv4BvEy0kkUX_4NQIBA8qVFYYptTEyJ49MKpBNWVMnm8',
      'mwpRV8mt2cS_yOBgR-n9qmofeIHqb2u7rxLoINd75pcQh9w',
      'O0Ee966CqqPFWDWTAshsczLg4ozjprwFEHFwSZAJcRM-jyODRJKlvNIOAQ'
    ];

    function checkAllAccounts() {
      return new Promise(resolve => {
        var i;
        for (i = 0; i < 5; i++) {
          kayn.CurrentGame.by.summonerID(accSummIDs[i])
            .then(currentMatch => {
              // function to update cannon's missed
              async function incrCannonCount() {
                const tag = await Tags.findOne({ where: { name: 'MooseRx' } });
                if (tag) {
                  tag.increment('cannons_missed');
                  return msg.channel.send(`Moose has missed ${tag.get('cannons_missed')} cannons, "but is still cracked"`);
                }
              }

              // call function to increment cannon count
              incrCannonCount();

              resolve(isInGame = true);
            })
            .catch(error => console.error('Not in game'));
        }
      })
    }

    async function checkInGameResolution() {
 
      // wait for promises to check if moose is in a game
      var inGameFinalCheck = await checkAllAccounts();

      // isInGame remains false, so moose is not in a game
      if (!inGameFinalCheck) {
        msg.channel.send(`Moose is currently not in a game.`);
      }
    }

    checkInGameResolution();

  },
};