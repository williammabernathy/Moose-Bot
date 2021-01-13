module.exports = {
    name: 'cannon',                     // command
    description: 'Count cannnon minions missed.',
    execute(msg, args) {                // (msg: the entire message as a string as it was sent, args: array of args via parsed msg first position containing the command followed by preceeding words)
      msg.channel.send('Missed a cannon');
    },
  };