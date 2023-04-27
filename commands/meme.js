/**
 * COMMAND: Uses axios to GET a meme an API and returns a random meme as a Discord Rich Embed
 */
const Discord = require('discord.js');
const axios = require('axios');
const url = 'https://meme-api.herokuapp.com/gimme';

exports.run = async (client, message, args) => {
  // Generate a random embed colour
  function getColour() {
    const colour = ['#008000', '#FFB6C1', '#ff0000', '#ffff00'];

    return colour[Math.floor(Math.random() * colour.length)];
  }

  // Fetch our API
  const getData = async (url) => {
    const response = await axios.get(url);
    const data = response.data.url;

    // Start a rich snippet
    const exEmbed = new Discord.RichEmbed()
      .setTitle('Bot - Images Powered by Meme_API')
      .setDescription('Hey, I randomly grabbed you a meme')
      .setColor(getColour())
      .setImage(data);

    // Send the finished message
    message.channel.send(exEmbed);
  };

  // Call the function
  getData(url);
};
