/**
 * COMMAND: Acts like a "Magic 8-Ball" responding to a question fired by the discord user using !8ball {QUERY}
 */
const Discord = require('discord.js');
const fs = require('fs');

exports.run = async (client, message, args) => {
  function RNG() {
    // Read our JSON in route with responses
    fs.readFile('./8ball-responses.json', 'utf-8', function (err, data) {
      // If we can't find the JSON file
      if (err) {
        console.log(
          'Path to 8 Ball JSON has be interupted, please double check the path.'
        );
      }

      // Define some variables including grabbing the "answers" from the JSON and generating a random number
      var getAnswers = JSON.parse(data);
      getAnswers = getAnswers.answers;
      var answersLength = getAnswers.length;
      var RNG = getAnswers[Math.floor(Math.random() * answersLength)];

      // Make sure the user has a query or has asked a question
      if (!args.length) {
        return message.reply(
          "the magic 8-Ball is not going to help you if you don't ask a question ."
        );
      }

      // The answer we fetched from the JSON was marked "POSITIVE" so make the colours green in a Discord Rich Embed
      if (RNG.type === 'positive') {
        const positive = new Discord.RichEmbed()
          .setTitle('Let the magical Bot decide your fate..')
          .setDescription(RNG.answer)
          .setColor('#008000');

        message.channel.send(positive);
      }

      // The answer we fetched from the JSON was marked "NEGATIVE" so make the colours red in a Discord Rich Embed
      if (RNG.type === 'negative') {
        const negative = new Discord.RichEmbed()
          .setTitle('Let the magical bot decide your fate..')
          .setDescription(RNG.answer)
          .setColor('#ff0000');

        message.channel.send(negative);
      }

      // The answer we fetched from the JSON was marked "NEGATIVE" so make the colours yellow in a Discord Rich Embed
      if (RNG.type === 'neutral') {
        const neutral = new Discord.RichEmbed()
          .setTitle('Let the magical bot decide your fate..')
          .setDescription(RNG.answer)
          .setColor('#ffff00');

        message.channel.send(neutral);
      }
    });
  }

  RNG();
};
