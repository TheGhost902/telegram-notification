const Telegraf = require('telegraf');
const bot = new Telegraf('bot-token-here');
const Telegram = require('telegraf/telegram');
const telegeram = new Telegram('bot-token-here');

let chatId;
let isLogin = false;
let mainUser = {
    login: 'admin',
    pass: 'admin'
};

bot.start((ctx) => {
    ctx.reply('tell me your "login pass"');
    chatId = ctx.chat.id;
});

bot.on('text', (ctx) => {
    if (!isLogin) {
        const login = ctx.message.text.split(' ');

        if (login[0] === mainUser.login && login[1] === mainUser.pass) {
            ctx.reply('!!! DONE !!!');
            isLogin = true;
            console.log(`TELEGRAM "${login[0]}" is logged in!`);
        } else {
            ctx.reply('try again');
        }
    } else {
        ctx.reply('bot don\'t need more messages!');
    }
});

bot.launch().then(() => {
    console.log('TELEGRAM bot start');
});

function sendMessageToTelegram(message) {
    return new Promise((resolve, reject) => {
        if (isLogin) {
            telegeram.sendMessage(chatId, message)
            .then(() => {
                console.log(`TELEGRAM sended: ${message}`);
                resolve('sended');
            })
            .catch((err) => {
                reject(err);
            })
        } else {
            reject('not loggined');
        }
    });
    
    
}

module.exports = sendMessageToTelegram;