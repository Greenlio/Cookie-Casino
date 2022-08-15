const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('hi '))return;   

  let user = message.author;
  let member = paymentHandler("balance", message)

  if (args[0] == 'all') {
    let money = paymentHandler("balance", message)
    if(money === 0) return message.channel.send("You dont have any cookies to deposit bruh")

    db.add(`casino_${message.guild.id}_${user.id}`, money)
    paymentHandler("deposit", message, money)

    
    message.channel.send(`You have deposited all your cookies (${money}) into the casino fund`)
  
  } else {
  
    if(isNaN(args[0]))return;
  if (!args[0]) {
      return message.channel.send("u gotta tell me an ammount to deposit buddy :)")
      .catch(err => console.log(err))
  }

  if (message.content.includes('-')) { 
      return message.channel.send("negative cookies is that even possible u broke shithead")
  }


  if (member < args[0]) {
      return message.channel.send("cmeon u know u dont have that many cookies to deposit breh")
  }

  const embed5 = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`:white_check_mark: You have deposited ${args[0]} cookies into the casino fund`);

  message.channel.send(embed5)
  db.add(`casino_${message.guild.id}_${user.id}`, args[0])
  paymentHandler("deposit", message, money)
  }
}
module.exports.help = {
  name:"deposit",
  aliases: ["dep"]
}