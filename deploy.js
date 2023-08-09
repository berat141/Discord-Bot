const { Client, Events, GatewayIntentBits, Collection, Embed,  ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle ,REST, Routes, SlashCommandBuilder} = require('discord.js');
const fs = require('fs')
const intents = require("./config.js").intent(GatewayIntentBits)
const token = process.env.TOKEN

/*const client = new Client({ intents: intents });
 
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});*/
//const { REST, Routes } = require('discord.js');

const [clientId, guildId] = [824957445293604864,723432458896277506]
  //const fs = require('node:fs');
const path = require('node:path');

const commands = [];
// Grab all the command files from the commands directory you created earlier
module.exports = async (id) => {
const foldersPath = path.join(__dirname, 'commands');

  for(file of fs.readdirSync("./commands")){
    command = require("./commands/"+file)
    if(command.info.data){
      commands.push(command.info.data)
    }
  }
// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
	Routes.applicationCommands(id),
	{ body: commands },
);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
}
