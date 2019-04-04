const Wechat = require('wechat4u');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const CronJob = require('cron').CronJob;


let bot;
let username;

// bot = new Wechat();
// bot.start();

// 尝试获取本地登录数据，免扫码
try {
    bot = new Wechat(require('./sync-data.json'));
} catch (e) {
    bot = new Wechat();
}

if (bot.PROP.uin) {
    bot.restart();
} else {
    bot.start();
}



// 生成二维码
bot.on('uuid', uuid => {
    qrcode.generate('https://login.weixin.qq.com/l/' + uuid, {
        small: true
    });
    console.log('二维码链接：', 'https://login.weixin.qq.com/qrcode/' + uuid);
});

// 登录成功
bot.on('login', () => {
    console.log('登录成功');
    fs.writeFileSync('./sync-data.json', JSON.stringify(bot.botData));
});

// 登出成功
bot.on('logout', () => {
    console.log('登出成功');
    fs.unlinkSync('./sync-data.json');
});

// 发送消息的人
sendName = '放羊的猩猩'

bot.on('contacts-updated', contacts => {
    if (!username) {
        // console.log('联系人数量: ', Object.keys(bot.contacts).length);
        if (bot.Contact.getSearchUser(sendName).length) {
            username = bot.Contact.getSearchUser(sendName)[0].UserName;
            console.log('获取目标用户成功: ', sendName, username);
            // myFunc()
        }
    }
});

// function myFunc() {
//     if (username) {
//         bot.sendMsg('这是一条信息轰炸！！！!!', username)
//             .then(res => {
//                 console.log(`发送消息给 ${sendName} 成功！${i}`)
//             })
//             .catch(err => {
//                 bot.emit('send error', err);
//             });
//     }
// }

new CronJob('0 10 8 * * MON-FRI', () => {
    if (username) {
        bot.sendMsg('起床啦！！！睡懒猪', username)
            .then(res => {
                console.log(`发送消息给 ${sendName} 成功！`)
            })
            .catch(err => {
                bot.emit('send error', err);
            });
    }
}, null, true, 'Asia/Shanghai');

new CronJob('0 50 11 * * MON-FRI', () => {
    if (username) {
        bot.sendMsg('中午吃饭啦，别饿着了！', username)
            .then(res => {
                console.log(`发送消息给 ${sendName} 成功！`)
            })
            .catch(err => {
                bot.emit('send error', err);
            });
    }
}, null, true, 'Asia/Shanghai');

new CronJob('0 30 17 * * MON-FRI', () => {
    if (username) {
        bot.sendMsg('下班啦啦啦，出去逛逛吧', username)
            .then(res => {
                console.log(`发送消息给 ${sendName} 成功！`)
            })
            .catch(err => {
                bot.emit('send error', err);
            });
    }
}, null, true, 'Asia/Shanghai');

