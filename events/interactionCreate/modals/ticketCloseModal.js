const { EmbedBuilder } = require("discord.js")
module.exports = async (interaction,db) => {
  fields = interaction.fields.fields
  reason = fields.get('ticketClosingReason')
  if(!reason) return;
  const ticketCount = await db.get("ticketCount_"+interaction.guild.id)
  const opener = await db.get(`ticketOpener_${interaction.guild.id}_${interaction.message.channelId}`)
  const user_opener = interaction.guild.members.cache.get(opener)
  const log = await db.get(`ticketLog_${interaction.guild.id}`)
  //console.log(interaction.channel.id,reason.value)
  await interaction.guild.channels.delete(interaction.channel.id,reason.value)
  interaction.reply("")
  embed = new EmbedBuilder()
          .setTitle("Destek Kapatıldı!")
          .addFields(
          {name:"Ticket ID", value:String(ticketCount)},
          {name:"Destek Talebini Açan Kişi",value:`<@${opener}>`},
          {name:"Destek Talebini Kapatan Kişi",value:`<@${interaction.user.id}>`},
          {name:"Sebep", value:reason.value.length > 0 ? reason.value : "Sebep Belirtilmedi"}
          )
          .setTimestamp()
          .setColor("Green")

  if(log) {
interaction.guild.channels.cache.get(log).send({embeds:[embed]})
  }
  //console.log(interaction)
  user_opener?.send({embeds:[embed]}).catch(err => {})
  await db.delete(`ticketOpener_${interaction.guild.id}_${interaction.message.channelId}`)
}
