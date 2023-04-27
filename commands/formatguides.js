/**
 * COMMAND: Uses FS to generate a file guides.json in the root which we will update periodically later. This command is protected by a Discord role and will log to console if a non-admin attempts to run it.
 */

// Requirements
const Discord = require('discord.js');
const fs = require('fs');

exports.run = async (client, message) => {
  // Get if the user is an admin and check later on where needed
  const modRole = message.guild.roles.find((role) => role.name === 'Admin');
  const checkRoles = message.member.roles.has(modRole.id);

  // Get the users discord name for logging perposes
  const username = message.member.user.tag;

  // How the file should be formatted
  const guides = {
    guide: [
      // To be populated via submitguide.js
    ],
  };

  // Allow admins to clear and format the file.
  if (checkRoles) {
    message.channel.send('Guides have been cleared.');

    fs.writeFile('./guides.json', JSON.stringify(guides, null, 4), (err) => {
      if (err) throw err;
      console.log(username + ' has cleared all guides from the JSON file');
    });
  }

  // Disallow users with suffecient permissions to clear the file
  // and log the username in the console as an error
  if (!checkRoles) {
    message.reply(
      ' you have attempted to delete ALL guides from our database without sufficient permissions. An admin has been contacted.\n\n' +
        ' Seeing this message by mistake? You may not have the correct roles in the discord server.'
    );

    console.log(
      username +
        ' has attempted to clear the JSON file with insufficient permissions.'
    );
  }
};
