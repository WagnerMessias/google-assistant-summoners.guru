const utils = require('../../utils');
const riotConstants = require('../../constants/riot-constants');

const { List,
        Suggestions,
        SimpleResponse,} = require('actions-on-google');

const MAX_SUGGESTIONS = 3;

exports.getSimpleResponsesInformationchampion = () => {

  let speechs = [
    new SimpleResponse({
      speech: `<speak><prosody pitch="medium" rate="x-low"> Tell the name of a champion to get information about him </prosody></speak>`,
      text: `Tell the name of a champion to get information about him`,
    }),
    new SimpleResponse({
      speech: `<speak><prosody pitch="medium" rate="x-low">Inform the name of the champion to know his ability and much more </prosody></speak>`,
      text: `inform the name of the champion to know his ability and much more`,
    }),
  ];
  
  return utils.getSingleRandom(speechs);
  }

exports.getSimpleResponsesListChampion = (freeChampions) => {

 let lastChampion = freeChampions[freeChampions.length - 1];

 let namesChampionsFreeRotation = freeChampions.map( champion =>{ 

    if(lastChampion.name == champion.name){
      return ' and ' + champion.name;
    }
   return champion.name;
  }).join(", ");

let speechs = [
  new SimpleResponse({
    speech: `<speak>
    <prosody pitch="medium" rate="x-low">Here are this week's free champions: ` + namesChampionsFreeRotation +` </prosody>
    </speak>`,
    text: `Here are this week's free champions: `+ namesChampionsFreeRotation,
  }),
];

return utils.getSingleRandom(speechs);

}

exports.getChampionRotationsList = (freeChampions,data) => {

  var versionDataChampion = data.versions.champion;

  var championsListItens = {}

for (let index in freeChampions){
  let champion = freeChampions[index];

  let synonyms = [];
  synonyms.push(champion.name)

  var imageChampionURI = riotConstants.DATA_DRAGON_URL + riotConstants.DATA_DRAGON_URN_CHAMPIONS_IMG_SQUARE.replace("version_data",versionDataChampion)
                                                                                               .replace("image_name",champion.image.full);                                                                                    
  let imageObj = utils.createImage(imageChampionURI, champion.name + "Image");
  championsListItens[champion.key] = {
  synonyms: synonyms,
  title: champion.name,
  description: utils.toUpperCaseFirstChar(champion.title),
  image: imageObj,    
  }
}
    return new List({
      title: 'Free Champion Rotation ',
      items: championsListItens
    });
}

exports.getSuggestionsRandomizedWithRequired = () => {
//TODO: definir modo
  let requiredSuggestion = ["Notify free rotation","Skins", "Abilities"];
  let randomizedSuggestion = []; 
  //requiredSuggestion.push(...utils.getMultipleRandom(randomizedSuggestion));
  return new Suggestions(requiredSuggestion.slice(0,MAX_SUGGESTIONS));
};

exports.getSuggestionsWithhoutNotification = () => {

  let requiredSuggestion = ["Skins", "Abilities"];

  return new Suggestions(requiredSuggestion);
};

exports.getSimpleResponsesSaveIdUserPushSuccessfully = () => {

  let speechs = [
    new SimpleResponse({
      speech: `<speak><prosody pitch="medium" rate="x-low"> Ok, I'll start alerting you weekly. </prosody></speak>`,
      text: `Ok, I'll start alerting you weekly.`,
    }),
  ];
  
  return utils.getSingleRandom(speechs);
  }

  exports.getSimpleResponsesSaveIdUserPushfailed = () => {

    let speechs = [
      new SimpleResponse({
        speech: `<speak><prosody pitch="medium" rate="x-low">Unable to activate alert, please try again later.</prosody></speak>`,
        text: `Unable to activate alert, please try again later.`,
      }),
    ];
    
    return utils.getSingleRandom(speechs);
}

  exports.getSimpleResponsesPermissionPrevGranted = () => {

    let speechs = [
      new SimpleResponse({
        speech: `<speak><prosody pitch="medium" rate="x-low">permission previously granted.</prosody></speak>`,
        text: `Permission previously granted.`,
      }),
    ];
    
    return utils.getSingleRandom(speechs);
  }

  exports.getSimpleResponsesNotAlert = () => {

    let speechs = [
      new SimpleResponse({
        speech: `<speak><prosody pitch="medium" rate="x-low">Ok, I won't alert you</prosody></speak>`,
        text: `Ok, I won't alert you.`,
      }),
    ];
    
    return utils.getSingleRandom(speechs);
  }