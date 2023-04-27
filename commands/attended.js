/**
 * COMMAND: Adds XP for users who attend events and updated to our Cloud MongoDB Database, this command is protected so only those with the 'Admin' role can run it.
 */
// Requirements
const Discord = require('discord.js');
const mongoose = require('mongoose');
const XP = require('../models/XP');

// The command
exports.run = async (client, message) => {
  // Get if the user is an admin and check later on where needed
  const modRole = message.guild.roles.find((role) => role.name === 'Admin');
  const checkRoles = message.member.roles.has(modRole.id);

  // Work out date today.
  let dateObj = new Date();
  let month = String(dateObj.getMonth() + 1).padStart(2, '0');
  let day = String(dateObj.getDate()).padStart(2, '0');
  let year = dateObj.getFullYear();
  let todaysDate = day + '/' + month + '/' + year;

  // Get user argument
  const args = message.content.slice().trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const readable = args.join(' ');

  // Add an Underscore to replace any spaces so we don't break the database.
  let removeSpace = readable.replace(/ /g, '%');
  removeSpace = removeSpace.toLowerCase();

  // Change our argument to Number to store in DB.
  xpAmount = parseInt(args[2], 10);

  if (checkRoles) {
    // Someone forgot to mention who should be awarded XP, tut tut.
    if (args.length === 0) {
      message.reply(
        " you forgot to say who you're awarding xp to, try like this: `o!attended {USER}`"
      );
    }

    // Name was passed
    else {
      // Add our xp to the user for talking in the CC...
      XP.findOne(
        {
          rsn: removeSpace,
        },
        function (error, data) {
          // If we retrieve an error connecting to DB...
          if (error) {
            message.channel.send(
              '**Error Connecting to MongoDB. Contact Cookie.**'
            );
          }

          // If we can succsesfully connect to DB...
          else {
            // If the person being called in the database does not exist, create an entry...
            if (!data) {
              message.reply(
                ' cannot find **' +
                  readable +
                  '** in my database. Run `o!addplayer RSN` to add a new player to the Database! '
              );
            }
            // Add XP if user hasn't talked on discord today.
            else {
              // If the person has already talked today
              if (data.attendedEvent === todaysDate) {
                message.channel.send(
                  '**' +
                    readable +
                    '** has already attended an event today and cannot gain anymore XP.'
                );
              } else {
                // Find users current XP
                let newXp = data.xp + 15;

                // Post to database
                XP.findOneAndUpdate(
                  { rsn: removeSpace },
                  { xp: newXp },
                  { useFindAndModify: false },

                  function (err, result) {
                    // If we get an error updating
                    if (err) {
                      const addSpaces = data.rsn.replace(/%/g, ' ');

                      message.channel.send(
                        'Unable to update XP for ' +
                          addSpaces +
                          '. Reason: ' +
                          err
                      );
                    }

                    // Succsessfully updated user in DB
                    else {
                      message.channel.send(
                        'Awarded XP for attending an event to ' +
                          readable +
                          ' on ' +
                          todaysDate +
                          '\n\n' +
                          'New XP: **' +
                          newXp +
                          '**'
                      );

                      XP.findOneAndUpdate(
                        { rsn: removeSpace },
                        { attendedEvent: todaysDate },
                        { useFindAndModify: false },

                        function (err, data) {
                          if (err) {
                            message.channel.send(
                              'Unable to post **date** to Database. Error: ' +
                                error
                            );
                          }

                          // If user goes past 19xp and is a recruit.
                          if (data.xp > 19 && data.rank === 'Smiley') {
                            client.channels
                              .get('713701138888785940')
                              .send(
                                '❗❗ ' +
                                  readable +
                                  ' is due for a rankup! They should now be a **Recruit**'
                              );

                            XP.findOneAndUpdate(
                              { rsn: removeSpace },
                              { rank: 'Recruit' },
                              { useFindAndModify: false },

                              function (error) {
                                if (error) {
                                  message.channel.send(
                                    'Unable to update rank to Recruit, reason: ' +
                                      error
                                  );
                                }
                              }
                            );
                          }

                          // If user goes past 249xp and is a Corp.
                          if (data.xp > 249 && data.rank === 'Recruit') {
                            client.channels
                              .get('713701138888785940')
                              .send(
                                '❗❗ ' +
                                  readable +
                                  ' is due for a rankup! They should now be a **Corporal**'
                              );

                            XP.findOneAndUpdate(
                              { rsn: removeSpace },
                              { rank: 'Corporal' },
                              { useFindAndModify: false },

                              function (error) {
                                if (error) {
                                  message.channel.send(
                                    'Unable to update rank to Corporal, reason: ' +
                                      error
                                  );
                                }
                              }
                            );
                          }

                          // If user goes past 499xp and is a Corp.
                          if (data.xp > 499 && data.rank === 'Corporal') {
                            client.channels
                              .get('713701138888785940')
                              .send(
                                '❗❗ ' +
                                  readable +
                                  ' is due for a rankup! They should now be a **Sergeant**'
                              );

                            XP.findOneAndUpdate(
                              { rsn: removeSpace },
                              { rank: 'Sergeant' },
                              { useFindAndModify: false },

                              function (error) {
                                if (error) {
                                  message.channel.send(
                                    'Unable to update rank to Sergeant, reason: ' +
                                      error
                                  );
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          }
        }
      );
    }
  } else {
    message.reply(' this command can only be run be admins');
  }
};
