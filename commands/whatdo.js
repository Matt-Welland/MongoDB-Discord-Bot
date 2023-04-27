/**
 * COMMAND: A simple text command which responds to someone asking "whatdo" picking a string from an Array at random then sending as a Discord Rich Embed
 */
const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  function whatSkill() {
    const rand = [
      'Attack',
      'Defence',
      'Strength',
      'Magic',
      'Hitpoints',
      'Ranging',
      'Construction',
      'Slayer',
      'Prayer',
      // "Summoning",
      // "Divination",
      // "Invention",
      'Runecrafting... actually do some runecrafing. Said nobody ever.',
      'Herblore',
      'Cooking',
      // "Dungeoneering",
      'Farming',
      'Theiving',
      'Agility, run some laps... ',
      'Mining',
      'Smithing',
      'Crafting',
      'Firemaking',
      'Fishing',
      'Fletching',
      'Woodcutting',
    ];

    return rand[Math.floor(Math.random() * rand.length)];
  }

  const exEmbed = new Discord.RichEmbed()
    .setTitle('What skill should I train?')
    .setDescription('Try training ' + whatSkill())
    .setColor('#008000');

  message.channel.send(exEmbed);
};
