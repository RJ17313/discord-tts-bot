const { getVoiceConnection } = require('@discordjs/voice');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const leftEmbed = new EmbedBuilder()
	.setColor('Green')
	.setTitle('Success')
	.setDescription('I have left your voice channel');

const errorEmbed = new EmbedBuilder()
	.setColor('Red')
	.setTitle('Error')
	.setDescription('It appears that I am not in a voice channel');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Leaves a vc'),

	async execute(interaction) {
		const connection = getVoiceConnection(interaction.guildId);

		if (!connection) return await interaction.reply({ embeds: [errorEmbed] });

		await interaction.reply({ embeds: [leftEmbed] });
		connection.destroy();
	},
};