exports.run = (client, message, args) => {
	
const Discord = require("discord.js");
const node = require('nodeactyl');
const Client = node.Client;
const mysql = require('mysql');
const con = require('../utils/dbConnector');

var userid = message.author.id;
  con.query(`SELECT * FROM pterocontrol WHERE discord_id = '${userid}'`, function (err, result) {
  	
  let NotRegistered = new Discord.MessageEmbed()
  .setAuthor("PteroControl ¦ Management", client.user.avatarURL())
  .setColor("#FF493E")
  .setDescription("```You are not registered on our systems. You can register with ~register```")
  .setFooter(`💕PteroControl | https://acktaris.fun\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
  
  let ErrCon = new Discord.MessageEmbed()
  .setAuthor("PteroControl ¦ Management", client.user.avatarURL())
  .setColor("#FF56FA")
  .setFooter(`💕PteroControl | https://acktaris.fun\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
  .setDescription("```There was an error connecting to the database. Please report this issue to the Developers```")
  
	  if (err) return message.channel.send(ErrCon);
	       if (result.length == 0) return message.channel.send(NotRegistered);     
	            var rows = JSON.parse(JSON.stringify(result[0]));
		        
	               Client.login(rows.panel_url, rows.panel_api);
    
    const emoji = ['❌', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
       let index = 0;

   Client.getAllServers().then((response) => {
	  let Embed1 = new Discord.MessageEmbed()
            .setColor("#2091FF")
            .setFooter(`💕PteroControl | https://acktaris.fun\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL()) 
            
    if (response.length == 0) {
       Embed1.setDescription("```You dont have any servers in your account```");
    } else {
      response.map(S => {
       Embed1.addField(emoji[++index]+" | "+S.attributes.name+" \ `"+S.attributes.identifier+"`", "```Ram: "+S.attributes.limits.memory+" MB\nDisk: "+S.attributes.limits.disk+" MB\nCPU: "+S.attributes.limits.cpu+"%```");
      })
      message.channel.send(Embed1).then(M => {
    
    for (let i = 0; i < response.length + 1; i++) {
         M.react(emoji[i]);
    }
        
    const collector = M.createReactionCollector((r, u) => emoji.includes(r.emoji.name) && u.id === message.author.id, { max: 1 });

    collector.on('collect', async (r, u) => {
           M.reactions.removeAll();
           if (r.emoji.name === '❌') {
             let Embed2 = new Discord.MessageEmbed() 
                Embed2.setFooter(`💕PteroControl | https://acktaris.fun\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL()) 
                Embed2.setAuthor("PteroControl ¦ Management", client.user.avatarURL()) 
                Embed2.setColor("#FF74F4")
                Embed2.setDescription("```You cancelled the Server Management Menu```") 
             message.delete();
             return M.edit(Embed2).then(m => m.delete({ timeout: 2000}));
           }
      
           const selected = response[emoji.indexOf(r.emoji.name) - 1];
           const status = await Client.getServerStatus(selected.attributes.identifier);
           const ramMemory = await Client.getRAMUsage(selected.attributes.identifier);
           const cpuUsage = await Client.getCPUUsage(selected.attributes.identifier);
           const diskUsage = await Client.getDiskUsage(selected.attributes.identifier);
      
           if (status === "on" || status === "starting"){
              let infoEmbed = new Discord.MessageEmbed()
                .setAuthor("PteroControl ¦ Management", client.user.avatarURL()) 
                .setColor("#A700FF")
                .setFooter(`💕PteroControl | https://acktaris.fun\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
                .addField("Selected Service 〉"+selected.attributes.name, "```Status: "+status.replace('starting', 'Starting').replace('off', 'Offline').replace('on', 'Online')+"\nMemory Usage: "+ramMemory.current+"/"+ramMemory.limit+"MB"+"\nCpu Usage: "+cpuUsage.current+"%"+"\nDisk Usage: "+diskUsage.current+"/"+diskUsage.limit+"MB"+"```\n**__Power Actions__**\n(🖥️) » *Restart the server*\n(🔒) » *Stop the server*\n(❌) » *Exits the process*")
              M.edit(infoEmbed).then(msg => {
                 msg.react('🖥️').then(r => {
                 msg.react('🔒').then(r => {
                 msg.react('❌')
          
 const CancelFilter = (reaction, user) => {
    return reaction.emoji.name === '❌' && user.id === message.author.id;};

 const collector = msg.createReactionCollector(CancelFilter, { time: 15000 });

 collector.on('collect', (reaction, user) => {
      msg.reactions.removeAll()
             const Embed2 = new Discord.MessageEmbed()
               Embed2.setAuthor("PteroControl ¦ Management", client.user.avatarURL()) 
               Embed2.setColor("#A700FF")
               Embed2.setFooter(`💕PteroControl | https://acktaris.fun\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
               Embed2.setDescription("```You cancelled the Server Management Menu```");
      msg.edit(Embed2);
});
          
 const RestartFilter = (reaction, user) =>{
   return reaction.emoji.name === '🖥️' && user.id === message.author.id;};

 const collector2 = msg.createReactionCollector(RestartFilter, {time: 15000, })

 collector2.on('collect', (reaction, user) =>{
      msg.reactions.removeAll()
      Client.restartServer(selected.attributes.identifier);
      const Embed3 = new Discord.MessageEmbed()
         Embed3.setAuthor("PteroControl ¦ Management", client.user.avatarURL()) 
         Embed3.setColor("#A700FF")
         Embed3.setFooter(`💕PteroControl | https://acktaris.fun\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
         Embed3.setDescription("```Your server has been restarted```")
      msg.edit(Embed3);
});
            
const StopFilter = (reaction, user) =>{
  return reaction.emoji.name === '🔒' && user.id === message.author.id;};

const collector3 = msg.createReactionCollector(StopFilter, {time: 15000, })

 collector3.on('collect', (reaction, user) =>{
      msg.reactions.removeAll()
      Client.stopServer(selected.attributes.identifier);
      const Embed4 = new Discord.MessageEmbed()
         Embed4.setAuthor("PteroControl ¦ Management", client.user.avatarURL()) 
         Embed4.setColor("#A700FF")
         Embed4.setFooter(`💕PteroControl | https://acktaris.fun\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
         Embed4.setDescription("```Your server has been stopped```")
      msg.edit(Embed4);
});
          
          })
       })
   })
} else if (status === "off"){
   let infoEmbed = new Discord.MessageEmbed()
       .setAuthor("PteroControl ¦ Management", client.user.avatarURL()) 
       .setColor("#A700FF")
       .setFooter(`💕PteroControl | https://acktaris.fun\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
       .addField("Selected Service 〉"+selected.attributes.name, "```Status: "+status.replace('starting', 'Starting').replace('off', 'Offline').replace('on', 'Online')+"\nMemory Usage: "+ramMemory.current+"/"+ramMemory.limit+"MB"+"\nCpu Usage: "+cpuUsage.current+"%"+"\nDisk Usage: "+diskUsage.current+"/"+diskUsage.limit+"MB"+"```\n**__Power Actions__**\n(🖥️) » *Start the server*\n(❌) » *Exits the process*")
   M.edit(infoEmbed).then(msg => {
       msg.react('🖥️').then(r => {
         msg.react('❌')
 
const CancelFilter = (reaction, user) => {
   return reaction.emoji.name === '❌' && user.id === message.author.id;};

const collector = msg.createReactionCollector(CancelFilter, { time: 15000 });

collector.on('collect', (reaction, user) => {
   msg.reactions.removeAll()
       const Embed2 = new Discord.MessageEmbed()
             Embed2.setAuthor("PteroControl ¦ Management", client.user.avatarURL()) 
             Embed2.setColor("#A700FF")
             Embed2.setFooter(`💕PteroControl | https://acktaris.fun\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
             Embed2.setDescription("```You cancelled the Server Management Menu```");
       msg.edit(Embed2);
});
          
const StartFilter = (reaction, user) =>{
   return reaction.emoji.name === '🖥️' && user.id === message.author.id;};

 const collector2 = msg.createReactionCollector(StartFilter, {time: 15000, })

 collector2.on('collect', (reaction, user) =>{
      msg.reactions.removeAll()
      Client.startServer(selected.attributes.identifier);
      const Embed3 = new Discord.MessageEmbed()
         Embed3.setAuthor("PteroControl ¦ Management", client.user.avatarURL()) 
         Embed3.setColor("#A700FF")
         Embed3.setFooter(`💕PteroControl | https://acktaris.fun\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
         Embed3.setDescription("```Your server has been started```")
      msg.edit(Embed3);
         })
      })
   })
} 
      
          })
         })
       }
    }).catch(e => {
     let ErrCon = new Discord.MessageEmbed()
        .setAuthor("PteroControl ¦ Management", client.user.avatarURL())
        .setColor("#FF56FA")
        .setFooter(`💕PteroControl | https://acktaris.fun\nRequested By ➤ ${message.author.tag}`, client.user.avatarURL())
        .setDescription("```There was an error connecting to your control panel! Please ensure that you entered the correct apikey and hosturl during the registration process```")
     message.channel.send(ErrCon);
   })
  })
} 
