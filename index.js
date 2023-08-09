const { Client, Events, GatewayIntentBits, Collection, Embed,  ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle ,REST, Routes, SlashCommandBuilder, ChannelType, PermissionsBitField,EmbedBuilder,ButtonBuilder,ButtonStyle } = require('discord.js');
const fs = require('fs')
const { QuickDB } = require("quick.db")
const db = new QuickDB()
const InteractionCreateHandlers = require("./events/interactionCreate/InteractionCreateHandlers")
const intents = require("./config.js").intent(GatewayIntentBits)
const token = process.env.TOKEN

const client = new Client({ intents: [intents] });
client.login(token)

client.commands = new Collection()
client.slashCommands = new Collection()
client.aliases = new Collection()
client.prefix = "!"

const messageCreate = require("./events/messageCreate")

const dirFiles = fs.readdirSync("./commands")
for(const file of dirFiles) {
  const command = require(`./commands/${file}`)
  if(!command.info.data) {
    client.commands.set(command.info.name,command)
    command.info.aliases.forEach(al => client.aliases.set(al,command))
  } else {

client.slashCommands.set(command.info.name,command)
  }
}

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
  require("./deploy")(client.user.id)
});

client.on(Events.MessageCreate, (message) => {
  messageCreate(client,message,db)
})
//console.log(client.slashCommands)

client.on(Events.InteractionCreate, async (interaction) => {
  if(!interaction.isChatInputCommand) return;
  command =  client.slashCommands.get(interaction.commandName)
  if (command) {
        command.run(interaction,db)
	}
})
client.on(Events.InteractionCreate, async interaction => {
  if(!interaction.isButton()) return;
InteractionCreateHandlers.buttons.ticketOpenButton(interaction,db)
InteractionCreateHandlers.buttons.ticketCloseButton(interaction,db)
})

client.on(Events.InteractionCreate, async interaction => {
  if(!interaction.isModalSubmit()) return;
InteractionCreateHandlers.modals.ticketOpenModal(interaction,db)
InteractionCreateHandlers.modals.ticketCloseModal(interaction,db)
})

      
