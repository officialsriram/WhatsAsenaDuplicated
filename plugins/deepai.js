/* Codded by @phaticusthiccy
Telegram: t.me/phaticusthiccy
Instagram: www.instagram.com/kyrie.baran
*/

const Asena = require('../events');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg'); // For Creating File
const {execFile} = require('child_process');
const cwebp = require('cwebp-bin');
const axios = require('axios'); // Resp Checker
const Config = require('../config'); // GAN STYLE Support

const got = require("got"); // Responses Catcher
const deepai = require('deepai'); // Localde ise deepmain.js olusturarak özellestirilebilir sekilde kullanabilirsiniz. Web Sunucularinda Çalismaz!!
deepai.setApiKey('4ec4c7f4-63cd-457f-b244-7e12bba7ebde'); // Quickstart API Key

const Language = require('../language'); 
const Lang = Language.getString('deepai'); // Language Support

if (Config.WORKTYPE == 'private') {

    Asena.addCommand({pattern: 'deepai', fromMe: true, deleteCommand: false, desc: Lang.DEEPAI_DESC}, (async (message, match) => {

        await message.sendMessage('?? Usage: *.moodai <text>*\n?? Desc: ???? Yazdiginiz yazidan ruh halinizi bulur.\n???? It finds your mood from the article you wrote.\n\n?? Usage: *.colorai*\n?? Desc: ???? Siyah beyaz fotograflari renklendirir.\n???? It colorize bw photos.\n\n?? Usage: *.superai*\n?? Desc: ???? Fotografin kalitesini yapay zeka ile arttirir.\n???? Improves the quality of photos with Neural AI.\n\n?? Usage: *.waifuai*\n?? Desc: ???? Fotograflarin renk paletlerini yapay zeka ile birlestirir.\n???? Combines the color palettes of photos with artificial intelligence.\n\n?? Usage: *.dreamai*\n?? Desc: ???? Fotografa deepdream efekti uygular.\n???? Applies deepdream effect to the photo.\n\n?? Usage: *.neuraltalkai*\n?? Desc: ???? Fotografki olan seyi yapay zeka ile açiklar.\n???? Explain the phenomenon in the photo with artificial intelligence.\n\n?? Usage: *.ttiai <text>*\n?? Desc: ???? Yaziyi resme dönüstürür.\n???? Converts text to a picture. (Text-to-Image)\n\n?? Usage: *.toonai*\n?? Desc: ???? Fotograftaki yüzü çizgi film karakterine çevirir.\n???? Turns the face in the photo into a cartoon character.\n\n?? Usage: *.textai <text>*\n?? Desc: ???? Yazdiginiz cümleden size yapay bir hikaye yaratir.\n???? It creates an artificial story for you from your sentence.\n\n?? Usage: *.nudityai*\n?? Desc: ???? Fotograftaki NSFW degerini 1 ve 0 arasinda gösterir. \n???? It shows the NSFW value between 1 and 0 in the photo.\n\n?? Usage: *.ganstyle*\n?? Desc: ???? Yanitladiginiz fotografi seçili olan resim ile birlestirir.\n???? Combines the photo you answered with the selected picture.\n\n?? ???? *Bütün bu yapay zeka araçlarini derin ögrenme ile çalisir. Ne kadar fazla kullanirsaniz o kadar fazla bilgiyi depolar.* ```Sadece ingilizce karakter kullanin!```\n\n?? ???? *All the tools here work with deep learning. The more you use it, the more information it stores.* ```Use only english characters!```');

    }));

    Asena.addCommand({pattern: 'colorai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

        var downloading = await message.client.sendMessage(message.jid,'Colorizing.. ??',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("colorizer", {
                    image: fs.createReadStream("./output.jpg"),

                });

                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

                await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Made By SRM'})

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));

    Asena.addCommand({pattern: 'waifuai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

        var downloading = await message.client.sendMessage(message.jid,'Mixing.. ??',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("waifu2x", {
                    image: fs.createReadStream("./output.jpg"),

                });

                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

                await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Made By SRM'})

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));

    Asena.addCommand({pattern: 'superai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

        var downloading = await message.client.sendMessage(message.jid,'Enhancing.. ???',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("torch-srgan", {
                    image: fs.createReadStream("./output.jpg"),

                });

                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

                await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Made By SRM'})

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));

    Asena.addCommand({pattern: 'moodai ?(.*)', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {
        if (match[1] === '') return await message.sendMessage(Lang.TEXT);

        var resp = await deepai.callStandardApi("sentiment-analysis", {
            text: `${match[1]}`,

        });

        await message.reply(`*Mood:* ${resp.output}`);

    }));

    Asena.addCommand({pattern: 'dreamai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

        var downloading = await message.client.sendMessage(message.jid,'Starry Night.. ??',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("deepdream", {
                    image: fs.createReadStream("./output.jpg"),

                });

                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

                await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Made By SRM'})

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));

    Asena.addCommand({pattern: 'neuraltalkai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

        var downloading = await message.client.sendMessage(message.jid,'Reading.. ????',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("neuraltalk", {
                    image: fs.createReadStream("./output.jpg"),

                });

                await message.reply(`*Output:* ${resp.output}`);

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));

    Asena.addCommand({pattern: 'ttiai ?(.*)', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {
        if (match[1] === '') return await message.sendMessage(Lang.TEXT);

        var resp = await deepai.callStandardApi("text2img", {
            text: `${match[1]}`,

        });

        var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

        await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Made By SRM'})

    }));

    Asena.addCommand({pattern: 'toonai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

        var downloading = await message.client.sendMessage(message.jid,'Tooning.. ??',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("toonify", {
                    image: fs.createReadStream("./output.jpg"),

                });

                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

                await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg})

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));

    Asena.addCommand({pattern: 'nudityai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

        var downloading = await message.client.sendMessage(message.jid,'Finding NSFW.. ??',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("content-moderation", {
                    image: fs.createReadStream("./output.jpg"),

                });

                await message.reply(`*Output:* ${resp.output.nsfw_score}`);

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));

    Asena.addCommand({pattern: 'textai ?(.*)', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {
        if (match[1] === '') return await message.sendMessage(Lang.TEXT);

        var resp = await deepai.callStandardApi("text-generator", {
            text: `${match[1]}`,

        });

        await message.reply(`*Article:*\n ${resp.output}`);

    }));

    Asena.addCommand({pattern: 'ganstyle', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

        var downloading = await message.client.sendMessage(message.jid,'Creating.. ??',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("CNNMRF", {
                    style: Config.GANSTYLE,
                    content: fs.createReadStream("./output.jpg"),

                });

                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

                await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Made By SRM'})

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));
}
else if (Config.WORKTYPE == 'public') {

    Asena.addCommand({pattern: 'deepai', fromMe: false, deleteCommand: false, desc: Lang.DEEPAI_DESC}, (async (message, match) => {

        await message.sendMessage('?? Usage: *.moodai <text>*\n?? Desc: ???? Yazdiginiz yazidan ruh halinizi bulur.\n???? It finds your mood from the article you wrote.\n\n?? Usage: *.colorai*\n?? Desc: ???? Siyah beyaz fotograflari renklendirir.\n???? It colorize bw photos.\n\n?? Usage: *.superai*\n?? Desc: ???? Fotografin kalitesini yapay zeka ile arttirir.\n???? Improves the quality of photos with Neural AI.\n\n?? Usage: *.waifuai*\n?? Desc: ???? Fotograflarin renk paletlerini yapay zeka ile birlestirir.\n???? Combines the color palettes of photos with artificial intelligence.\n\n?? Usage: *.dreamai*\n?? Desc: ???? Fotografa deepdream efekti uygular.\n???? Applies deepdream effect to the photo.\n\n?? Usage: *.neuraltalkai*\n?? Desc: ???? Fotografki olan seyi yapay zeka ile açiklar.\n???? Explain the phenomenon in the photo with artificial intelligence.\n\n?? Usage: *.ttiai <text>*\n?? Desc: ???? Yaziyi resme dönüstürür.\n???? Converts text to a picture. (Text-to-Image)\n\n?? Usage: *.toonai*\n?? Desc: ???? Fotograftaki yüzü çizgi film karakterine çevirir.\n???? Turns the face in the photo into a cartoon character.\n\n?? Usage: *.textai <text>*\n?? Desc: ???? Yazdiginiz cümleden size yapay bir hikaye yaratir.\n???? It creates an artificial story for you from your sentence.\n\n?? Usage: *.nudityai*\n?? Desc: ???? Fotograftaki NSFW degerini 1 ve 0 arasinda gösterir. \n???? It shows the NSFW value between 1 and 0 in the photo.\n\n?? Usage: *.ganstyle*\n?? Desc: ???? Yanitladiginiz fotografi seçili olan resim ile birlestirir.\n???? Combines the photo you answered with the selected picture.\n\n?? ???? *Bütün bu yapay zeka araçlarini derin ögrenme ile çalisir. Ne kadar fazla kullanirsaniz o kadar fazla bilgiyi depolar.* ```Sadece ingilizce karakter kullanin!```\n\n?? ???? *All the tools here work with deep learning. The more you use it, the more information it stores.* ```Use only english characters!```');

    }));

    Asena.addCommand({pattern: 'colorai', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

        var downloading = await message.client.sendMessage(message.jid,'Colorizing.. ??',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("colorizer", {
                    image: fs.createReadStream("./output.jpg"),

                });

                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

                await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Made By SRM'})

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));

    Asena.addCommand({pattern: 'waifuai', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

        var downloading = await message.client.sendMessage(message.jid,'Mixing.. ??',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("waifu2x", {
                    image: fs.createReadStream("./output.jpg"),

                });

                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

                await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Made By SRM'})

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));

    Asena.addCommand({pattern: 'superai', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

        var downloading = await message.client.sendMessage(message.jid,'Enhancing.. ???',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("torch-srgan", {
                    image: fs.createReadStream("./output.jpg"),

                });

                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

                await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Made By SRM'})

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));

    Asena.addCommand({pattern: 'moodai ?(.*)', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {
        if (match[1] === '') return await message.sendMessage(Lang.TEXT);

        var resp = await deepai.callStandardApi("sentiment-analysis", {
            text: `${match[1]}`,

        });

        await message.reply(`*Mood:* ${resp.output}`);

    }));

    Asena.addCommand({pattern: 'dreamai', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

        var downloading = await message.client.sendMessage(message.jid,'Starry Night.. ??',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("deepdream", {
                    image: fs.createReadStream("./output.jpg"),

                });

                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

                await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Made By SRM'})

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));

    Asena.addCommand({pattern: 'neuraltalkai', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

        var downloading = await message.client.sendMessage(message.jid,'Reading.. ????',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("neuraltalk", {
                    image: fs.createReadStream("./output.jpg"),

                });

                await message.reply(`*Output:* ${resp.output}`);

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));

    Asena.addCommand({pattern: 'ttiai ?(.*)', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {
        if (match[1] === '') return await message.sendMessage(Lang.TEXT);

        var resp = await deepai.callStandardApi("text2img", {
            text: `${match[1]}`,

        });

        var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

        await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Made By SRM'})

    }));

    Asena.addCommand({pattern: 'toonai', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

        var downloading = await message.client.sendMessage(message.jid,'Tooning.. ??',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("toonify", {
                    image: fs.createReadStream("./output.jpg"),

                });

                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

                await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg})

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));

    Asena.addCommand({pattern: 'nudityai', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

        var downloading = await message.client.sendMessage(message.jid,'Finding NSFW.. ??',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("content-moderation", {
                    image: fs.createReadStream("./output.jpg"),

                });

                await message.reply(`*Output:* ${resp.output.nsfw_score}`);

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));

    Asena.addCommand({pattern: 'textai ?(.*)', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {
        if (match[1] === '') return await message.sendMessage(Lang.TEXT);

        var resp = await deepai.callStandardApi("text-generator", {
            text: `${match[1]}`,

        });

        await message.reply(`*Article:*\n ${resp.output}`);

    }));

    Asena.addCommand({pattern: 'ganstyle', fromMe: false, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
        if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

        var downloading = await message.client.sendMessage(message.jid,'Creating.. ??',MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.jpg')
            .on('end', async () => {
                var resp = await deepai.callStandardApi("CNNMRF", {
                    style: Config.GANSTYLE,
                    content: fs.createReadStream("./output.jpg"),

                });

                var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

                await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Made By SRM'})

            });

            return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

    }));
}
