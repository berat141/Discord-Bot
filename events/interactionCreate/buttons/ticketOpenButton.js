const { ModalBuilder,TextInputBuilder,ActionRowBuilder, TextInputStyle} = require("discord.js")

module.exports = async (interaction) => {
  if(interaction.customId != "open") return;
  const modal = new ModalBuilder()
			.setCustomId('modal')
			.setTitle('Sorularımız');

		const gmail = new TextInputBuilder()
			.setCustomId('mail')
			.setLabel("Mailiniz")
      .setPlaceholder("...@gmail.com")
  		.setStyle(TextInputStyle.Short)
      .setRequired(true)

		const sorun = new TextInputBuilder()
			.setCustomId('sorun')
			.setLabel("Sorununuz Nedir?")
      .setPlaceholder("Lütfen sorununuzu bizle paylaşın")
      .setRequired(true)
//      .setValue('Default')
			.setStyle(TextInputStyle.Paragraph)
      .setMaxLength(1024)

		const firstActionRow = new ActionRowBuilder().addComponents(gmail);
		const secondActionRow = new ActionRowBuilder().addComponents(sorun);

	
		modal.addComponents(firstActionRow, secondActionRow);

	
		await interaction.showModal(modal);
}
