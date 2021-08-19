const utils = require('../../utils');
const prompts = require('./welcome.prompts');

const showWelcome = (conv) => {

console.log(conv.data.user);
console.log('aqui esta user:');

    conv.ask(prompts.getSimpleResponses());

    if(utils.hasScreenOutput(conv)){
        conv.ask(prompts.getSuggestionsRandomizedWithRequired());
        if(false){//TODO: SE PRIMEIRO ACESSO
            conv.ask(prompts.getBasicCardTutorial());
        }else{
            conv.ask(prompts.getImageNews())
        }
    }
};

const intents = {'welcome': showWelcome};

exports.welcomeMatchIntent = (conv, ...args) => {
utils.clearConversationData(conv);

    return intents[conv.intent](conv, ...args);
};