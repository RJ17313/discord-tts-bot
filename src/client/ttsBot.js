const { Client, GatewayIntentBits, Collection } = require('discord.js');
const path = require('node:path');
const { getFileList } = require('../utils/functions.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.MessageContent] });

client.commands = new Collection();

const commandFiles = getFileList('src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(__dirname, '../..', file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log(`${client.user.username} connected!`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand() && !interaction.isMessageContextMenuCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isAutocomplete()) return;

	if (interaction.commandName === 'say') {
		const focusedValue = interaction.options.getFocused();
		const choices = ['English (US)', 'English (UK)', 'French (Fr)', 'Spanish (US)'];
		const filtered = choices.filter(choice => choice.startsWith(focusedValue));
		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
	}
});

client.login(process.env.TOKEN);