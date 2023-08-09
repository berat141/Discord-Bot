const { Embed } = require("discord.js")
const inspect = require("util").inspect

module.exports.run = async (client,message,args,db) => {
      if (message.author.id == "700763255978852462") {
    const code = args.join(" ");
    try {
      var evaled = clean(await eval(code));
      message.channel.send({content: String(evaled).slice(0,2000)})
    } catch (err) {
      message.channel.send(`\`\`\`js
${err}\`\`\``);
    }

    function clean(text) {
      if (typeof text !== "string")
        text = require("util").inspect(text, { depth: 0 });
      text = text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
      return text;
    }
  }
}

module.exports.info = {
  name:'eval',
  aliases:["e","js"],
 // permissions:[]
}
