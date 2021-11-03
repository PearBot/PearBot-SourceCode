const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "kick",
  aliases: [],
  description: "Kick A Member!",
  usage: "Kick <Mention Member>",
  run: async (client, message, args) => {
    //Start
    message.delete();
    if (!message.member.hasPermission("KICK_MEMBERS"))
      return message.channel.send(
        `You don't have permission to use this command! Make sure you have the 'KICK MEMBERS' permission to kick a user.`
      );

    let Member = message.mentions.users.first();

    if (!Member)
      return message.channel.send(
        `Please mention a member that you want to kick.`
      );

    if (!message.guild.members.cache.get(Member.id))
      return message.channel.send(`Please mention a valid member.`);

    if (Member.id === message.author.id)
      return message.channel.send(`You can't kick yourself Silly.`);

    if (Member.id === client.user.id)
      return message.channel.send(`Please don't kick me!`);

    if (Member.id === message.guild.owner.user.id)
      return message.channel.send(`You can't kick the owner of this server!`);

    let Reason = args.slice(1).join(" ");

    let User = message.guild.member(Member);

    if (!User.kickable)
      return message.channel.send(`I can't kick that member.`);

    try {
      console.log(`Member is going to get kicked!`);

      setTimeout(function() {
        User.kick({ reason: `${Reason || "No Reason Provided!"}` });
      }, 2000);
      let embed = new Discord.MessageEmbed()
        .setColor(Color)
        .setTitle(`Member kicked.`)
        .addField(`Moderator`, `${message.author.tag} (${message.author.id}`)
        .addField(`Kicked Member`, `${Member.tag} (${Member.id})`)
        .addField(`Reason`, `${Reason || "No Reason Provided!"}`)
        .setFooter(`Requested by ${message.author.username}`)
        .setTimestamp();
      if (User && Member.bot === false)
        Member.send(
          `You have been kicked from **${message.guild.name}** For ${Reason ||
            "No Reason Provided!"}`
        );
      message.channel.send(embed);
      console.log(
        `User: ${Member.tag} (${Member.id}) just got kicked from${
          message.guild.name
        } For ${Reason || "No Reason Provided!"}`
      );
    } catch (error) {
      return message.channel
        .send(
          `I can't kick that user. Maybe he has a higher role than me!`
        )
        .then(() => console.log(error));
    }

    //End
  }
};
