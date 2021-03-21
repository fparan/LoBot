require('dotenv').config();

const {Client} = require('discord.js');
const yts = require('yt-search');
const client = new Client();
const mymodule = require('./stream-module');
var https = require('https');

client.on('ready', () => {
    console.log(`${client.user.username} is in the house!`);
});

client.on('message', (message) => {
    if (message.content === '!affixes') {
        let data = '';
        let url = 'https://raider.io/api/v1/mythic-plus/affixes?region=us&locale=en';
        let affixes = '';

        https.get(url, function (response) {
            response.on('data', function (chunk) {
                data += chunk;
            });

            response.on('end', function () {
                data = JSON.parse(data);
                data.affix_details.forEach(affix => {
                    affixes += ' ' + affix.name;
                })

                message.channel.send(affixes);
            });
        });
    }

    if (message.content.includes('!tukar ')) {
        var search = message.content.split(" ");
        search.shift();
        search = search.join(" ");

        message.channel.send(search);
        mymodule.execute(message, search);
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);
