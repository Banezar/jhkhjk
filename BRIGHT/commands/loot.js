module.exports = {
    name: `loot`,
    description: `loot calculator`,
    execute(msg, args) {
        let i = 1;
        if (args[1] === `--help` || args[1] === `-h` || args[1] === `-H`) {
            help();
        } else if (args[1].toLowerCase() === `--all` || args[1].toLowerCase() === `-a`) {
            i = 2;
            prepLootData(i, true);

        } else if (args[1] === `Session` && args[2] === `data:`) {
            prepLootData();
        } else {
            fuc();
        }

        function prepLootData(iter = 1, all = false) {
            let string = ``;
            let party;
            for (let i = iter; i < args.length; i++) {
                string += ` ${args[i]}`;
            }
            const lines = string.split("\n");
            if (lines.length > 6) {
                party = getParty(lines);
                if (party) {
                    calcLoot(party, all);
                } else {
                    fuc();
                }
            } else {
                fuc();
            }
        }

        function fuc() {
            msg.reply(`You\`ve done fuckd up. Use -h / --help modifier for details.`)
        }
        function help() {
            msg.reply(`Paste copied loot from party hunt analyzer after $loot command
                you can also use -a / --all modifier if one player takes whole loot to share \n` +
                '**Usage:**' +
                '\`\`\`$loot \<copypasta from analyzer\>\n' +
                '$loot -a \<copypasta from analyzer\>\`\`\`');
        }

        function getParty(lines) {

            let party = {
                sessionData: lines[0].replace(`Sessiondata:`, ``),
                session: lines[1].replace(`Session:`, ``),
                lootType: lines[2].replace(`Loot Type:`, ``),
                loot: parseInt(lines[3].replace(`Loot:`, ``).replace(/,/g, ``)),
                supplies: parseInt(lines[4].replace(`Supplies:`, ``).replace(/,/g, ``)),
                balance: parseInt(lines[5].replace(`Balance:`, ``).replace(/,/g, ``)),
                players: []
            }

            let player = {name: ``, loot: 0, supplies: 0, damage: 0, healing: 0}

            if ((lines.length) % 6 !== 0) {
                fuc();
                return null;
            } else {
                for (let i = 6; i < lines.length; i += 6) {
                    if (lines[i]) {
                        player = {
                            name: lines[i].replace(`(Leader)`, ``),
                            loot: parseInt(lines[i + 1].replace(`Loot:`, ``).replace(/,/g, ``)),
                            supplies: parseInt(lines[i + 2].replace(`Supplies:`, ``).replace(/,/g, ``)),
                            balance: parseInt(lines[i + 3].replace(`Balance:`, ``).replace(/,/g, ``)),
                            damage: parseInt(lines[i + 4].replace(`Damage:`, ``).replace(/,/g, ``)),
                            healing: parseInt(lines[i + 5].replace(`Healing:`, ``).replace(/,/g, ``))
                        }
                        party.players.push(player);
                    }
                }
                let balance = 0;
                for (let player of party.players) {
                    balance += player.balance;
                }
                party.balance = balance;
                return party;
            }
        }

        function calcLoot(party, all) {
            let message = `\n`;
            if (!all){

                let profitPerPlayer = party.balance / party.players.length;

                let moneyToShare = [];
                let moneyToReceive = [];
                for (let player of party.players) {
                    if (player.balance > profitPerPlayer) {
                        let mts = {
                            name: player.name,
                            value: Math.abs(player.balance - profitPerPlayer)
                        }
                        moneyToShare.push(mts);
                    }
                }

                for (let player of party.players) {
                    if (player.balance < profitPerPlayer) {
                        let mtr = {
                            name: player.name,
                            value: Math.abs(player.balance - profitPerPlayer)
                        }
                        moneyToReceive.push(mtr);
                    }
                }

                let pay = {from: ``, to: ``, value: ``}
                let pays = []

                for(let share of moneyToShare) {
                    for(let receive of moneyToReceive) {
                        if (receive.value <= share.value && share.value > 0) {
                            pay = {from: share.name, to: receive.name, value: Math.floor(receive.value)}
                            pays.push(pay);
                            share.value = share.value - receive.value;
                            receive.value = 0;
                        } else if (receive.value > share.value && share.value > 0) {
                            pay = {from: share.name, to: receive.name, value: Math.floor(share.value)}
                            pays.push(pay);
                            receive.value = receive.value - share.value;
                            share.value = 0;
                        }
                    }
                }

                message += `Profit per player: **${Math.floor(profitPerPlayer).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}** `;
                message += `\nTotal profit: **${party.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}** \n`;
                message += `\n`;

                for (let pay of pays) {
                    if (pay.value !== 0) {
                        message += `**${pay.from}** should pay **${pay.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}** gold to **${pay.to}** \n`;
                        message += `\`\`\`fix\n transfer ${pay.value} to ${pay.to}\`\`\``;
                    }
                }

            } else  {
                let profitPerPlayer = party.balance / party.players.length;
                message += `Players should receive as follows: \n`;
                for (let i = 0; i < party.players.length; i++) {
                    let cash = Math.floor((party.players[i].supplies *2) /2 + profitPerPlayer);
                    message += `**${party.players[i].name}:** ${cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} gold \n`;
                    message += `\`\`\`fix\n transfer ${cash} to ${party.players[i].name}\`\`\``
                }

            }

            if (message !== `\n`) {
                msg.reply(message);
            }
            if (party.lootType.toLowerCase().trim() === `market`) {
                msg.reply(`Warning:exclamation: Your loot type is set to **MARKET**. Waste can be inaccurate!`);
            }

        }
    }


}
