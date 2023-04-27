/**
 * COMMAND: Allows people to search guides.json in the root to find content in the JSON
 */
// Requirements
const Discord = require('discord.js');
const fs = require('fs');

exports.run = async (client, message) => {
  // Get the submitters username
  let username = message.member.user.tag;

  // Get any arguments following the command, and remove the comma from them
  // this is the speech variable
  const args = message.content.slice().trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let speech = args.join(' ');

  fs.readFile('./guides.json', 'utf-8', function (err, data) {
    message.reply('Guides found for your search term: **' + speech + '**');

    // Variable to read the files and print it
    var getGuides = JSON.parse(data);

    // Find the Array in our JSON file
    var keywords = getGuides.guide;

    /*
     *   Search Function ~
     *   Because we're limiting users to inputting only 3 keywords,
     *   we need to check their input 3 times against the JSON file
     *   and return any results.
     */

    // Check JSON field 'keyword1'
    var arrFound = keywords.filter(function (item) {
      return item.keyword1 == speech.toLowerCase();
    });

    var results = arrFound.length;

    var i;

    for (i = 0; i < results; i++) {
      message.channel.send(
        arrFound[i].url + '\n **SUBMITTED BY: ' + arrFound[i].submittedBy + '**'
      );
    }

    // Check JSON field 'keyword2'
    var arrFound = keywords.filter(function (item) {
      return item.keyword2 == speech.toLowerCase();
    });

    var results = arrFound.length;

    var i;

    for (i = 0; i < results; i++) {
      message.channel.send(
        arrFound[i].url + ' **SUBMITTED BY**' + arrFound[i].submittedBy
      );
    }

    // Check JSON field 'keyword3'
    var arrFound = keywords.filter(function (item) {
      return item.keyword3 == speech.toLowerCase();
    });

    // Get our results
    var results = arrFound.length;

    // For every
    for (var i = 0; i < results; i++) {
      message.channel.send(
        arrFound[i].url + ' **SUBMITTED BY**' + arrFound[i].submittedBy
      );
    }
  });
};
