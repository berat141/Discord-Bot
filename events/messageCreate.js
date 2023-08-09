module.exports = async (client,message,db) => {
  if(message.author.bot) return;
  if(!message.content.startsWith(client.prefix)) return;
  const cmd = message.content.trim().split(" ")[0].slice(1)
  const command = client.commands.get(cmd) || client.aliases.get(cmd);
  if(!command) return;
  const perms = command.info.permissions;
  const memberPerms = message.member.permissions.toArray()
    if(perms){
    if(perms.every(p=>memberPerms.includes(p))){
    return message.channel.send("yetkin yok")
    }
    }else {
      const args = message.content.trim().split(" ").filter(x=>x != "").slice(1)
      command.run(client,message,args,db)
    }
}
