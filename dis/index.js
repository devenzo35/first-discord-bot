"use strict";
exports.__esModule = true;
require('dotenv').config();
var discord_js_1 = require("discord.js");
var client = new discord_js_1.Client();
var prefix = '/';
client.on("ready", function () {
    console.log(client.user.tag + " has joined");
});
client.on("message", function (message) {
    if (message.author.bot)
        return;
    if (message.content.startsWith(prefix)) {
        var _a = message.content
            .trim()
            .substr(prefix.length)
            .split(/\s+/), CMD_NAME = _a[0], args = _a.slice(1);
        if (CMD_NAME === "kick") {
            if (args[0] === undefined) {
                return message.reply("please provide an ID");
            }
            var member = message.guild.members.cache.get(args[0]);
            if (member) {
                member.kick().then(function (member) {
                    message.reply(member.displayName + " was kicked.");
                })["catch"](function (err) {
                    console.log(err);
                    message.reply("I have no permission to kick that user :c");
                });
            }
            else {
                message.channel.send('There is no an user with this ID');
            }
        }
    }
});
client.login(process.env.DISCORD_BOT_TOKEN);
