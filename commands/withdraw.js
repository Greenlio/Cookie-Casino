const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('hi '))return;   

  let user = message.author;
  if(isNaN(args[0]))return;
  let member = db.fetch(`credits_${message.guild.id}_${user.id}`)
  let member2 = paymentHandler("balance", message)

  if (args[0] == 'all') {
    let money = await db.fetch(`credits_${message.guild.id}_${user.id}`)
    
    db.subtract(`credits_${message.guild.id}_${user.id}`, money)
    paymentHandler("withdraw", message, money)
    
  message.channel.send(`Withdrawn all casino credits to cookies. \`\`(${money})\`\``)
  
  } else {

  
  if (!args[0]) {
      return message.channel.send("u gotta tell me an amount to withraw u cant withraw air breh")
  }
  
  if (message.content.includes('-')) { 
      return message.channel.send("cannot withdraw negative credits")
  }


  if (member2 < args[0]) {
      return message.channel.send("u don't have that much money in the system and u know it broke shit head")
  }

  const embed5 = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`:white_check_mark: You have withdrawn ${args[0]} coins from your casino credits fund`);

  message.channel.send(embed5)
  db.subtract(`casino_${message.guild.id}_${user.id}`, args[0])
  paymentHandler("withdraw", message, args[0])
  }
}


module.exports.help = {
  name:"withdraw",
  aliases: ["wd"]
}