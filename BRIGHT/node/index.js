const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();


const token = process.env.TOKEN;

const prefix = '/';

const fs = require('fs');
const CONFIG = require('./config');

client.commands = new Discord.Collection();

const commandsFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

commandsFiles.forEach((file) => {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
})



//client.login(token);

client.on('ready', () => {
    console.log('Elo byq');
})


client.on('message', msg => {
    const botPrefixes = ['!', '/', '$', 'h?', '-'];
    let message = msg.content.toLowerCase();
    if (msg.author.id !== client.user.id) {

        if (message.includes('approaching me')) { msg.reply('I CAN\'T BEAT THE SHIT OUT OF YOU WITHOUT GETTING CLOSER'); }

        if (message === 'gitara') { msg.reply('siema'); }

        if (message.includes('mocniejsz')) { msg.reply('wcionga :smirk:'); }

        if (message === 'ping') { msg.reply('pong'); }

        if (message === 'pong') { msg.reply('ping'); }

        if (message === 'marco') { msg.reply('POLO!'); }

        if (message.includes('jotaro')) { msg.reply('DIO!'); }

        if (message.includes('maruda')) { msg.channel.send('Pan maruda, niszczyciel dobrej zabawy, pogromca uśmiechów dzieci'); }

        if (message.includes('clear') && botPrefixes.some(element => message.includes(element))) {
            msg.reply('Ok master, let\'s kill da hoe \n***BEEETCH***');
        }

        if (message.includes('shindeiru')) {
            msg.reply('NANI!?');
        }

        if (message.includes('avdol')) {
            msg.channel.send('https://thumbs.gfycat.com/InsignificantAdmiredFossa-size_restricted.gif');
        }

        if (message.includes('golden suc')) {
            msg.channel.send('https://thumbs.gfycat.com/EquatorialDizzyHerring-size_restricted.gif');
        }

        if (message.includes('nigerunda')){
            msg.channel.send('https://thumbs.gfycat.com/FlakyConsciousAmurratsnake-mobile.mp4');
        }

        if (message.includes('rero rero')) {
            msg.channel.send('https://media1.tenor.com/images/a2cff6bc5fbf342595a77846b60212a8/tenor.gif?itemid=14405506');
        }

        if (message.startsWith('ora ') || message === 'ora') {
            let count = (message.match(/ora/g) || []).length;
            let response = ''
            for (let i = 0; i < count; i++) {
                response += 'MUDA ';
            }
            response += 'MUDA ';
            response = response.substring(0, response.length - 1);
            if (count > 1) {
                response += '!!!';
            }
            msg.reply(response);
        }

        if (message.startsWith('muda ') || message === 'muda') {
            let count = (message.match(/muda/g) || []).length;
            let response = ''
            for (let i = 0; i < count; i++) {
                response += 'ORA ';
            }
            response += 'ORA ';
            response = response.substring(0, response.length - 1);
            if (count > 1) {
                response += '!!!';
            }
            msg.reply(response);
        }

        if (message.includes('rafa') && (message.includes('kurwa') || message.includes('dis'))) {
            if (message.includes('-p')) {
                msg.reply('żałosny jesteś w chuj dwulicowy nara :middle_finger:');
                setTimeout(() => {
                    msg.channel.send('-clear');
                }, 2500);
                setTimeout(() => {
                    msg.channel.send('-skip');
                }, 3500);

                setTimeout(() => msg.reply('hej chcesz coś z avonu?'), 100000);
            }
            if (message.includes('h?')) {
                msg.reply('żałosny jesteś w chuj dwulicowy nara :middle_finger:');

                setTimeout(() => {
                    msg.channel.send('h?clear');
                }, 2500);
                setTimeout(() => {
                    msg.channel.send('h?skip');
                }, 3500);

                setTimeout(() => msg.reply('hej chcesz coś z avonu?'), 100000);
            }
            if (message.includes('!p')) {
                msg.reply('żałosny jesteś w chuj dwulicowy nara :middle_finger:');
                setTimeout(() => {
                    msg.channel.send('!clear');
                }, 2500);
                setTimeout(() => {
                    msg.channel.send('!skip');
                }, 3500);

                setTimeout(() => msg.reply('hej chcesz coś z avonu?'), 100000);
            }
        }


        let args = msg.content.substring(prefix.length).split(" ");

        switch (args[0]) {
            case ('ping'):
                client.commands.get('ping').execute(msg, args, client);
                break;
            /*        case ('crm'):
                        client.commands.get('reactionRole').execute(msg, args, client);
                        break;*/
            case ('loot'):
                client.commands.get('loot').execute(msg, args);
        }
    }
})



client.login(token);


