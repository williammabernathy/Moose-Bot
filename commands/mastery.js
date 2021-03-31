module.exports = {
    name: 'mastery',                   // command
    description: 'per player champion mastery',
    execute(msg, args) {
        const { Discord, kayn } = require("../index.js");

        var summoner, fullMastery, allChampions, masteryMessage, attachment;

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
            var embeddedMessage, championName;

            attachment = new Discord.MessageAttachment(`./assets/mastery/mastery7.png`, 'mastery.png');

            embeddedMessage = {
                color: '#9370DB',
                title: `Mastery for ${args}`,
                thumbnail: {
                    url: 'attachment://mastery.png',
                },
                description: 'Mastery for top 15 champions by total mastery points (limited by fields)\n\n',
                fields: [
                    { name: 'Champion', value: ' \n', inline: true },
                    { name: 'Mastery Level', value: ' \n', inline: true },
                    { name: 'Mastery Points', value: ' \n', inline: true },
                ],
            }

            for (var item in fullMastery) {
                // get champion name that to compare to id in mastery data return
                for (var champion in allChampions.data) {
                    championName = champion;

                    // if the champion name matches the champion id form mastery data, build fields
                    if (allChampions.data[champion].key == fullMastery[item]['championId']) {
                        maxFieldConstraint += 3;
                        if (maxFieldConstraint > 45) {
                            break;
                        }

                        embeddedMessage.fields[0].value += championName + '\n\n';
                        embeddedMessage.fields[1].value += fullMastery[item]['championLevel'] + '\n\n';
                        embeddedMessage.fields[2].value += fullMastery[item]['championPoints'].toLocaleString() + '\n\n';
                        break;
                    }
                }
            }

            return embeddedMessage;
        }

        // function containg series of events to build message and retrieve data
        async function postMastery() {
            // wait for id to be returned
            summoner = await getSummonerID();

            // if a summoner id was found using the input name, continue on
            if (summoner == undefined || summoner == null) {
                msg.channel.send(`No summoner found for '${args}'.`);
            }
            else {
                fullMastery = await getSummonerMastery();
                allChampions = await getAllChampions();

                // if mastery results were found using the summoner id, continue to post message
                if (fullMastery.length == 0 || fullMastery == null || allChampions == null) {
                    msg.channel.send(`No mastery data found for '${args}'`);
                }
                else {
                    masteryMessage = await createEmbeddedMessage(fullMastery, allChampions);

                    msg.channel.send({ files: [attachment], embed: masteryMessage });
                }
            }
        }

        postMastery();
    }
};