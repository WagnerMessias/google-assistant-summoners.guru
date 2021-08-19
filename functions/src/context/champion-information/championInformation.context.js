const utils = require('../../utils');
const prompts = require('./championInformation.prompts');
const repository = require('../../data/champions.repository');
const {fallback} = require("../../context/common/common.context");

const showChampionBasicInfo = (conv, champion) => {
    
    conv.ask(prompts.getSimpleResponsesChampionInformation(champion));
    conv.ask(prompts.askWhatInformationChampion());

    if(utils.hasScreenOutput(conv)){
        conv.ask(prompts.getBasicCardChampionInformation(champion));
        conv.ask(prompts.getSuggestionsRandomizedWithRequired());
    }
};

const showChampionAbility = (conv,ability) => {

    //FIXME: melhorar informações que vem errada do servidor
    conv.ask(prompts.getSimpleResponsesChampionAbiliity(ability));
    conv.ask(prompts.askWhatInformationAbiliity());

    if(utils.hasScreenOutput(conv)){
        //conv.ask(prompts.getBasicCardChampionAbiliity(ability,conv.data));
        conv.ask(prompts.getSuggestionsRandomizedWithRequired());
    }
    
};

const showChampionInfoOption = (conv) => {
    if (conv.arguments.get('OPTION')) {
        let championKey = conv.arguments.get('OPTION');

        if(validateChampionKey(conv,championKey)){
            return repository.getChampion(championKey).then((champion) => {
                showChampionBasicInfo(conv,champion);
            }, (err) => {
                //TODO: champion nao encontrado
            });
        }else{
            championMatchInfoType(conv);
        }
    }else{
        fallback(conv);
    }
};

const showChampionAbilityOption = (conv) => {

    if (conv.arguments.get('OPTION')) {
        let abilityId = conv.arguments.get('OPTION');

        return repository.getAbility(abilityId).then((ability) => {
            showChampionAbility(conv,ability);
        }, (err) => {
            fallback(conv);
            //TODO: ability nao encontrada
        });

    }else{
        fallback(conv);
    }
};

const showChampionSkins = (conv, champion) => {

        conv.ask(prompts.getSimpleResponsesSkinsInfo(champion));
        conv.ask(prompts.askWhatInformationAfterSkins());

        if(utils.hasWebBrowser(conv)){
            conv.ask(prompts.getSkinsCarousel(champion));
        }
        if(utils.hasScreenOutput(conv)){
            conv.ask(prompts.getSuggestionsAfterSkins());
        }
};

const showChampionAbilities = (conv, champion, abilities) => {
    
        conv.contexts.set('champion-information-context-abilities', 5, {'champion':champion}); 
        conv.ask(prompts.getSimpleResponsesAbilitiesInfo(champion,abilities));
        conv.ask(prompts.askWhatInformationAfterListAbilities());
        if(utils.hasScreenOutput(conv)){
            conv.ask(prompts.getAbilitiesList(abilities,conv.data));
            conv.ask(prompts.getSuggestionsAfterListAbilities());
        }
        
};

const informationTypeNotFound = (conv) => {
    conv.ask(prompts.responseChampionInfoNotAvailable());
    conv.ask(prompts.getSuggestionsRandomizedWithRequired());
}

const validateChampionKey = (conv, championKey) =>{
    
    if(utils.hasValue(championKey) && Number.isInteger(parseInt(championKey)) ){
        conv.data.championKey = championKey;
        return championKey;
    }else{
        let championKey = conv.data.championKey;
        if(Number.isInteger(parseInt(championKey))){
            return championKey;
        }else{
            return false;
        }
    }
};


const championMatchInfoType = (conv, {champion, informationType}) => {
  
    //trata retorno após informar champion quando antes só tinha informado o informationType
    if(conv.data.informationType && !utils.hasValue(informationType) && utils.hasValue(champion)){
        informationType = conv.data.informationType;
        utils.clearConversationData(conv);
    }

    let championKey = validateChampionKey(conv,champion);
  
   if(championKey){

    return repository.getChampion(championKey).then((champion) => {

        if(utils.hasValue(informationType)){
            
            switch(informationType){
                case "skins":
                    showChampionSkins(conv, champion);
                    break;
                case "abilities":
                return repository.getAbilities(champion.key).then((abilities) => {
                    showChampionAbilities(conv, champion, abilities);
                }, (err) => {
                    //TODO abilities  nao encontradas
                });
                default:
                    informationTypeNotFound(conv);
            }
            
        }else{
            showChampionBasicInfo(conv,champion);
        }    
    }, (err) => {
        //TODO: champion nao encontrado
    });

   }else{
       if(informationType){
            switch(informationType){
                case "skins":
                conv.data.informationType = informationType;
                conv.ask(prompts.getSimpleResponsesWhichChampionSkins());
                    break;
                case "abilities":
                conv.data.informationType = informationType;
                conv.ask(prompts.getSimpleResponsesWhichChampionAbilities());
                    break;
                default:
                    informationTypeNotFound(conv);      
            }
       }else{
        conv.ask(prompts.getSimpleResponsesWhichChampionInformation());
       }
   }
}

const handleAbility = (conv, {abilityId, champion, hotkey}) => {
    
    //TODO: tratar quando falar champion e hotkey apenas
    if (utils.hasValue(abilityId)) {        
        return repository.getAbility(abilityId).then((ability) => {
            utils.clearConversationData(conv);
            conv.data.championKey = ability.championKey;
            showChampionAbility(conv,ability);
        }, (err) => {
            fallback(conv)
            //TODO: ability nao encontrada
        });

    }else{
        fallback(conv);
        //TODO: ability nao encontrada
    }
}

const intents = {'champion-information': championMatchInfoType, 
                'free-champions-rotation-OPTION': showChampionInfoOption,
                'abilities-champion-OPTION': showChampionAbilityOption,
                'ability-information':handleAbility};

exports.championInformationMatchIntent = (conv, ...args) => {
    return intents[conv.intent](conv, ...args);
};