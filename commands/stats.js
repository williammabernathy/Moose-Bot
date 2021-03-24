module.exports = {
    name: 'stats',                   // command
    description: 'per player stats',
    execute(msg, args) {
        const { Discord, kayn } = require("../index.js");

        var summoner;
        var fullLeague;
        var statsMessage;

        // if empty, default to mooserx
        if (!args.length) {
            args = 'MooseRx';
        }
        // if two args, combine them (space between name)
        else if (args.length > 1) {
            args = args.join(" ");
        }

        async function getSummonerID() {
            return await new Promise((resolve) => {
                kayn.Summoner.by.name(args)
                    .then(smn => {
                        function updateSummonerID() {
                            resolve(smn);
                        }
                        updateSummonerID();
                    }).catch(error => resolve(null));
            }).catch(error => console.log('catch 2'));
        }

        async function getSummonerLeague() {
            return await new Promise((resolve) => {
                kayn.League.Entries.by.summonerID(summoner['id'])
                    .then(fullLeagueCall => {
                        function updateSummonerLeague() {
                            resolve(fullLeagueCall);
                        }
                        updateSummonerLeague();
                    }).catch(error => resolve(null));
            }).catch(error => console.log(error));
        }

        function createEmbeddedMessage(fullLeague) {
            var embeddedMessage;

            return embeddedMessage;
        }

        async function postStats() {
            // wait for id to be returned
            summoner = await getSummonerID();

            if (summoner == undefined) {
                msg.channel.send(`No summoner found for '${args}'.`);
            }
            else {
                fullLeague = await getSummonerLeague();

                console.log(fullLeague);

                if (fullLeague.length == 0) {
                    msg.channel.send(`No ranked data found for ${args}`);
                }
                else {
                    //statsMessage = createEmbeddedMessage(fullLeague);

                    msg.channel.send('embedded mesage here');
                }
            }
        }

        postStats();
    }
};