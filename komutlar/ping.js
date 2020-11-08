const Discord = require('discord.js');

exports.run = function(client, message) {

  message.channel.send(`Pingim ${client.ping}ms.`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Botun pingini gösterir.',
  usage: 'ping'
};