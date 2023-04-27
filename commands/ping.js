/**
 * COMMAND: Basic ping command to confirm bot is running, also reports amount of servers running in, version from package.json , uptime and ping in MS
 */
const Discord = require('discord.js');
const fs = require('fs');

exports.run = (client, message) => {
  // Uptime
  let totalSeconds = client.uptime / 1000;
  let hours = Math.floor(totalSeconds / 3600);
  let uptime = `${hours} hours`;

  // Ping
  let ping = client.ping;
  ping = ping.toFixed(2);

  // Servers
  let servers = client.guilds.size;

  // Version
  function getVersion() {
    fs.readFile('./package.json', 'utf-8', function (err, data) {
      if (err) {
        console.error("I can't find the package.json file");

        message.channel.send('**ERR! 404:** "./package.json" not found.');
      }

      const readConfig = JSON.parse(data);
      const version = readConfig.version;

      // Embed
      const content = new Discord.RichEmbed()
        .setDescription(
          '✅ Uptime: ' +
            uptime +
            '\n\n' +
            '✅ In: ' +
            servers +
            ' servers' +
            '\n\n' +
            '✅ Ping: ' +
            ping +
            'ms' +
            '\n\n' +
            '✅ Version: v' +
            version
        )
        .setColor('#008000');
      // Send
      message.channel.send(content);
    });
  }
  getVersion();
};
