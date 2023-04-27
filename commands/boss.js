/**
 * COMMAND: A simple command which chooses a string from an array to send to a user in return
 */
const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  function whatBoss() {
    const rand = [
      'Zulrah',
      'Vorkath',
      'Corp',
      'of The Nightmare',
      'Sarachnis',
      'Giant Mole',
      'Kalphite Queen',
      'DKs',
      'General Graardor',
      "K'ril Tsutsaroth",
      'Commander Zilyana',
      "Kree'arra",
      'Chaos Elemental',
      'King Black Dragon',
      'Callisto',
      "Vet'ion",
      'Venenatis',
      'Scorpia',
      'Chaos Fanatic',
      'Crazy Archaeologist',
      'Raids 1',
      'Raids 2',
    ];

    return rand[Math.floor(Math.random() * rand.length)];
  }

  function howMany() {
    return Math.ceil(Math.random() * 50);
  }

  const exEmbed = new Discord.RichEmbed()
    .setTitle('What boss should I kill?')
    .setDescription('Try killing ' + howMany() + ' ' + whatBoss())
    .setColor('#008000');

  message.channel.send(exEmbed);
};
