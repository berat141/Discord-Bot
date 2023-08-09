const { SlashCommandBuilder, PermissionFlagsBits,ChannelType,EmbedBuilder} = require("discord.js")

module.exports.run = async (interaction,db) => {
  const channel = interaction.options.getChannel('kanal')
  const guild = interaction.guild
  //console.log(guild)
  //console.log(data)
    await db.set(`ticketKanal_${guild.id}`, channel.id)
    const embed = new EmbedBuilder().setTitle("Kanal Ayarlandı").setDescription(`\` Kanal başarıyla ayarlandı! \`\n\n**Kanal:**<#${channel.id}>}**`).setColor('Green')
    interaction.reply({embeds:[embed]})
}

module.exports.info = {
  name:"ticket-mesaj-kanal-ayarla", 
  permissions:['ManageGuild'],
  aliases:[],
  data:new SlashCommandBuilder()
       .setName('ticket-mesaj-kanal-ayarla')
       .setDescription('ticket')
       .addChannelOption(option => 
         option
         .setName('kanal')
         .setDescription('d')
         .setRequired(true)
         .addChannelTypes(ChannelType.GuildText))
         .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
}
