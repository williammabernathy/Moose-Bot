const { prefix, token } = require("./config.json");             // include config file containing tokens

const Discord = require("discord.js");                          // require discord.js library (.py for python bots)

const bot = new Discord.Client();                               // build the bot client
bot.commands = new Discord.Collection();

const botCommands = require("./commands");                      // get and require our command folder

// map all commands inside ./commands directory
Object.keys(botCommands).map((key) => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

bot.login(token);

// message displayed to console after successful login (can be removed)
bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

// get the most recently typed message and parse
bot.on("message", (msg) => {
  // lethality meme
  if (msg.content.toLowerCase() === "lethality") {
    msg.pin();
  }

  if (msg.channel.name.toLowerCase() !== "moose-bot-spam") return;

  if (msg.content[0] !== prefix) return;

  const args = msg.content.split(/ +/);                         // split into array based on spaces
  const command = args.shift().toLowerCase();                   // command from array to lower case
  console.info(`Called command: ${command.substring(1)}`);      // print command to console (can be removed or commented out)

  if (!bot.commands.has(command.substring(1))) return;          // does a command exist from Object mapping at line ~9 (bot.commands.set)

  // if command exist, try executing, passing the msg and args array parameters
  // command execution in ./commands/<command>.js file, where the command is the typed and parsed command
  try {
    bot.commands.get(command.substring(1)).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply("Oops! Something went wrong trying to execute that command.");
  }
});
