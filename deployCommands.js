const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { getFileList } = require('./src/utils/functions');
require('dotenv').config();

const commands = [];

const files = getFileList('src/commands').filter(file => file.endsWith('.js'));
for (const commandsPath of files) {
	const filePath = path.join(__dirname, commandsPath);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
	.then(data => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);