const utils = require('../../utils');
const prompts = require('./freeChampionsRotation.prompts');
const repositoryChampion = require('../../data/champions.repository');
const repositorySummoners = require('../../data/summoners.repository');
const {UpdatePermission,} = require('actions-on-google');
const {intent} = require('../../constants/intents.constants')

const showFreeChampionsRotation = (conv) => {
    utils.resetConversationContext(conv);
    return repositoryChampion.getFreeChampionsRotation().then((freeChampions) => {
        
        conv.ask(prompts.getSimpleResponsesListChampion(freeChampions));
        conv.ask(prompts.getSimpleResponsesInformationchampion());

        if(utils.hasScreenOutput(conv)){
            conv.ask(prompts.getChampionRotationsList(freeChampions,conv.data));
            conv.ask(prompts.getSuggestionsRandomizedWithRequired());
        }

    }, (err) => {
        //TODO: abilities  nao encontradas
    });
};

const freeChampionsRotationSetupPush = (conv) => {
    conv.ask(new UpdatePermission({intent: intent.FREE_CHAMPION_ROTATION}));
}

const finishFreeChampionsRotationSetupPush = (conv) => {
if (conv.arguments.get('PERMISSION')) {

    const userID = conv.arguments.get('UPDATES_USER_ID');

    if(utils.hasValue(userID)){

        return repositorySummoners.registerUserForPushNotification(userID,intent.FREE_CHAMPION_ROTATION).then((result) => {
            conv.ask(prompts.getSimpleResponsesSaveIdUserPushSuccessfully());
            conv.ask(prompts.getSimpleResponsesInformationchampion());
            conv.ask(prompts.getSuggestionsWithhoutNotification());
        }, (err) => {

            conv.ask(prompts.getSimpleResponsesSaveIdUserPushfailed());
            conv.ask(prompts.getSuggestionsRandomizedWithRequired());
        });

    }else{
      conv.ask(prompts.getSimpleResponsesPermissionPrevGranted());
      conv.ask(prompts.getSuggestionsWithhoutNotification());
    }
  } else {
    conv.ask(prompts.getSimpleResponsesNotAlert());
    conv.ask(prompts.getSuggestionsRandomizedWithRequired());
  }

  conv.ask(prompts.getSimpleResponsesInformationchampion())
}

const intents = {'free-champions-rotation': showFreeChampionsRotation,
                 'free-rotation-setup-push' : freeChampionsRotationSetupPush, 
                 'finish-free-rotation-setup-push' : finishFreeChampionsRotationSetupPush};

exports.freeRotationMatchIntent = (conv, ...args) => {
    utils.clearConversationData(conv);
    return intents[conv.intent](conv, ...args);
};