const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('hi '))return;   

  let user = message.author;

  function isOdd(num) { 
	if ((num % 2) == 0) return false;
	else if ((num % 2) == 1) return true;
}
    
let colour = args[0];
let creditsdb = await db.fetch(`credits_${message.guild.id}_${user.id}`)
let credits = parseInt(args[1]);

let random = Math.floor(Math.random() * 37);

let creditshelp = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`:x: Specify an amount to gamble | hi roulette <color> <amount>`);

let creditsmore = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`:x: You are betting more than you have`);

let colorbad = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`:x: Specify a color | Red [1.5x] Black [2x] Green [15x]`);


    if (!colour)  return message.channel.send(colorbad);
    colour = colour.toLowerCase()
    if (!credits) return message.channel.send(creditshelp); 
    if (credits > creditsdb) return message.channel.send(creditsmore);
    
    if (colour == "b" || colour.includes("black")) colour = 0;
    else if (colour == "r" || colour.includes("red")) colour = 1;
    else if (colour == "g" || colour.includes("green")) colour = 2;
    else return message.channel.send(colorbad);
    
    
    
    if (random == 0 && colour == 2) { // Green
        credits *= 15
        db.add(`credits_${message.guild.id}_${user.id}`, credits)
        let creditsEmbed1 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`:green_square: You won ${credits} casino credits\n\nMultiplier: 15x`);
        message.channel.send(creditsEmbed1)
        console.log(`${message.author.tag} Won ${credits} on green`)
    } else if (isOdd(random) && colour == 1) { // Red
        credits = parseInt(credits * 1.5)
        db.add(`credits_${message.guild.id}_${user.id}`, credits)
        let creditsEmbed2 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`:red_square: You won ${credits} casino credits\n\nMultiplier: 1.5x`);
        message.channel.send(creditsEmbed2)
    } else if (!isOdd(random) && colour == 0) { // Black
        credits = parseInt(credits * 2)
        db.add(`credits_${message.guild.id}_${user.id}`, credits)
        let creditsEmbed3 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`:black_square_button: You won ${credits} casino credits\n\nMultiplier: 2x`);
        message.channel.send(creditsEmbed3)
    } else { // Wrong
        db.subtract(`credits_${message.guild.id}_${user.id}`, credits)
        let creditsEmbed4 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`:x: You lost ${credits} casino credits\n\nMultiplier: 0x`);
        message.channel.send(creditsEmbed4)
    }
}

  
  module.exports.help = {
    name:"roulette",
    aliases: ["roul"]
  }