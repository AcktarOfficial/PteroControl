module.exports = (client, message) => {
const config = require("../config.json");

  if (message.author.bot) return;
  if (message.content.indexOf(config.prefix) !== 0) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command);

  if (!cmd) return;
  cmd.run(client, message, args);
  
};
