const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, ChannelType} = require("discord.js")

module.exports.run = async (interaction,db) => {
  const channel = interaction.options.getChannel("kanal")
  await db.set(`ticketLog_${interaction.guild.id}`, channel.id)
  embed = new EmbedBuilder()
          .setTitle("Ticket Log Kanalı Ayarlandı!")
          .setDescription("**Kanal:**<#"+channel.id+">")
          .setColor("Green")
          .setTimestamp()

  interaction.reply({embeds:[embed]})
  
}

module.exports.info = {
  name:"ticket-log-ayarla",
  permissions:["ManageGuild"],
  aliases:[],
  data:new SlashCommandBuilder()
    .setName("ticket-log-ayarla")
    .setDescription("b")
    .addChannelOption(option => 
     option
     .setName('kanal')
     .setDescription('d')
     .setRequired(true)
     .addChannelTypes(ChannelType.GuildText))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
}
