module.exports = {
  name: 'cannon',                                         // command
  description: 'Count cannnon minions missed.',
  // (msg: the entire message as a string as it was sent, 
  // args: array of args via parsed msg first position containing the command followed by preceeding words)
  execute(msg, args) {
    var { Tags, kayn } = require("../index.js");
    var currentDate = new Date();

    //msg.channel.send(`One moment, checking constraints...`);

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

      msg.channel.send(`One moment, checking constraints...`)
        .then((thisMsg) => {
          loadingMessage = thisMsg.id;
          console.log(loadingMessage);
        })
        .catch(console.error);
      /*
        .then((msg2) => {
          async function test() {
            while (waiting) {
              var periodsEnding = 1;
              var loadingInd = `.`;

              console.log('while loop: ' + periodsEnding);
              await msg2.edit(`One moment, checking constraints${loadingInd.repeat(periodsEnding)}`);

              periodsEnding++;

              if (periodsEnding > 3) {
                periodsEnding = 1;
              }

              await sleepPromise(300);
            }
          }
          test();
        }).catch(console.error);

      function sleepPromise(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
      }*/

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
                    return (msg.channel.fetchMessages(`${loadingMessage}`)
                      .then(finalMsg => {
                        var fetchedMsg = finalMsg.first();
                        fetchedMsg.edit(`Moose has missed **${tag.get('cannons_missed')}** cannons, "but is still cracked"`);
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
          msg.channel.send(`Moose is currently not in a game.`);
        }
      }

      checkInGameResolution();
    }
    else {
      msg.channel.send(`:no_entry_sign: Please wait ***${Math.floor((currentDate - recentDate) / 1000)} seconds*** before using the !cannon command again.`)
      /*
      .then((thisMsg) => {
        thisMsg.delete((currentDate - recentDate));
      })
      .catch(console.error);
      */
    }


  },
};