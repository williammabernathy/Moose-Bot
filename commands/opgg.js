module.exports = {
  name: "opgg", // command
  description: "Link MooseRx opgg account.",
  execute(msg, args) {
    // (msg: the entire message as a string as it was sent, args: array of args via parsed msg first position containing the command followed by preceeding words)
    // default no args, send MooseRx
    if(args === null || args.length == 0) {
      msg.channel.send("https://na.op.gg/summoner/userName=MooseRx");
    }
    // otherwise, link args username via user input
    else {
      msg.channel.send(`https://na.op.gg/summoner/userName=${args.join("+")}`);
    }
  },
};
