# Discord Bot

- Interacts with the Discord servers using [their API](https://discord.com/developers/docs/intro) to send messages and replies to users
- Interacts with a MongoDB Cloud-Based Database to store information such as a users "XP" for a fun progression-based activity tracker
- Reads and writes to local `.json` files to store un-sensisitive information such as reading responses for commands. Allows Discord users to submit information to a local `.json` file for other users to retrieve

## Explaination Write-up

This is a NodeJS application which I created for a Discord server for the game RuneScape. This application was a great sideproject and was created for fun purposes, however it did have a multitude of administration purposes.

### What this NodejS application does:

The point of entry for this application is `index.js` in root

### Models

- The models directory contains just `XP.js` which defines the scheme required to communicate with the MongoDB server

### Events

- `message.js` scans the Discord server looking for users when they speak. If they speak it will update their MongoDB database record with extra activity XP. This XP is only granted once per day so we also pass todays date and check a user hasn't messaged twice in one day.

### Commands

- `8ball.js` acts like a "Magic 8-Ball" responding to a question fired by the discord user using !8ball {QUERY}. The responses are hard-coded in `8ball-responses.json` in the project root.
- `addplayer.js` adds a user to our Cloud MongoDB, takes a query to determine the user to add, this command is protected so only those with the 'Admin' role can run it.
- `addxp.js` manually adds XP to a user in our MongoDB Cloud DB, this command is protected so only those with the 'Admin' role can run it.
- `attended.js` adds XP for users who attend events and updated to our Cloud MongoDB Database, this command is protected so only those with the 'Admin' role can run it.
- `boss.js` A simple command which chooses a string from an array to send to a user in return
- `formatguides.js` Uses FS to generate a file guides.json in the root which we will update periodically later. This command is protected by a Discord role and will log to console if a non-admin attempts to run it.
- `guide.js` Allows users to search guides.json in the root and prints the content to Discord.
- `hosted.js` adds XP for users who hosted events and updated to our Cloud MongoDB Database, this command is protected so only those with the 'Admin' role can run it.
- `meme.js` Uses axios to GET a meme an API and returns a random meme as a Discord Rich Embed
- `news.js` Calls the Runescape.com RSS feed and prints it to Discord as a message
- `ping.js` Basic ping command to confirm bot is running, also reports amount of servers running in, version from package.json , uptime and ping in MS
- `recruited.js` Add XP for recruiting a member to the clan, passes a query {USER} and checks the user doesn't exist already then pushes data to cloud-based mongoDB
- `sotwxp.js` Adds XP to a user for winning a weekly competition, command is locked to only those with the 'Admin' role and therefore checks against this and takes a query of {USER} before sending data to cloud-based mongoDB database
- `submitguide.js` Uses fs to add data to guides.json in project route, takes multiple queries from the user running command including {URL} and 3x {KEYWORD}s which will be searchable using the `guide.js` command.
- `talkedcc.js` Admin only command to grant XP to a user if they talk on RuneScape.com, takes the query {USER} and checks if the user running the command has the role 'Admin', if criteria is met update "XP" total on Cloud MongoDB
- `timenow.js` A simple text based command which uses momentJS which works out some timezones
- `whatdo.js` A simple text command which responds to someone asking "whatdo" picking a string from an Array at random then sending as a Discord Rich Embed
- `xp.js` Communicates with the cloud-based mongoDB database taking {USER} as a query and responds with that {USER}'s XP

## Pre-requisites

To work on this bot you will need:

1. Install Node.js via their website
2. Access to the application on Discord

## To run the bot locally:

1. Naivgate to the directory of the bot in the command line and type `npm install`. This will download all the dependancies from the relevant places.
2. Install nodemon globally by running `npm install -g nodemon`
3. In the bots directory, type `nodemon --inspect index.js`. This will actively watch the bot for changes and keep the bot running, acting as a host. If you wanted to skip using Nodemon just run `node index.js`, however this will not actively keep the bot open.
