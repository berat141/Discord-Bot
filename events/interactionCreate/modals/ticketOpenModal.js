const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, PermissionsBitField, ChannelType, ButtonStyle } = require("discord.js")

module.exports = async (interaction,db) => {
  fields = interaction.fields.fields
  const [f1,f2] = fields.toJSON().map(x=>x.customId)
  if(!(f1 == "mail" && f2 == "sorun")) return;
  const channels = interaction.guild.channels
  const cachedChannels = channels.cache
  const guild = interaction.guild
  let category = cachedChannels.filter(x=>x.name == "DESTEK" && x.type == ChannelType.GuildCategory).find(x=>db.get(`ticketKategori_${guild.id}_${x.id}`))

  //console.log(category)
  const data = await db.get(`ticketRol_${interaction.guild.id}`)
  const log = await db.get(`ticketLog_${guild.id}`)
  const staffRoles = [{
        id:interaction.guild.id,
        deny:[PermissionsBitField.Flags.ViewChannel]
      },
      {
        id:interaction.user.id,
        allow:[PermissionsBitField.Flags.ViewChannel]
      }]
  data?.forEach(id=> {
    staffRoles.push(
      {
        id:id,
        allow:[PermissionsBitField.Flags.ViewChannel]
      }
    )
  })
  if(!category){
  const cat = await interaction.guild.channels.create({
    name:"DESTEK",
    type: ChannelType.GuildCategory,
    permissionOverwrites: [...staffRoles]
  }).then(c => channels.setPosition(c.id,0))
    db.set(`ticketKategori_${guild.id}_${cat.id}`,cat.id)
    category = cat
  }
  const ticketCount = await db.get(`ticketCount_${interaction.guild.id}`) + 1
  const ticket = await channels.create({
    name:`bilet-${ticketCount}`,
    parent:category,
    permissionOverwrites: [...staffRoles]
  })
  await db.set(`ticketCount_${interaction.guild.id}`, ticketCount + 1)

  const reply = new EmbedBuilder()
    .setTitle("Destek Kanalınız Oluşturuldu")
    .setDescription(`**Destek Kanalı:**<#${ticket.id}>`)
    .setColor([52, 233, 72])
  
 interaction.reply({embeds:[reply], ephemeral:true})
  if(log){
   // console.log(interaction)
  await db.set(`ticketOpener_${guild.id}_${ticket.id}`,interaction.user.id)
  }

  const e1 = new EmbedBuilder()
             .setDescription("Bizimle iletişime geçtiğiniz için teşekkürler.\nLütfen sorununuzu anlatın ve yanıt için yetkililerin gelmesini bekleyin.")
             .setColor("Green")
             .setTimestamp()
  
  const e2 = new EmbedBuilder()
             .addFields(
            {name:"**Mailiniz**",value:fields.get(f1).value},
            {name:"**Sorununuz**",value:fields.get(f2).value}
             )
             .setColor("Green")

  
  const close = new ButtonBuilder()
			.setCustomId('ticketKapat')
			.setLabel('Kapat')
			.setStyle(ButtonStyle.Danger);

  const row = new ActionRowBuilder().addComponents(close)
		
  ticket.send({embeds:[e1]})
  ticket.send({embeds:[e2],components:[row]})
}
