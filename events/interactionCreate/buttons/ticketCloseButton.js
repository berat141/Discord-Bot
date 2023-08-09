const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, EmbedBuilder} = require("discord.js")

module.exports = async (interaction,db) => {
  if(interaction.customId != "ticketKapat") return;
  const staffRoles = await db.get(`ticketRol_${interaction.guild.id}`)
  //console.log(staffRoles)
  if(staffRoles?.length > 0){
  const roles = interaction.member.roles.cache.map(x=>x.id)
    //console.log(staffRoles.some(id => roles.includes(id)))
    if(!staffRoles.some(id => roles.includes(id))){
      const embed = new EmbedBuilder()
        .setDescription("Bu bilet kanalını kapatabilmek için yeterli yetkiniz bulunmamaktadır.")
        .setColor("Green")
        .setTimestamp()
      return interaction.reply({embeds:[embed],ephemeral:true})
    }
  }

  const modal = new ModalBuilder()
			.setCustomId('ticketSebepModal')
			.setTitle('Sebep Belirtiniz');

		const reason = new TextInputBuilder()
			.setCustomId('ticketClosingReason')
			.setLabel("Sebep")
  		.setStyle(TextInputStyle.Paragraph)
      .setRequired(false)
      .setMaxLength(1024)


		const firstActionRow = new ActionRowBuilder().addComponents(reason);

	
		modal.addComponents(firstActionRow);

	
		await interaction.showModal(modal);
}
