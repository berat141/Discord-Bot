const { TextInputBuilder,SlashCommandBuilder,ButtonBuilder,ButtonStyle,ActionRowBuilder,ModalBuilder,TextInputStyle, Embed,EmbedBuilder, ComponentType, PermissionFlagsBits } = require("discord.js") 

//ticket-kanal-ayarla
//ticket-mesaj-ayarla
//ticket-kurulum


module.exports.run = async (interaction,db) =>{
  const channelId = await db.get("ticketKanal_"+interaction.guild.id)
  const staffRoles = await db.get(`ticketRol_${interaction.guild.id}`)
  const log = await db.get(`ticketLog_${interaction.guild.id}`)

  if(!channelId){
  const warnEmbed = new EmbedBuilder()
  .setTitle("**Kurulum Komutları**")
  .setDescription(`\n/ticket-mesaj-kanal-ayarla {kanal}\n(Gerekli)\n\n/ticket-yetkili-rol-ekle {rol}\n(İsteğe Bağlı)\n\n/ticket-log-ayarla {kanal}\n(İsteğe Bağlı)\n\n**Ayarlanma Durumları:**\nTicket Mesaj Kanalı: ❌\nTicket Yetkili Rolleri: ${staffRoles?.length > 0 ? staffRoles.map(x=>"<@&"+x+">") : '❌'}\nTicket Log Kanalı:${log ? log.map(x=>'<#'+x+'>') : '❌'}`)
    .setColor('Yellow')

    return interaction.reply({embeds:[warnEmbed]})
  }

  
  const channel = await interaction.guild.channels.cache.get(channelId)
  db.set("ticketCount_"+interaction.guild.id,0)

  const embed = new EmbedBuilder()
  .setTitle("Destek Talebi")
  .setDescription("Özel destek kanalı açmak için tıklayın!")
  .setColor("#2C86DB")
  

  button = new ButtonBuilder()
	.setCustomId('open')
	.setLabel('📩')
	.setStyle(ButtonStyle.Danger)
  
  row = new ActionRowBuilder()
        .addComponents(button)
  interaction.reply({embeds:[embed],components:[row]})

  
  
}
module.exports.info = {
  name:"ticket-kurulum",
  permissions:["ManageGuild"],
  aliases:[],
  data:new SlashCommandBuilder()
    .setName("ticket-kurulum")
    .setDescription("b")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
}
