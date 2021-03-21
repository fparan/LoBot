const yts = require('yt-search')
const ytdl = require('ytdl-core');
module.exports = {
    name: "search",
    description: "searches a yt video",

    async execute(message, search) {
        const res = await yts(search)
        let video = res.videos[0] //getting the first video
        let connection = await message.member.voice.channel.join()
        connection.play(ytdl(video.url, {filter: "audioonly"}))
    },
};