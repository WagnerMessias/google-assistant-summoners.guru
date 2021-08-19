const utils = require('../../utils');
const prompts = require('./mastery.prompts');
const repositorySummoners = require('../../data/summoners.repository');


const askSummonerName = (conv) => {


    if(utils.hasScreenOutput(conv)){
        //conv.ask(prompts.getBasicCardChampionAbiliity(ability,conv.data));
        conv.ask(`I need the summoner name, please enter the name:`);
        // conv.ask(prompts.getSuggestionsRandomizedWithRequired());
    }else{

    }
};

const checkSummonerName = (conv, params) => {
    
    if(conv.intent != 'summoner-name-input' && conv.data.user.isSignIn){

    }else if(conv.intent == 'summoner-name-input'){

    }else{

    }

};



const intents = {'mastery-total-score': checkSummonerName};

exports.masteryMatchIntent = (conv, ...args) => {
    return intents[conv.intent](conv, ...args);
};