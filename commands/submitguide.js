/**
 * COMMAND: Uses fs to add data to guides.json in project route, takes multiple queries from the user running command including {URL} and 3x {KEYWORD}s which will be searchable using the `guide.js` command.
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

  // Variable to define how the JSON should start
  const guides = {
    guide: [
      // Push into here to populate
    ],
  };

  // Stop people from breaking the file by submitting empty fields
  if (!speech) {
    message.reply(
      " you can't submit an empty guide. \n\n" +
        'Struggling? Try `o!submitguide X K1 K2 K3`, where X=URL to Guide and K1,2,3 = Keyword 1,2,3'
    );

    console.log(username + ' is having trouble with the submitguide command.');
  }

  if (speech) {
    fs.readFile('./guides.json', 'utf-8', function (err, data) {
      if (err) throw err;

      // Catch if user is trying to use 'clear' and remove it
      // this is our new variable to track user input
      let clearSpeech = speech.replace('clear', '');

      // Lets turn the user input into an array to we can pick and
      // choose what we need
      let speechArr = clearSpeech.split(' ');

      // Grab the URL from the submission
      let url = speechArr[0];

      // Get rid of the 1st argument
      let keywords = speechArr.splice(0, 1);

      // Read JSON + push into it
      var readData = JSON.parse(data);

      // First grab the length of the guides.json file
      // then add 1 to get a human readable unique ID
      // for each guide.
      let guideLength = readData.guide.length;
      let uniqueID = guideLength + 1;

      // Amount of keywords
      let keywordAmount = speechArr.length;

      if (keywordAmount == 1) {
        readData.guide.push({
          url: url,
          keyword1: speechArr[0].toLowerCase(),
          id: uniqueID,
          submittedBy: username,
        });

        fs.writeFile(
          './guides.json',
          JSON.stringify(readData, null, 4),
          'utf-8',
          function (err) {
            if (err) throw err;
            console.log(
              username + ' has added a guide to the guides.json files.'
            );
          }
        );

        message.channel.send(
          'Added the guide **' +
            url +
            '** to the database with the keywords: `' +
            speechArr +
            '`'
        );
      }

      if (keywordAmount == 2) {
        readData.guide.push({
          url: url,
          keyword1: speechArr[0].toLowerCase(),
          keyword2: speechArr[1].toLowerCase(),
          id: uniqueID,
          submittedBy: username,
        });

        fs.writeFile(
          './guides.json',
          JSON.stringify(readData, null, 4),
          'utf-8',
          function (err) {
            if (err) throw err;
            console.log(
              username + ' has added a guide to the guides.json files.'
            );
          }
        );

        message.channel.send(
          'Added the guide **' +
            url +
            '** to the database with the keywords: `' +
            speechArr +
            '`'
        );
      }

      if (keywordAmount == 3) {
        readData.guide.push({
          url: url,
          keyword1: speechArr[0].toLowerCase(),
          keyword2: speechArr[1].toLowerCase(),
          keyword3: speechArr[2].toLowerCase(),
          id: uniqueID,
          submittedBy: username,
        });

        fs.writeFile(
          './guides.json',
          JSON.stringify(readData, null, 4),
          'utf-8',
          function (err) {
            if (err) throw err;
            console.log(
              username + ' has added a guide to the guides.json files.'
            );
          }
        );

        message.channel.send(
          'Added the guide **' +
            url +
            '** to the database with the keywords: `' +
            speechArr +
            '`'
        );
      }

      if (keywordAmount > 3) {
        message.reply(' sorry, the maximum keywords you can input is 3.');
      }

      if (keywordAmount == 0) {
        message.reply(
          ' you have tried to submit a guide without any keywords, therefore it wil not be findable. Try `o!submitguide <URL> <KEYWORD> <KEYWORD> <KEYWORD>`'
        );
      }
    });
  }
};
