const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js")

module.exports.run = async (interaction,db) => {
  //console.log("a")
  const guild = interaction.guild
  const role = interaction.options.getRole("rol")
  const ticketRole = await db.get(`ticketRol_${guild.id}`)
  if(!ticketRole){
    await db.set(`ticketRol_${guild.id}`, [])
  }
  if(ticketRole){
   await db.push(`ticketRol_${guild.id}`,role.id)
  }
  embed = new EmbedBuilder()
          .setTitle("Yetkili Rol Eklendi!")
          .setDescription(`**Eklenen Yetkili Rol:**<@&${role.id}>`)
          .setColor("Green")
          .setTimestamp()

  interaction.reply({embeds:[embed]})
}

module.exports.info = {
  name:"ticket-yetkili-rol-ekle", 
  permissions:['ManageGuild'],
  aliases:[],
  data:new SlashCommandBuilder()
       .setName('ticket-yetkili-rol-ekle')
       .setDescription('ticket')
       .addRoleOption(option => 
         option
         .setName('rol')
         .setDescription('d')
         .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
}
