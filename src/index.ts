require("dotenv").config();
import { Client } from "discord.js";

const client = new Client({
  partials: ["MESSAGE", "GUILD_MEMBER"],
});

const prefix = "/";

client.on("ready", () => {
  console.log(`${client.user.tag} has joined`);
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substr(prefix.length)
      .split(/\s+/);

    if (CMD_NAME === "kick") {
      if (!message.member.hasPermission("KICK_MEMBERS")) {
        message.reply("You have not permission to kick");
      }
      const member = message.guild.members.cache.get(args[0]);
      if (args[0] === undefined) {
        return message.reply(`please provide an ID`);
      }
      if (member) {
        member
          .kick()
          .then((member) => {
            message.reply(`${member.displayName} was kicked.`);
          })
          .catch((err) => {
            message.reply(`I have no permission to kick that user :c`);
          });
      } else {
        message.channel.send("There is no an user with this ID");
      }
    } else if (CMD_NAME === "ban") {
      console.log("trying to ban");
      if (!message.member.hasPermission("BAN_MEMBERS")) {
        message.reply("You have not permission to kick");
      }
      if (args[0] === undefined) {
        return message.reply(`please provide an ID`);
      }

      const member = await message.guild.members.ban(args[0]);

      message.channel.send(`${member} receive a BANHAMMER!`);
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
