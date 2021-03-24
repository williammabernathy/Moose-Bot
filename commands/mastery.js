module.exports = {
    name: 'mastery',                   // command
    description: 'per player champion mastery',
    execute(msg, args) {
        const { Discord, kayn } = require("../index.js");

        var summoner, fullMastery, allChampions, masteryMessage;

        // if empty, default to mooserx
        if (!args.length) {
            args = 'MooseRx';
        }
        // if two args, combine them (space between name)
        else if (args.length > 1) {
            args = args.join(" ");
        }

        // function get retrieve summoner id via summoner name pulled from args
        // used to check the summoner's mastery in next function
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

        // function to retrieve summoner's mastery data
        // using the id retrieved from previous function
        async function getSummonerMastery() {
            return await new Promise((resolve) => {
                kayn.ChampionMastery.list(summoner['id'])
                    .then(masteryList => {
                        function updateSummonerMastery() {
                            resolve(masteryList);
                        }
                        updateSummonerMastery();
                    }).catch(error => resolve(null));
            }).catch(error => console.log(error));
        }

        // get all champion data
        async function getAllChampions() {
            return await new Promise((resolve) => {
                kayn.DDragon.Champion.list()
                    .then(championList => {
                        function getChampionList() {
                            resolve(championList);
                        }
                        getChampionList();
                    }).catch(error => resolve(null));
            }).catch(error => console.log(error));
        }

        // create the embedded message to display in chat
        async function createEmbeddedMessage(fullMastery, allChampions) {
            var embeddedMessage, championID, championName, championLevel, championPoints;

            //console.log(allChampions.data['Aatrox']);             //this works?

            for (var item in fullMastery) {
                for (var champion in allChampions.data) {
                    if (allChampions.data[champion].key == fullMastery[item]['championId']) {
                        console.log('found champ');
                        break;
                    }
                }

                // don't parse anything below mastery level 5
                if (fullMastery[item]['championLevel'] < 5) {
                    break;
                }
            }

            embeddedMessage = new Discord.MessageEmbed()
                .setTitle('Mastery');

            return embeddedMessage;
        }

        // function containg series of events to build message and retrieve data
        async function postMastery() {
            // wait for id to be returned
            summoner = await getSummonerID();

            // if a summoner id was found using the input name, continue on
            if (summoner == undefined) {
                msg.channel.send(`No summoner found for '${args}'.`);
            }
            else {
                fullMastery = await getSummonerMastery();
                allChampions = await getAllChampions();

                // if mastery results were found using the summoner id, continue to post message
                if (fullMastery === 0) {
                    msg.channel.send(`No mastery data found for '${args}'`);
                }
                else {
                    masteryMessage = await createEmbeddedMessage(fullMastery, allChampions);

                    console.log('end');
                    //msg.channel.send(masteryMessage);
                }
            }
        }

        postMastery();
    }
};