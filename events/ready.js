const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const log = message => {
  console.log(`BOT : ${message}`);
};

var prefix = ayarlar.prefix;

module.exports = client => {
  log(`Komutları yükledim!`)
  log(`${client.user.username} ismi ile giriş yaptım!`)
  log(`Oyun ismimi ayarladım!`)
  log(`Şu an ${client.channels.size} kanala, ${client.guilds.size} sunucuya ve ${client.users.size} kullanıcıya hizmet veriyorum!`)
  client.user.setStatus("online")
  client.user.setGame(`${prefix}botekle | Discord Botları`)
};