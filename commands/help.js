exports.run = (client, message, args) => {
  
  const Discord = require("discord.js");
  
  let helpEmbed = new Discord.MessageEmbed()
    .setColor("009DFF")
    .setAuthor("PteroControl ¦ Help Menu", client.user.avatarURL()) 
    .addField("~register", "```Register your panel informations```")
    .addField("~update", "```Update your panel informations if changed```")
    .addField("~myservers", "```Main command for Server Management```") 
    .setFooter(`💕PteroControl | https://acktaris.fun\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
  message.channel.send(helpEmbed);
  
}
