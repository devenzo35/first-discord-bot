"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
require("dotenv").config();
var discord_js_1 = require("discord.js");
var client = new discord_js_1.Client({
    partials: ["MESSAGE", "GUILD_MEMBER"]
});
var prefix = "/";
client.on("ready", function () {
    console.log(client.user.tag + " has joined");
});
client.on("message", function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, CMD_NAME, args, member, member;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (message.author.bot)
                    return [2 /*return*/];
                if (!message.content.startsWith(prefix)) return [3 /*break*/, 3];
                _a = message.content
                    .trim()
                    .substr(prefix.length)
                    .split(/\s+/), CMD_NAME = _a[0], args = _a.slice(1);
                if (!(CMD_NAME === "kick")) return [3 /*break*/, 1];
                if (!message.member.hasPermission("KICK_MEMBERS")) {
                    message.reply("You have not permission to kick");
                }
                member = message.guild.members.cache.get(args[0]);
                if (args[0] === undefined) {
                    return [2 /*return*/, message.reply("please provide an ID")];
                }
                if (member) {
                    member
                        .kick()
                        .then(function (member) {
                        message.reply(member.displayName + " was kicked.");
                    })["catch"](function (err) {
                        message.reply("I have no permission to kick that user :c");
                    });
                }
                else {
                    message.channel.send("There is no an user with this ID");
                }
                return [3 /*break*/, 3];
            case 1:
                if (!(CMD_NAME === "ban")) return [3 /*break*/, 3];
                console.log("trying to ban");
                if (!message.member.hasPermission("BAN_MEMBERS")) {
                    message.reply("You have not permission to kick");
                }
                if (args[0] === undefined) {
                    return [2 /*return*/, message.reply("please provide an ID")];
                }
                return [4 /*yield*/, message.guild.members.ban(args[0])];
            case 2:
                member = _b.sent();
                message.channel.send(member + " receive a BANHAMMER!");
                _b.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
client.login(process.env.DISCORD_BOT_TOKEN);
