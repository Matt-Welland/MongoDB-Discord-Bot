/**
 * COMMAND: A simple text based command which uses momentJS which works out some timezones
 */
const Discord = require('discord.js');
const moment = require('moment');

exports.run = async (client, message) => {
  // Get current date and time of server
  let servHour = moment().hour();
  let servMin = moment().minute();

  if (servMin < 10) {
    servMin = '0' + servMin;
  } else {
    servMin = servMin + '';
  }

  // Change server time into UK time...
  let ukHour = moment().add(1, 'h').hour();

  // Change server time into US Eastern....
  let eastHour = moment().subtract(4, 'h').hour();

  // Change the server time into US Pacific....
  let pacHour = moment().subtract(7, 'h').hour();

  // Change the server time into Mountain Time
  let mountainHour = moment().subtract(6, 'h').hour();

  // Let's fire the message...
  message.channel.send(
    '**The current time in GMT is: ' +
      servHour +
      ':' +
      servMin +
      '**' +
      '\n\n The current time in the UK is: ' +
      ukHour +
      ':' +
      servMin +
      '\n The current time in the US (Eastern) is: ' +
      eastHour +
      ':' +
      servMin +
      ' (four hours behind)' +
      '\n The current time in the US (Pacific) is: ' +
      pacHour +
      ':' +
      servMin +
      ' (seven hours behind)' +
      '\n The current time in Mountain Time (MT) is: ' +
      mountainHour +
      ':' +
      servMin +
      ' (six hours behind)' +
      '\n\n **Please note: All clan activities are in (GMT).**'
  );
};
