module.exports = {
    name: 'rank',                   // command
    description: 'per player rank stats',
    execute(msg, args) {
        const { Discord, kayn } = require("../index.js");

        var summoner, fullLeague, statsMessage;

        // if empty, default to mooserx
        if (!args.length) {
            args = 'MooseRx';
        }
        // if two args, combine them (space between name)
        else if (args.length > 1) {
            args = args.join(" ");
        }

        // function get retrieve summoner id via summoner name pulled from args
        // used to check the summoners league in next function
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

        // function to retrieve summoner's ranked data
        // using the id retrieved from previous function
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

        // create the embedded message to display in chat
        async function createEmbeddedMessage(fullLeague) {
            var embeddedMessage, attachment, smnName, tier, rank, lp, wins, losses, ratio;

            smnName = fullLeague[0]['summonerName'];
            tier = fullLeague[0]['tier'];
            rank = fullLeague[0]['rank'];
            lp = fullLeague[0]['leaguePoints'];
            wins = fullLeague[0]['wins'];
            losses = fullLeague[0]['losses'];
            ratio = Math.round((wins / (wins + losses)) * 100)

            attachment = new Discord.MessageAttachment(`./assets/ranked-emblems/Emblem_${tier}.png`, 'rankedIcon.png');

            embeddedMessage = new Discord.MessageEmbed()
                .setColor('#008000')
                .attachFiles(attachment)
                .setTitle(smnName)
                .setDescription('Ranked 5v5 solo/duo queue performance for current season.')
                .setThumbnail('attachment://rankedIcon.png')
                .addFields(
                    { name: 'Rank', value: tier + ' ' + rank, inline: true },
                    { name: 'LP', value: lp, inline: true },
                    { name: 'Win/Loss', value: 'W: ' + wins + '\nL: ' + losses + '\nRatio: ' + ratio + '%', inline: true },
                );

            return embeddedMessage;
        }

        // function containg series of events to build message and retrieve data
        async function postStats() {
            // wait for id to be returned
            summoner = await getSummonerID();

            // if a summoner id was found using the input name, continue on
            if (summoner == undefined) {
                msg.channel.send(`No summoner found for '${args}'.`);
            }
            else {
                fullLeague = await getSummonerLeague();

                // if ranked 5v5 results were found using the summoner id, continue to post message
                if (fullLeague.length == 0) {
                    msg.channel.send(`No ranked data found for '${args}'`);
                }
                else {
                    statsMessage = await createEmbeddedMessage(fullLeague);

                    msg.channel.send(statsMessage);
                }
            }
        }

        postStats();
    }
};