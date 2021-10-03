const { Client, Intents, Message, Channel } = require('discord.js');
const { token, mainHall, guildId } = require('./config.json');
const { getCuteThing, parseMessage } = require('./utilities');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, "GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_PRESENCES", "GUILD_MEMBERS"], partials: ["CHANNEL"] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Login to Discord with your client's token
client.login(token);


client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return;

    const { commandName } = interaction; 

    if(commandName === "test") {
        await interaction.reply('Hello World!')
    } else if (commandName === "cute") {
        const image = await getCuteThing();
        await interaction.reply({files: [image.url]})
    } else if(commandName === 'help') {
        interaction.reply("try saying /cute!")
    }
});

client.on('guildMemberAdd', async (member) => {
    console.log('yes okay')
    const chnl = member.guild.channels.cache.get(mainHall);
    chnl.send(`Welcome to Vidalia, ${member.displayName}. Tell us about yourself here.`);
});

client.on("messageCreate", async message => {
    if(message.author.bot) return;
    parseMessage(message);
});
