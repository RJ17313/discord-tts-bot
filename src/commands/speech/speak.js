const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const googleTTS = require('google-tts-api');
const { getVoiceConnection } = require('@discordjs/voice');
const { createAudioPlayer } = require('@discordjs/voice');
const { createAudioResource } = require('@discordjs/voice');
const path = require('node:path');
const { downloadFile } = require('../../utils/generateTTS');
const { convertToLanguageCode } = require('../../utils/functions');

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
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Says what you tell it to say')
		.addStringOption(option =>
			option
				.setName('speech-input')
				.setDescription('Insert what you want the bot to say')
				.setRequired(true))

		.addStringOption(option =>
			option
				.setName('voice')
				.setDescription('Choose what voice you want to use, defaults to English US')
				.setRequired(false)
				.setAutocomplete(true)),

	async execute(interaction) {
		if (interaction.options.getString('speech-input').length > 200) return await interaction.reply({ embeds: [errorLengthEmbed] });
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

		const voice = interaction.options.getString('voice') ? await convertToLanguageCode(interaction.options.getString('voice')) : 'en';

		const url = googleTTS.getAudioUrl(interaction.options.getString('speech-input'), {
			lang: voice,
			slow: false,
			host: 'https://translate.google.com',
		});

		await downloadFile(url, interaction.guildId);

		const resource = createAudioResource(path.join(__dirname, `../../audioData/${interaction.guildId}_voiceData.mp3`));

		const player = createAudioPlayer();
		connection.subscribe(player);

		player.play(resource);

		successEmbed.setDescription(`${interaction.user} sent "${interaction.options.getString('speech-input')}"`);

		await interaction.reply({ embeds: [successEmbed] });
	},
};