const slotItems = [":grapes:", ":watermelon:", ":tangerine:", ":apple:", ":seven:", ":strawberry:", ":cherries:"];
const db = require("quick.db");
const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('hi '))return;   

    let user = message.author;
    let creditsdb = await db.fetch(`credits_${message.guild.id}_${user.id}`)
    let credits = parseInt(args[0]);
    let win = false;

    const creditsmore = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`:x: You are betting more than you have (you got it twisted didn't you)`);

    const creditshelp = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`:x: Specify an amount`);

    if (!credits) return message.channel.send(creditshelp);
    if (credits > creditsdb) return message.channel.send(creditsmore);
    
    let number = []
    for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

    if (number[0] == number[1] && number[1] == number[2]) { 
        credits *= 9
        win = true;
    } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
        credits *= 2
        win = true;
    }
    if (win) {
        const slotsEmbed1 = new Discord.MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou won ${credits} casino credits`)
            .setColor("RANDOM")
        message.channel.send(slotsEmbed1)
        db.add(`credits_${message.guild.id}_${user.id}`, credits)
    } else {
        const slotsEmbed = new Discord.MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou lost ${credits} casino credits`)
            .setColor("RANDOM")
        message.channel.send(slotsEmbed)
        db.subtract(`credits_${message.guild.id}_${user.id}`, credits)
    }

}
  
  module.exports.help = {
    name:"slots",
    aliases: ["sl"]
  }