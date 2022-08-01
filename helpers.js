const fs = require('fs');

const sortObj = (obj) => {
    return Object.keys(obj).sort().reduce(function (result, key) {
        result[key] = obj[key];
        return result;
    }, {});
}

const capitalize = (animeTitleData) => {
    return animeTitleData.split(' ').map((word) => {
        return word[0].toUpperCase() + word.substring(1);
    }).join(' ');
}

const generateDetails = (anime, animeTitleKey) => {
    const { rating, review, category, synopsis } = anime;
    return animeDetails = '```' + `${animeTitleKey}: \n` + `rating: ${rating}\n` + `review: ${review} \n` + `category: ${category} \n` + `synopsis: ${synopsis}` + '```';
}

const randomNum = (max) => Math.floor(Math.random() * max);


const contains = (message, word) => {
    return message.includes(word)
}

const showAnimeDetails = (content, message, obj) => {
    const animeTitleKey = capitalize(content.split('show anime details ')[1]);

    if (!obj.anime[animeTitleKey]) {
        message.channel.send(`${animeTitleKey} has not been added to the list.`);
    } else {
        const anime = obj.anime[animeTitleKey];
        const animeDetails = generateDetails(anime, animeTitleKey);
        message.channel.send(animeDetails);
    }
}

const showAnimeList = (content, message, obj) => {
    const list = '```' + Object.keys(obj.anime).join('\n') + '```';
    message.channel.send(list);
}

const addAnime = (content, message, obj) => {
    const animeTitleData = content.split('add anime ')[1];
    const animeTitle = capitalize(animeTitleData);
    if (obj.anime[animeTitle]) {
        message.channel.send(`${animeTitle} has already been added.`);
    } else {
        obj.anime[animeTitle] = { review: "", category: "", synopsis: "", rating: ""};
        obj.anime = sortObj(obj.anime);
        const json = JSON.stringify(obj);
        writeJsonFile(`${animeTitle} added.`, json, message);
    }
}

const readJsonFile = (func, message, content) => {
    fs.readFile('data.json', 'utf-8', (err, data) => {
        if (err) {
            message.channel.send(`Failed to read json file: ${err.message}`);
        } else {
            const obj = JSON.parse(data);
            func(content, message, obj);
        }
    })
}

const writeJsonFile = (updateMessage, json, message) => {
    fs.writeFile('data.json', json, 'utf-8', (err, result) => {
        if (err) {
            message.channel.send(`Failed to the anime to the list due to: ${err.message}`);
        } else {
            message.channel.send(updateMessage);
        }
    });
}


module.exports = {
    sortObj,
    capitalize,
    generateDetails,
    randomNum,
    contains,
    readJsonFile,
    showAnimeDetails,
    showAnimeList,
    addAnime
}