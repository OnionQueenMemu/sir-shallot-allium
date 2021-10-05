const axios = require('axios');
const { badwords, responses, colors } = require("./data.json");
const { guildId } = require('./config.json');

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

const contains = (message, word) => {
    return message.includes(word)
}

const randomNum = (max) => Math.floor(Math.random() * max);

const parseMessage = async (message, client) => {
    const content = message.content.toLocaleLowerCase();

    for(let i = 0; i < badwords.length; i++){
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

    if(contains(content, 'bone')){
        message.channel.send({files: ['./images/bone.jpg']});
    }

    if(contains(content, 'naruto')){
        message.channel.send({content:'SASUKEEEEEE!!!!', tts: true});
    }

    if(contains(content, 'sasuke')) {
        message.channel.send({content: 'NARUTOOOO!!!!!', tts:true});
    }

    if(contains(content, 'omg') || contains(content, 'oh my god')){
        message.channel.send({files: ['./images/jojo-oh-my-god.gif']});
    }

    if(contains(content, 'all star')) {
        message.channel.send({content: `Somebody once told me they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming and they don't stop coming `, tts: true});
    } 
    if(contains(content, 'bees')) {
        message.channel.send({files: ['./images/bees.gif']})
    } 

    if(contains(content, 'help me choose between')) {
        const stepOne = content.split('help me choose between').join('');
        const list = stepOne.split(',');
        message.channel.send(list[randomNum(list.length)]);
    }

    if(contains(content, "my pronouns are")) {
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
    if(contains(content, "how do i add pronouns")){
        message.channel.send("You may use any pronouns you want, however you must provide a valid color or I will set it to a default color.");
        message.channel.send("Here is an example: 'My pronouns are she/her/WHITE'");
        message.channel.send(`Here is a list of valid colors, ${colors.join(', ')}`)
    }

    if(contains(content, "praise satan") || contains(content, "hail satan")) {
        message.channel.send({files: ['./images/satan.gif']});
    }
}

module.exports = {
    getCuteThing,
    parseMessage
}