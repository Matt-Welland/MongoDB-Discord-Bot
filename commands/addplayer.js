/**
 * COMMAND: Adds a user to our Cloud MongoDB, this command is protected so only those with the 'Admin' role can run it.
 */

// Requirements
const Discord = require('discord.js');
const mongoose = require('mongoose');
var XP = require('../models/XP');

// Fire the command.
exports.run = async (client, message) => {
  // Get if the user is an admin and check later on where needed
  const modRole = message.guild.roles.find((role) => role.name === 'Admin');
  const checkRoles = message.member.roles.has(modRole.id);

  // Get user argument
  const args = message.content.slice().trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const readable = args.join(' ');

  // Add an Underscore to replace any spaces so we don't break the database.
  let removeSpace = readable.replace(/ /g, '%');
  removeSpace = removeSpace.toLowerCase();

  // Check the user running the command is an 'Admin'
  if (checkRoles) {
    // Someone forgot to mention who should be awarded XP, tut tut.
    if (args.length === 0) {
      message.reply(
        " you forgot to say who you're awarding xp to, try like this: `o!talkedxp {USER}`"
      );
    } else {
      XP.create(
        {
          rsn: removeSpace,
          xp: 0,
          rank: 'Smiley',
          talkedGame: 'No',
          talkedDiscord: 'No',
          hostedEvent: 'No',
          attendedEvent: 'No',
          recruited: 'No',
        },
        function (error, data) {
          // If there's an error adding new person to DB...
          if (error) {
            message.channel.send(
              '**Error adding person to MongoDB. Error report: ' + error + '**'
            );
          }

          // Added new player to DB, report back...
          else {
            XP.findOne(
              {
                rsn: removeSpace,
              },
              function (error, data) {
                if (error) {
                  message.reply(error);
                } else {
                  message.channel.send(
                    readable + ' was added to the database, they now have 0xp'
                  );

                  client.channels
                    .get('713701138888785940')
                    .send(
                      '❗❗ ' +
                        readable +
                        ' is due for a rankup! They should now be a **Smiley**'
                    );
                }
              }
            );
          }
        }
      );
    }
  }
};
