const utils = require('../../utils');
const prompts = require('./signIn.prompts');
const {SignIn} = require('actions-on-google');
const repositorySummoners = require('../../data/summoners.repository');


const startSignIn = (conv) => {
    if(conv.data.user.isSignIn){
        //TODO: colocar mensagem no prompt e adcionar sugestoes apos
        conv.ask("Your account was previously associated");
    }else{
        conv.ask(new SignIn());
    }
};

const getSignIn = (conv, params, signin) =>{
    if (signin.status === 'OK') {

        const dataUser = conv.user.profile.payload;
        dataUser.summonerName = "";
        dataUser.encryptedSummonerId = "";
        dataUser.isSignIn = true;
       
        return repositorySummoners.signInUser(dataUser).then((result) => {
            //TODO: MELHORAR FINAL FRASE E COLOCAR PROMPT E CHIPS SUGGENSTION
            conv.ask(`I got your account details, ${dataUser.given_name}. What do you want to do next?`);
            // conv.ask(prompts.getSimpleResponsesSaveIdUserPushSuccessfully());
            // conv.ask(prompts.getSimpleResponsesInformationchampion());
            // conv.ask(prompts.getSuggestionsWithhoutNotification());
        }, (err) => {
            conv.ask("erro salvar");
            // conv.ask(prompts.getSimpleResponsesSaveIdUserPushfailed());
            // conv.ask(prompts.getSuggestionsRandomizedWithRequired());
        });
        //TODO: Responder baseado no contexto
        //conv.ask(`I got your account details, ${payload.name}. What do you want to do next?`)
      } else {
        conv.ask(`I won't be able to save your data, but what do you want to do next?`)
      }

};

const intents = {'start-sign-in': startSignIn,
                 'get-sign-in': getSignIn};

exports.signInMatchIntent = (conv, ...args) => {
    return intents[conv.intent](conv, ...args);
};