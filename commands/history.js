module.exports = {
    name: 'history',                   // command
    description: 'per player match history',
    execute(msg, args) {
        const { Discord, kayn } = require("../index.js");

        var summoner, fullMatchHistory, allChampions, matchMessage, attachment, match;

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
        async function getMatchHistory() {
            return await new Promise((resolve) => {
                kayn.Matchlist.by.accountID(summoner['accountId'])
                    .then(matchList => {
                        function updateMatchHistory() {
                            resolve(matchList);
                        }
                        updateMatchHistory();
                    }).catch(error => console.log(error));
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

        // get specific match data
        async function getMatch(matchID) {
            return await new Promise((resolve) => {
                kayn.Match.get(matchID)
                    .then(match => {
                        function getMatch() {
                            resolve(match);
                        }
                        getMatch();
                    }).catch(error => resolve(null));
            }).catch(error => console.log(error));
        }

        // create the embedded message to display in chat
        async function createEmbeddedMessage(fullMastery, allChampions) {
            /*
            var embeddedMessage, championName, maxFieldConstraint = 0;

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
                // get champion name to compare to id in mastery data return
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
            */
        }

        // function containg series of events to build message and retrieve data
        async function postHistory() {
            // wait for id to be returned
            summoner = await getSummonerID();

            // if a summoner id was found using the input name, continue on
            if (summoner == undefined) {
                msg.channel.send(`No summoner found for '${args}'.`);
            }
            else {
                fullMatchHistory = await getMatchHistory();
                match = await getMatch(fullMatchHistory.matches[0]['gameId']);
                allChampions = await getAllChampions();

                console.log(match);

                
                // if mastery results were found using the summoner id, continue to post message
                if (fullMatchHistory.length == 0 || fullMatchHistory == null || match == null) {
                    msg.channel.send(`No match data found for '${args}'`);
                }
                else {
                   // matchMessage = await createEmbeddedMessage(fullMastery, allChampions);

                   // msg.channel.send({ files: [attachment], embed: matchMessage });
                }
            }
        }

        postHistory();
    }
};