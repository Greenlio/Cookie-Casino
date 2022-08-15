const Discord = require("discord.js");
const db = require("quick.db");
const bot = new Discord.Client({disableEveryone: true});


module.exports.run = async (bot, message, args, utils) => {
  if(!message.content.startsWith('hi '))return;   

  let user = message.mentions.members.first() || message.author;

  let bal = db.fetch(`credits_${message.guild.id}_${user.id}`)

  if (bal === null) bal = 0;

  let main = await paymentHandler("balance", message)
  if (main === null) bank = 0;
  message.channel.send(`**${user}'s Credits**\n\nCookies: ${main}\Casino Credits: ${bal}`)
};

module.exports.help = {
  name:"balance",
  aliases: ["bal"]
}
