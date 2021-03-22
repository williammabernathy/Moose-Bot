const { prefix, token, riotToken } = require("./config.json");                     // include config file containing tokens
const { Kayn, REGIONS } = require('kayn');

const kayn = Kayn(riotToken)(
  {
    region: REGIONS.NORTH_AMERICA,
    apiURLPrefix: 'https://%s.api.riotgames.com',
    locale: 'en_US',
    debugOptions: {
      isEnabled: true,
      showKey: false,
    },
    requestOptions: {
      shouldRetry: true,
      numberOfRetriesBeforeAbort: 3,
      delayBeforeRetry: 1000,
      burst: false,
      shouldExitOn403: false,
    },
    cacheOptions: {
      cache: null,
      timeToLives: {
        useDefault: false,
        byGroup: {},
        byMethod: {},
      },
    },
  }
)

const Discord = require("discord.js");                                  // require discord.js library (.py for python bots)
const Sequelize = require("sequelize");                                 // database package

const bot = new Discord.Client();                                       // build the bot client
bot.commands = new Discord.Collection();

const botCommands = require("./commands");                              // get and require our command folder

kayn.Summoner.by.name('MooseRX').callback(function(err, summoner) {
  console.log('Found MooseRX');
})

// map all commands inside ./commands directory
Object.keys(botCommands).map((key) => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

// set up database
const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});

// create database to increment and track !cannon command
const Tags = sequelize.define("cannon", {
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
  cannons_missed: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
});

bot.once("ready", () => {
  Tags.sync();
  console.info(`Logged in as ${bot.user.tag}!`);
});

async function addMoose() {
  try {
    const tag = await Tags.create({
      name: "MooseRx",
      cannons_missed: 0,
    });
  }
  catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      console.info('That tag already exists.');
    }
    console.info('Something went wrong with adding a tag.');
  }
}

addMoose();

// get the most recently typed message and parse
bot.on("message", (msg) => {
  // lethality meme
  if (msg.content.toLowerCase() === "lethality") {
    msg.pin();
  }

  if (msg.content.toLowerCase() === '!cannon') {
    incrCannonCount();

    async function incrCannonCount() {
      const tag = await Tags.findOne({ where: { name: 'MooseRx' } });
      if (tag) {
        tag.increment('cannons_missed');
        return msg.channel.send(`Moose has missed ${tag.get('cannons_missed')} cannons ):`);
      }
    }
  }

  if (msg.channel.name.toLowerCase() !== "moose-bot-spam") return;

  if (msg.content[0] !== prefix) return;

  const args = msg.content.split(/ +/);                                 // split into array based on spaces
  const command = args.shift().toLowerCase();                           // command from array to lower case
  console.info(`Called command: ${command.substring(1)}`);              // print command to console (can be removed or commented out)

  if (!bot.commands.has(command.substring(1))) return;                  // does a command exist from Object mapping at line ~9 (bot.commands.set)

  // if command exist, try executing, passing the msg and args array parameters
  // command execution in ./commands/<command>.js file, where the command is the typed and parsed command
  try {
    bot.commands.get(command.substring(1)).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply("Oops! Something went wrong trying to execute that command.");
  }
});

bot.login(token);