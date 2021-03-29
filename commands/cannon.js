module.exports = {
  name: 'cannon',                                         // command
  description: 'Count cannnon minions missed.',
  // (msg: the entire message as a string as it was sent, 
  // args: array of args via parsed msg first position containing the command followed by preceeding words)
  execute(msg, args) {
    var { Tags, kayn } = require("../index.js");
    var currentDate = new Date();

    if (args[0] === 'count') {
      async function getCannonCount() {
        const tag = await Tags.findOne({ where: { name: 'MooseRx' } });
        if (tag) {
          // return edited loading message
          return msg.channel.send(`Moose has currently missed **${tag.get('cannons_missed')}** cannons since ${formattedStartDate} (but is still cracked).`);
        }
      }

      getCannonCount();
    }
    else {
      // command can only be called once every 10 second
      if (currentDate - recentDate > 10 * 1000) {
        // value used to check if moose is currently in a game
        global.recentDate = currentDate;
        var isInGame = false;
        var accountsNotInGame = 0;
        var waiting = true;
        var loadingMessage;

        var accSummIDs = [
          '0XjtriK05VQ5-M-NJJnmbEJ1Nj8lAf3ootWGZsDMka1bW7o',
          'FwyAqeEP_SiJ2RrP2ZoqzjrAztG-RQx9Tw1NEbmsDSIzgDhEw8aCOfQUzw',
          'T70Zv4BvEy0kkUX_4NQIBA8qVFYYptTEyJ49MKpBNWVMnm8',
          'mwpRV8mt2cS_yOBgR-n9qmofeIHqb2u7rxLoINd75pcQh9w',
          'O0Ee966CqqPFWDWTAshsczLg4ozjprwFEHFwSZAJcRM-jyODRJKlvNIOAQ'
        ];

        // display the loading message then save the message id
        // to be edited later
        msg.channel.send(`One moment, checking constraints...`)
          .then((thisMsg) => {
            loadingMessage = thisMsg.id;
          })
          .catch(console.error);

        // async function to check all of moose's accounts and see if he's online
        async function checkAllAccounts() {
          return await new Promise((resolve) => {
            var i;
            for (i = 0; i < accSummIDs.length; i++) {
              kayn.CurrentGame.by.summonerID(accSummIDs[i])
                .then(currentMatch => {
                  // function to update cannon's missed
                  async function incrCannonCount() {
                    const tag = await Tags.findOne({ where: { name: 'MooseRx' } });
                    if (tag) {
                      tag.increment('cannons_missed');

                      // return edited loading message
                      return (msg.channel.messages.fetch(`${loadingMessage}`)
                        .then(finalMsg => {
                          finalMsg.edit(`:arrow_double_up: Moose has missed **${tag.get('cannons_missed')+1}** cannons since ${formattedStartDate} (but is still cracked).`);
                        })
                        .catch(console.error));
                    }
                  }

                  // call function to increment cannon count
                  incrCannonCount();

                  waiting = false;
                  resolve(isInGame = true);
                })
                .catch(error => {
                  console.error('Not in game');
                  accountsNotInGame++;
                  if (accountsNotInGame === 5) {
                    waiting = false;
                    resolve(isInGame = false);
                  }
                });
            }
          }).catch(error => console.log(error));
        }

        async function checkInGameResolution() {
          // wait for promises to check if moose is in a game

          var inGameFinalCheck = await checkAllAccounts();

          // isInGame remains false, so moose is not in a game
          if (!inGameFinalCheck) {
            msg.channel.messages.fetch(`${loadingMessage}`)
              .then(finalMsg => {
                finalMsg.edit(`Moose is currently not in a game.`);
              })
              .catch(console.error)
          }
        }

        checkInGameResolution();
      }
      else {
        msg.channel.send(`:timer: Please wait ***${Math.floor(((currentDate - recentDate) / 1000) - 10) * -1} seconds*** before using the !cannon command again. :timer: `)
        /*
        .then((thisMsg) => {
          thisMsg.delete((currentDate - recentDate));
        })
        .catch(console.error);
        */
      }
    }
  },
};