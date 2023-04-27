/**
 * This event is constantly looking for users talking in the Discord and updates their MongoDB XP every day they talk.
 */
const Discord = require('discord.js');
const mongoose = require('mongoose');
const XP = require('../models/XP');

module.exports = (client, message) => {
  // Ignore all bots
  if (message.author.bot) return;

  // If the user has a Server Nickname...
  if (message.member && message.member.nickname) {
    // Work out date today.
    let dateObj = new Date();
    let month = String(dateObj.getMonth() + 1).padStart(2, '0');
    let day = String(dateObj.getDate()).padStart(2, '0');
    let year = dateObj.getFullYear();
    let todaysDate = day + '/' + month + '/' + year;

    // Get the Discord user who talked username
    let serverName = message.member.nickname;

    // Add an Underscore to replace any spaces so we don't break the database.
    let removeSpace = serverName.replace(/ /g, '%');
    removeSpace = removeSpace.toLowerCase();

    // Find a MongoDB record, if we don't, error.
    XP.findOne(
      {
        rsn: removeSpace.replace(/ /g, '%'),
      },
      function (error, data) {
        // Handle any errors we may get whilst connecting to MongoDB
        if (error) {
          client.channels
            .get('713701138888785940')
            .send(
              'Error connecting to MongoDB to award ' +
                serverName +
                ' XP for talking in Discord.'
            );
        }

        // We're connecting to MongoDB
        else {
          // Handle the instance that the user in the Disc isn't in Mongo
          if (!data) {
            client.channels
              .get('713701138888785940')
              .send(
                'I cannot find ' +
                  serverName +
                  ' in my database, is their nickname configured correctly?'
              );
          } else {
            // If the person has already talked today
            if (data.talkedDiscord === todaysDate) {
              // Gracefully exit.
            } else {
              // Find users current XP
              let newXp = data.xp + 5;

              // POST to database
              XP.findOneAndUpdate(
                { rsn: removeSpace },
                { xp: newXp },
                { useFindAndModify: false },

                function (err, result) {
                  // If we get an error updating
                  if (err) {
                    const addSpaces = data.rsn.replace(/%/g, ' ');

                    client.channels
                      .get('713819471583641660')
                      .send(
                        'Unable to update XP for ' +
                          addSpaces +
                          '. Reason: ' +
                          err +
                          ' ' +
                          result
                      );
                  }

                  // Else, we have succsessfully updated the user
                  else {
                    client.channels
                      .get('713819471583641660')
                      .send(
                        'Awarded XP for talking on discord to ' +
                          serverName +
                          ' on ' +
                          todaysDate +
                          '\n\n' +
                          'New XP: **' +
                          newXp +
                          '**'
                      );

                    XP.findOneAndUpdate(
                      { rsn: removeSpace },
                      { talkedDiscord: todaysDate },
                      { useFindAndModify: false },

                      function (err, data) {
                        if (err) {
                          client.channels
                            .get('713701138888785940')
                            .send(
                              'Unable to POST **date** to Database. Error: ' +
                                error
                            );
                        }

                        // If user goes past 19xp and is a recruit.
                        if (data.xp > 19 && data.rank === 'Smiley') {
                          client.channels
                            .get('713701138888785940')
                            .send(
                              '❗❗ ' +
                                serverName +
                                ' is due for a rankup! They should now be a **Recruit**'
                            );

                          XP.findOneAndUpdate(
                            { rsn: removeSpace },
                            { rank: 'Recruit' },
                            { useFindAndModify: false },

                            function (error) {
                              if (error) {
                                client.channels
                                  .get('713701138888785940')
                                  .send(
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
                                serverName +
                                ' is due for a rankup! They should now be a **Corporal**'
                            );

                          XP.findOneAndUpdate(
                            { rsn: removeSpace },
                            { rank: 'Corporal' },
                            { useFindAndModify: false },

                            function (error) {
                              if (error) {
                                client.channels
                                  .get('713701138888785940')
                                  .send(
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
                                serverName +
                                ' is due for a rankup! They should now be a **Sergeant**'
                            );

                          XP.findOneAndUpdate(
                            { rsn: removeSpace },
                            { rank: 'Sergeant' },
                            { useFindAndModify: false },

                            function (error) {
                              if (error) {
                                client.channels
                                  .get('713701138888785940')
                                  .send(
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
  } else {
    // do nothing
  }

  /**
   * Edge case for users who haven't set a custom Discord
   */

  if (message.member && !message.member.nickname) {
    // Work out date today.
    let dateObj = new Date();
    let month = String(dateObj.getMonth() + 1).padStart(2, '0');
    let day = String(dateObj.getDate()).padStart(2, '0');
    let year = dateObj.getFullYear();
    let todaysDate = day + '/' + month + '/' + year;

    // Add an Underscore to replace any spaces so we don't break the database.
    let removeSpaceOne = message.member.user.tag;
    let removeSpaceTwo = removeSpaceOne.toLowerCase();
    let removeSpaceThree = removeSpaceTwo.split('#')[0];
    let removeSpace = removeSpaceThree.replace(/ /g, '%');

    const serverName = removeSpaceThree;

    XP.findOne(
      {
        rsn: removeSpace,
      },
      function (error, data) {
        // Handle any errors we may get whilst connecting to MongoDB
        if (error) {
          client.channels
            .get('713701138888785940')
            .send(
              'Error connecting to MongoDB to award ' +
                serverName +
                ' XP for talking in Discord.'
            );
        }

        // We're connecting to MongoDB
        else {
          // Handle the instance that the user in the Disc isn't in Mongo
          if (!data) {
            client.channels
              .get('713701138888785940')
              .send(
                'I cannot find ' +
                  serverName +
                  " in my database. They don't have a nickname and I am currently using their Discord name. Does their Discord Name match their RSN?"
              );
          } else {
            // If the person has already talked today
            if (data.talkedDiscord === todaysDate) {
              // do nothing.
            } else {
              // Find users current XP
              let newXp = data.xp + 5;

              // Post to database
              XP.findOneAndUpdate(
                { rsn: removeSpace },
                { xp: newXp },
                { useFindAndModify: false },

                function (err, result) {
                  // If we get an error updating
                  if (err) {
                    const addSpaces = data.rsn.replace(/%/g, ' ');

                    client.channels
                      .get('713819471583641660')
                      .send(
                        'Unable to update XP for ' +
                          addSpaces +
                          '. Reason: ' +
                          err
                      );
                  }

                  // Succsessfully updated user in DB
                  else {
                    client.channels
                      .get('713819471583641660')
                      .send(
                        'Awarded XP for talking on discord to ' +
                          serverName +
                          ' on ' +
                          todaysDate +
                          '\n\n' +
                          'New XP: **' +
                          newXp +
                          '**'
                      );

                    XP.findOneAndUpdate(
                      { rsn: removeSpace },
                      { talkedDiscord: todaysDate },
                      { useFindAndModify: false },

                      function (err, data) {
                        if (err) {
                          client.channels
                            .get('713701138888785940')
                            .send(
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
                                serverName +
                                ' is due for a rankup! They should now be a **Recruit**'
                            );

                          XP.findOneAndUpdate(
                            { rsn: removeSpace },
                            { rank: 'Recruit' },
                            { useFindAndModify: false },

                            function (error) {
                              if (error) {
                                client.channels
                                  .get('713701138888785940')
                                  .send(
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
                                serverName +
                                ' is due for a rankup! They should now be a **Corporal**'
                            );

                          XP.findOneAndUpdate(
                            { rsn: removeSpace },
                            { rank: 'Corporal' },
                            { useFindAndModify: false },

                            function (error) {
                              if (error) {
                                client.channels
                                  .get('713701138888785940')
                                  .send(
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
                                serverName +
                                ' is due for a rankup! They should now be a **Sergeant**'
                            );

                          XP.findOneAndUpdate(
                            { rsn: removeSpace },
                            { rank: 'Sergeant' },
                            { useFindAndModify: false },

                            function (error) {
                              if (error) {
                                client.channels
                                  .get('713701138888785940')
                                  .send(
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
  } else {
    // do nothing
  }

  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(client.config.prefix) !== 0) return;

  // Our standard argument/command name definition.
  const args = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  // Run the command
  cmd.run(client, message, args);
};
