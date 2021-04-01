module.exports = {
    name: "history", // command
    description: "per player match history",
    execute(msg, args) {
        const { Discord, kayn } = require("../index.js");

        var summoner,
            fullMatchHistory,
            allChampions,
            matchMessage,
            attachment,
            match,
            particID,
            participant,
            loadingMessage,
            recentFiveMatches = [];

        // if empty, default to mooserx
        if (!args.length) {
            args = "MooseRx";
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
                    .then((smn) => {
                        function updateSummonerID() {
                            resolve(smn);
                        }
                        updateSummonerID();
                    })
                    .catch((error) => resolve(null));
            }).catch((error) => console.log("catch 2"));
        }

        // function to retrieve summoner's mastery data
        // using the id retrieved from previous function
        async function getMatchHistory() {
            return await new Promise((resolve) => {
                kayn.Matchlist.by.accountID(summoner["accountId"])
                    .then((matchList) => {
                        function updateMatchHistory() {
                            resolve(matchList);
                        }
                        updateMatchHistory();
                    })
                    .catch((error) => console.log(error));
            }).catch((error) => console.log(error));
        }

        // get all champion data
        async function getAllChampions() {
            return await new Promise((resolve) => {
                kayn.DDragon.Champion.list()
                    .then((championList) => {
                        function getChampionList() {
                            resolve(championList);
                        }
                        getChampionList();
                    })
                    .catch((error) => resolve(null));
            }).catch((error) => console.log(error));
        }

        // get specific match data
        async function getMatch(matchID) {
            return await new Promise((resolve) => {
                kayn.Match.get(matchID)
                    .then((match) => {
                        function getMatch() {
                            resolve(match);
                        }
                        getMatch();
                    })
                    .catch((error) => resolve(null));
            }).catch((error) => console.log(error));
        }

        // create the embedded message to display in chat
        async function createEmbeddedMessage(recentFiveMatches, allChampions) {
            var embeddedMessage, gameDuration, championName, WL, kills, deaths, assists, kda, CS, csPerMin;

            attachment = new Discord.MessageAttachment(`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/profileicon/${summoner['profileIconId']}.png`, 'icon.png');

            embeddedMessage = {
                color: '#FF4500',
                title: `Match history for ${summoner['name']}`,
                thumbnail: {
                    url: 'attachment://icon.png',
                },
                description: 'Most recently played 5 matches',
                fields: [
                ],
            }

            // parse through match data to gather relevant entries and build message
            recentFiveMatches.forEach(element => {
                // calculate the game duration
                var minutes = Math.floor(element['gameDuration'] / 60);
                var seconds = element['gameDuration'] - minutes * 60;
                gameDuration = minutes + 'm ' + seconds + 's';

                var i;
                // parse through each of the most recent 5 matches
                for (i = 0; i < element['participantIdentities'].length; i++) {
                    if (element['participantIdentities'][i]['player']['accountId'] == summoner["accountId"]) {
                        particID = element['participantIdentities'][i]['participantId'];                            // get participant ID
                        participant = element['participants'][particID - 1];                                          // get the full participant object based on ID
                        // get the champion the user specified in args played this match
                        for (var champion in allChampions.data) {
                            if (allChampions.data[champion].key == participant['championId']) {
                                championName = champion;
                            }
                        }

                        // set win/loss
                        if (participant['stats']['win']) {
                            WL = "Victory"
                        }
                        else {
                            WL = "Defeat"
                        }

                        // save specific data
                        kills = participant['stats']['kills'];
                        deaths = participant['stats']['deaths'];
                        assists = participant['stats']['assists'];
                        kda = (kills + assists) / deaths;
                        CS = participant['stats']['totalMinionsKilled'] + participant['stats']['neutralMinionsKilled'];
                        csPerMin = CS / minutes;

                        // add inline fields to the embedded message
                        embeddedMessage.fields.push({
                            name: championName,
                            value: WL + '\n' + gameDuration + '\n\n',
                            inline: true
                        });
                        embeddedMessage.fields.push({
                            name: 'K/D/A',
                            value: kills + '/' + deaths + '/' + assists + '\n' + kda.toFixed(2) + ':1',
                            inline: true
                        });
                        embeddedMessage.fields.push({
                            name: 'CS',
                            value: '   ' + CS + '\n   ' + csPerMin.toFixed(2) + ' cs/min',
                            inline: true
                        });
                    }
                }
            });

            return embeddedMessage;
        }

        // function containg series of events to build message and retrieve data
        async function postHistory() {
            msg.channel.send(`One moment, gathering match data..`)
                .then((thisMsg) => {
                    loadingMessage = thisMsg.id;
                })
                .catch(console.error);

            // wait for id to be returned
            summoner = await getSummonerID();

            // if a summoner id was found using the input name, continue on
            if (summoner == undefined || summoner == null) {
                msg.channel.messages.fetch(`${loadingMessage}`)
                    .then(finalMsg => {
                        finalMsg.edit(`:x: No summoner found for '${args}'.`);
                    }).catch(console.error)
            } else {
                fullMatchHistory = await getMatchHistory();
                var i;
                for (i = 0; i < 5; i++) {
                    match = await getMatch(fullMatchHistory.matches[i]["gameId"]);
                    recentFiveMatches.push(match);
                }
                allChampions = await getAllChampions();

                // if mastery results were found using the summoner id, continue to post message
                if (fullMatchHistory.length == 0 || fullMatchHistory == null || match == null) {
                    msg.channel.messages.fetch(`${loadingMessage}`)
                        .then(finalMsg => {
                            finalMsg.edit(`:x: No match data found for '${args}'.`);
                        }).catch(console.error)
                } else {
                    matchMessage = await createEmbeddedMessage(recentFiveMatches, allChampions);
                    msg.channel.messages.fetch(`${loadingMessage}`)
                        .then(finalMsg => {
                            msg.channel.send({ files: [attachment], embed: matchMessage });
                        }).catch(console.error)
                }
            }
        }

        postHistory();
    },
};
