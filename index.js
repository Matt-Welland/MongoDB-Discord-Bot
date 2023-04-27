/**
 * Entry Point of NodeJS Application
 */

// Define our requirements
const Discord = require('discord.js');
const Enmap = require('enmap');
const fs = require('fs');
const mongoose = require('mongoose');

// Interact with Discord API + Add our config file with sensitive information
const client = new Discord.Client();
const config = require('./config.json');
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;

// Connect to our MongoDB Cloud-Based Database.
mongoose.connect(
  'mongodb+srv://' +
    config.dbUser +
    ':' +
    config.dbPass +
    '@runescapeguild-tgahk.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log('Connected to the MongoDB');
    }
  }
);

// Message the CMD line to show bot is working
client.on('ready', () => {
  console.log('Discord BotBot Online.');
});

// Set the bots Activity status to running
client.on('ready', () => {
  client.user.setActivity('Running Discord Bot');
});

// Use fs dependancy to read the /events/ directory for files
fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(`./events/${file}`);
    let eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
  });
});
client.commands = new Enmap();

// Use the fs dependancy to read the /commands/ directory for files
fs.readdir('./commands/', (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith('.js')) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split('.')[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.login(config.token);
