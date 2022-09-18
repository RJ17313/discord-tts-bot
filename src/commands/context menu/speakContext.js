const { ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');
const googleTTS = require('google-tts-api');
const { downloadFile } = require('../../utils/generateTTS');
const { createAudioPlayer } = require('@discordjs/voice');
const { createAudioResource } = require('@discordjs/voice');
const path = require('node:path');

const errorLengthEmbed = new EmbedBuilder()
	.setColor('Red')
	.setTitle('Error')
	.setDescription('That message was longer than 200 characters. Unfortunately due to Google API limits, you cannot send messages longer than 200 characters.');

const errorEmbed = new EmbedBuilder()
	.setColor('Red')
	.setTitle('Error')
	.setDescription('It appears that you are not in a vc');

const successEmbed = new EmbedBuilder()
	.setColor('Green')
	.setTitle('Spoke');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('Read message')
		.setType(ApplicationCommandType.Message),

	async execute(interaction) {
		if (interaction.targetMessage.content.length > 200) return await interaction.reply({ embeds: [errorLengthEmbed] });
		if (!getVoiceConnection(interaction.guildId)) {
			const member = await interaction.member.fetch();

			if (!member.voice.channelId) return await interaction.reply({ embeds: [errorEmbed] });

			const { joinVoiceChannel } = require('@discordjs/voice');
			joinVoiceChannel({
				channelId: member.voice.channelId,
				guildId: interaction.guildId,
				adapterCreator: interaction.channel.guild.voiceAdapterCreator,
			});
		}
		const connection = getVoiceConnection(interaction.guildId);

		const url = googleTTS.getAudioUrl(interaction.targetMessage.content, {
			lang: 'en',
			slow: false,
			host: 'https://translate.google.com',
		});

		await downloadFile(url, interaction.guildId);

		const resource = createAudioResource(path.join(__dirname, `../../audioData/${interaction.guildId}_voiceData.mp3`));

		const player = createAudioPlayer();
		connection.subscribe(player);

		player.play(resource);

		successEmbed.setDescription(`Saying "${interaction.targetMessage.content}" originally sent from ${interaction.targetMessage.author}\n[Jump to Message](https://discord.com/channels/${interaction.guildId}/${interaction.channelId}/${interaction.targetMessage.id})`);
		await interaction.reply({ embeds: [successEmbed] });

	},
};