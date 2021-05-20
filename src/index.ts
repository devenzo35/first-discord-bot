require('dotenv').config()
import { Client } from "discord.js"

const client = new Client()

const prefix = '/'

client.on("ready", ()=>{
    console.log(`${client.user.tag} has joined`)
})

client.on("message", (message)=>{
    if (message.author.bot) return;
        if(message.content.startsWith(prefix)){

            const [CMD_NAME, ...args] = message.content
            .trim()
            .substr(prefix.length)
            .split(/\s+/)
        
            if(CMD_NAME === "kick"){
                if(args[0] === undefined) {
                    return message.reply(`please provide an ID`)
                }
                const member = message.guild.members.cache.get(args[0])
                if(member){
                    member.kick().then((member)=>{
                        message.reply(`${member.displayName} was kicked.`)
                    }).catch((err)=>{
                        console.log(err)
                        message.reply(`I have no permission to kick that user :c`)
                    })

                }else{
                    message.channel.send('There is no an user with this ID')
                }
            }
        } 
    })

client.login(process.env.DISCORD_BOT_TOKEN)