const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "clear",
  aliases: ["purge", "clearmsgs"],
  description: "Clear Your Messages!",
  usage: "Clear <Message Amount>",
  run: async (client, message, args) => {
    //Start
    message.delete();
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "You dont have access to this command. Make sure you have the MANAGE MESSAGES permission."
      );

    if (!args[0])
      return message.channel.send(`Please give me a valid amount of messages.`);

    if (isNaN(args[0]))
      return message.channel.send(`Please give me a number value`);

    if (args[0] < 4)
      return message.channel.send(
        `You can delete ${args[0]} by yourself. It's not too many messages.`
      );

    if (args[0] > 100)
      return message.channel.send(
        `I can't delete ${args[0]} because of Discord's limit.`
      );

    let Reason = args.slice(1).join(" ") || "No Reason Provided!";

    message.channel.bulkDelete(args[0]).then(Message => {
      let embed = new Discord.MessageEmbed()
        .setColor(Color)
        .setTitle(`Messages Deleted!`)
        .addField(`Moderator`, `${message.author.tag} (${message.author.id}`)
        .addField(`Channel`, `${message.channel.name} (${message.channel.id}`)
        .addField(`Deleted Messages`, `${Message.size}`)
        .addField(`Reason`, `${Reason}`)
        .setFooter(`Requested by ${message.author.username}`)
        .setTimestamp();
      return message.channel
        .send(embed)
        .then(msg => msg.delete({ timeout: 10000 }));
    });

    //End
  }
};