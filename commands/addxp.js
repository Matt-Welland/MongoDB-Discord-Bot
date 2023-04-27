/**
 * COMMAND: Manually push some "XP" to a user via MongoDB Cloud Database, this command is protected so only those with the 'Admin' role can run it.
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
  let args = message.content.slice().trim().split(/ +/g);

  // Chance our XP to a number
  xpAmount = parseInt(args[2], 10);

  // If has the admin role
  if (checkRoles) {
    XP.findOne(
      {
        rsn: args[1].toLowerCase(),
      },
      function (error, data) {
        if (error) {
          // If find won't work correctly.
          message.reply('Problem accessing database.');
        } else {
          // If person being called in database does not exist, create.
          if (!data) {
            message.reply(
              args[1] + ' - User not found, creating user in Database.'
            );

            XP.create(
              {
                rsn: args[1].toLowerCase(),
                xp: args[2],
                rank: 'Smiley',
                talkedGame: 'No',
                talkedDiscord: 'No',
                hostedEvent: 'No',
                attendedEvent: 'No',
                recruited: 'No',
              },
              function (error, data) {
                if (error) {
                  console.log('There was a problem adding XP to the user');
                } else {
                  message.channel.send(
                    'XP Updated for ' +
                      args[1] +
                      '. \n\n New XP: **' +
                      args[2] +
                      'xp**'
                  );
                }
              }
            );
          } else {
            // if person exists, update their xp.
            let newXp = data.xp + xpAmount;

            XP.findOneAndUpdate(
              { rsn: args[1].toLowerCase() },
              { xp: newXp },
              function (err, result) {
                if (err) {
                  message.channel.send('Unable to add XP for ' + args[1]);
                } else {
                  message.channel.send(
                    'XP Updated for ' +
                      args[1] +
                      '. \n\n New XP: **' +
                      newXp +
                      'xp**'
                  );
                }
              }
            );
          }
        }
      }
    );
  } else {
    message.reply(' this command can only be run be admins');
  }
};
