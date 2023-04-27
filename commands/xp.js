/**
 * COMMAND: Communicates with the cloud-based mongoDB database taking {USER} as a query and responds with that {USER}'s XP
 */
// Requirements
const Discord = require('discord.js');
const mongoose = require('mongoose');
var XP = require('../models/XP');

// Fire the command.
exports.run = async (client, message) => {
  // Get user argument
  const args = message.content.slice().trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const readable = args.join(' ');

  // Add an Underscore to replace any spaces so we don't break the database.
  const removeSpace = readable.replace(/ /g, '%');

  XP.findOne(
    {
      rsn: removeSpace.toLowerCase(),
    },
    function (error, data) {
      if (error) {
        message.reply('Problem finding ' + readable);
      } else {
        if (!data) {
          message.reply(readable + ' does not exist in the database');
        } else {
          XP.findOne(
            {
              rsn: removeSpace.toLowerCase(),
            },
            function (error, data) {
              if (error) {
                message.reply('Problem finding ' + readable);
              } else {
                message.channel.send(readable + ' has ' + data.xp + 'xp');
              }
            }
          );
        }
      }
    }
  );
};
