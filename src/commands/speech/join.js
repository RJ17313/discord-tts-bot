const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const errorEmbed = new EmbedBuilder()
	.setColor('Red')
	.setTitle('Error')
	.setDescription('It appears that you are not in a vc');

const joinedEmbed = new EmbedBuilder()
	.setColor('Green')
	.setTitle('Success')
	.setDescription('I have joined your voice channel');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Joins a vc'),

	async execute(interaction) {
		const member = await interaction.member.fetch();

		if (!member.voice.channelId) return await interaction.reply({ embeds: [errorEmbed] });

		joinVoiceChannel({
			channelId: member.voice.channelId,
			guildId: interaction.guildId,
			adapterCreator: interaction.channel.guild.voiceAdapterCreator,
		});

		await interaction.reply({ embeds: [joinedEmbed] });

	},
};