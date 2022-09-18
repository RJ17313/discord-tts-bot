# Discord-TTS-Bot V2.0
A Discord bot that utilizes Google's text to speech api to allow you to send tts voice messages inside of a Discord voice channel.

## Main Updates
* Completely new codebase (changed from Python to JavaScript)
* Slash command support
* Context menu support
* Works in multiple servers at the same time now
* Removed old command format (prefix commands)

## Command Usage
`/join` - Joins the voice channel you're currently in

`/leave` - Leaves the voice channel the bot is currently in

`/say speech-input voice` - Says what you input in `speech-input`. Also changes the voice if you specifiy a voice `voice`, otherwise it will default to English (US)

There is also a context menu command that you can use when you right click on a message, go to "Apps", and select "Read Message"

## How to host
Requirements:

* Node.js v18 or higher
* Npm 8 or higher

1. Clone the repository
2. Create or use an existing Discord bot application from https://discord.com/developers/applications
3. Head over to the `.env.example` file and fill in the necessary details
4. Rename `.env.example` to `.env`
5. Run `npm i` to install dependencies
6. Run `node deployCommands.js` in order to register the commands to your specified guild
7. Run `node .` to finally run the bot

## Why?
After going through my Github repositories, I have noticed that the code on my repositories does not accurately reflect my current skill set as an aspiring developer. I released Discord-TTS-Bot 11 months ago from today because I was learning Python and made a short bot because I thought the idea of a TTS Discord bot was cool. Recently however, I have been picking up on JavaScript and decided to recreate this bot as to both learn, and showcase my progress as a developer. While I have not intended to host this bot, feel free to clone this repository and host it yourself if you are curious. Version 1.0 of the bot is still avaliable if you switch over to the `v1.0` branch. I have not modified v1.0 at all since the creation of v2.0 and as a final note, I created v2.0 in one day.

## FAQ
**Question:** Will you continue to update this bot?

**Answer:** No probably not I did this just to showcase how much I have learned so far
##

**Question:** Will you host this bot?

**Answer:** No but you can if you want to, I have directions on how to host the bot [above](#how-to-host)
