/**
 * COMMAND: Calls the Runescape.com RSS feed and prints it to Discord as a message
 */
// Requirements
const Discord = require('discord.js');
const Parser = require('rss-parser');
const parser = new Parser();

exports.run = async (client, message) => {
  const feed = await parser.parseURL(
    'https://secure.runescape.com/m=news/c=9*KSmR620TU/latest_news.rss?oldschool=true'
  );
  const newsLength = feed.items.length;
  const newsTitle = feed.items[0].title;
  const newsLink = feed.items[0].link;
  const newsDescription = feed.items[0].content;

  message.channel.send(
    '**' + newsTitle + '**' + newsDescription + '\n' + 'Link: ' + newsLink
  );
};
