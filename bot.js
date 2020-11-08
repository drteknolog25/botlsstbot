const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const fs = require('fs');
require('./util/eventLoader')(client);

const express = require('express');
const app = express();
const http = require('http');
    app.get("/", (request, response) => {
    response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);

const log = message => {
  console.log(`BOT: ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

////////////////////

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  return permlvl;
};

client.login(ayarlar.token);


client.on('ready', () => {
    client.user.setPresence({
        game: {
            name: `+botekle | Discord Botları`,
            type: 'WATCHING'
            // Değerler:
            // PLAYING: Oynuyor
            // WATCHING: İzliyor
            // LISTENING: Dinliyor
        },
        status: 'online'
        // Değerler:
        // online: Çevrimiçi
        // dnd: Rahatsız Etmeyin
        // idle: Boşta
    })
})
///////////////
const yourID = "485404099253370891"; //Instructions on how to get this: https://redd.it/40zgse //Kendi İD'nizi Yazın

	

const setupCMD = "v!hazırla" //İstediğiniz Komut Yapabilirsiniz örn : !kayıtol

	

let initialMessage = ``; //Dilediğiniz Şeyi Yazabilirsiniz

	

const roles = ["", "ParaPaketi"]; //İstediğiniz Rolü Yazabilirsiniz

	

const reactions = ["", "♥"]; //İstediğiniz Emojiyi Ekleyebilirsiniz

	

const botToken = "NTQ2MDAwNzM1MTg0MzU1Mzc5.D1M-kQ.XXNFKXHm_yZjtUQiDwIQuQL5NtI";  //Buraya botunuzun tokenini koyunuz

	

                     

	

	

//Load up the bot...

	

const discord = require('discord.js');

	

const bot = new Discord.Client();

	

bot.login(botToken);

	

	

//If there isn't a reaction for every role, scold the user!

	

if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";

	

	

//Function to generate the role messages, based on your settings

	

function generateMessages(){

	

    var messages = [];

	

    messages.push(initialMessage);

	

    for (let role of roles) messages.push(`Kayıt Olmak İçin **"${role}"** Emojisine Tıkla!`); //DONT CHANGE THIS

	

    return messages;

	

}

	

	

	

bot.on("message", message => {

	

    if (message.author.id == yourID && message.content.toLowerCase() == setupCMD){

	

        var toSend = generateMessages();

	

        let mappedArray = [[toSend[0], false], ...toSend.slice(1).map( (message, idx) => [message, reactions[idx]])];

	

        for (let mapObj of mappedArray){

	

            message.channel.send(mapObj[0]).then( sent => {

	

                if (mapObj[1]){

	

                  sent.react(mapObj[1]);  

	

                } 

	

            });

	

        }

	

    }

	

})

	

	

	

bot.on('raw', event => {

	

    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){

	

        

	

        let channel = bot.channels.get(event.d.channel_id);

	

        let message = channel.fetchMessage(event.d.message_id).then(msg=> {

	

        let user = msg.guild.members.get(event.d.user_id);

	

        

	

        if (msg.author.id == bot.user.id && msg.content != initialMessage){

	

       

	

            var re = `\\*\\*"(.+)?(?="\\*\\*)`;

	

            var role = msg.content.match(re)[1];

	

        

	

            if (user.id != bot.user.id){

	

                var roleObj = msg.guild.roles.find(r => r.name === role);

	

                var memberObj = msg.guild.members.get(user.id);

	

                

	

                if (event.t === "MESSAGE_REACTION_ADD"){

	

                    memberObj.addRole(roleObj)

	

                } else {

	

                    memberObj.removeRole(roleObj);

	

                }

	

            }

	

        }

	

        })

	

 

	

    }   

	

});
