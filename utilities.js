const axios = require('axios');
const fs = require('fs');
const { badwords, responses, colors, checks, anime } = require("./data.json");
const { guildId } = require('./config.json');
const { sortObj, capitalize, generateDetails, randomNum, contains, readJsonFile, showAnimeDetails, showAnimeList, addAnime, addAnimeDetail, showUnwatched } = require('./helpers');

const getCuteThing = async () => {
    const index = Math.floor(Math.random() * 2);
    if(index === 1){
        const res = await axios.get("https://api.thecatapi.com/v1/images/search");
        const imgurl = res.data[0]
        return imgurl;
    } else {
        const res = await axios.get("https://api.thedogapi.com/v1/images/search");
        const imgurl = res.data[0];
        return imgurl;
    }

}

const parseMessage = async (message, client) => {
    const content = message.content.toLocaleLowerCase();

    for (let i = 0; i < badwords.length; i++){
        const badWord = badwords[i];
        if(contains(content, badWord) || 
            contains(content.split('-').join(""), badWord) ||
            contains(content.split('.').join(""), badWord) || 
            contains(content.split(' ').join(' '), badWord)) {

            message.delete();
            const index = randomNum(responses.length)
            if(index === 9 && message.author.username){
                const res = responses[index].split('this human').join(`<@${message.author.id}>`);
                return message.channel.send(res);
            } else {
                return message.channel.send(responses[index]);
            }
        }
    }

    if (contains(content, 'bone')){
        message.channel.send({files: ['./images/bone.jpg']});
    }

    if (contains(content, 'naruto')){
        message.channel.send({content:'SASUKEEEEEE!!!!', tts: true});
    }

    if (contains(content, 'sasuke')) {
        message.channel.send({content: 'NARUTOOOO!!!!!', tts: true});
    }

    if (contains(content, 'omg') || contains(content, 'oh my god')){
        message.channel.send({files: ['./images/jojo-oh-my-god.gif']});
    }

    if (contains(content, 'all star')) {
        message.channel.send({content: `Somebody once told me they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming `, tts: true});
    } 

    if (contains(content, 'bees')) {
        message.channel.send({files: ['./images/bees.gif']})
    } 

    if (contains(content, 'help me choose between')) {
        const stepOne = content.split('help me choose between').join('');
        const list = stepOne.split(',');
        message.channel.send(list[randomNum(list.length)]);
    }

    if (contains(content, "my pronouns are")) {
        const step1 = content.split('my pronouns are');
        const step2 = step1.join('').trim().split('/');
        const colorChoice = step2.pop().toUpperCase();
        const pronouns = step2.join('/')
        const color = colors.filter(color => colorChoice === color)[0];
        if(!color){
            return message.channel.send("It seems as though your message was not formatted properly, try asking 'how do I add pronouns?' for help.")
        }
        const guild = client.guilds.cache.get(guildId);
        const role = {
            name: pronouns,
            color: color,
            reason: 'Because we need pronouns.'
        }
        const theirRole = await guild.roles.create(role);
        guild.members.cache.get(message.author.id).roles.add(theirRole)
    }

    if (contains(content, "how do i add pronouns")){
        message.channel.send("You may use any pronouns you want, however you must provide a valid color or I will set it to a default color.");
        message.channel.send("Here is an example: 'My pronouns are she/her/WHITE'");
        message.channel.send(`Here is a list of valid colors, ${colors.join(', ')}`)
    }

    if (contains(content, "praise satan") || contains(content, "hail satan")) {
        message.channel.send({files: ['./images/satan.gif']});
    }

    if (contains(content, "wow")) {
        message.channel.send({files: ['./images/wow.gif']});
    }

    if (contains(content, "duel")) {
        message.channel.send({files: ['./sound/duel.wav']});
    }

    if (contains(content, "elden ring")) {
        message.channel.send("Did someone just mention the greatest game of all time?");
    }

    if (contains(content, "good bot")) {
        message.channel.send("Good human. *head pat*");
    }

    if (contains(content, "explain check")) {
        const skillCheck = content.split(' -')[1];
        message.channel.send(checks[skillCheck]);
    }

    if(contains(content, "list anime")) {
        readJsonFile(showAnimeList, message, content);
    }

    if(contains(content, "list unwatched anime")) {
        readJsonFile(showUnwatched, message, content);
    }

    if (contains(content, "show anime details")) {
        readJsonFile(showAnimeDetails, message, content);
    }

    if (contains(content, "add anime")) {
        readJsonFile(addAnime, message, content);
    }

    if (contains(content, "add detail")) {
        readJsonFile(addAnimeDetail, message, content);
    }
}

module.exports = {
    getCuteThing,
    parseMessage
}