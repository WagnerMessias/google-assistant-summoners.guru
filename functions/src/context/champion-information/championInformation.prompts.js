const utils = require('../../utils');
const riotConstants = require('../../constants/riot-constants');

const {  List,
          BrowseCarousel,
          BrowseCarouselItem,
          Suggestions,
          Image,
  SimpleResponse,} = require('actions-on-google');

const MAX_SUGGESTIONS = 3;

exports.getSimpleResponsesChampionInformation = (championInfo) => {

  let speechs = [
    new SimpleResponse({
      speech: `<speak>
                  <prosody pitch="medium" rate="x-low"> 
                    <emphasis level="reduced"> `+ championInfo.name +`,</emphasis> 
                    <emphasis level="strong"> `+ championInfo.title +`,</emphasis> 
                    his primary role is `+ championInfo.tags[0].toLowerCase() +`
                  </prosody></speak>`,
      text: championInfo.name +`, `+ utils.toUpperCaseFirstChar(championInfo.title) +`, his primary role is `+ championInfo.tags[0].toLowerCase(),
    }),
  ];
  
  return utils.getSingleRandom(speechs);
  
}

exports.getSimpleResponsesChampionAbiliity = (ability) => {

  var speech = "";
  var text = "";

  if(ability.type === "P"){

    let text = ability.description;
    
    let nameAbility = ability.name + `, <break time="300ms"/>`;
    let passiveAbility = `Passive abiliity <break time="300ms"/>`;
    let descriptionAbility =  ability.description;
    speech = `<speak>
                    <prosody pitch="medium" rate="x-low">`
                    + nameAbility
                    + passiveAbility
                    + descriptionAbility +
                    `</prosody>
              </speak>`;
    text = ability.name + " is passive abiliity, " + descriptionAbility;
  }else{
    
    let nameAbility = ability.name + `, <break time="300ms"/>`;
    // let costAbility = ( utils.hasValue(ability.costBurn) ? 'Cost ' + ability.costBurn : '') + ' '; 
    // let rangeAbility = (ability.rangeBurn > 0) ? `Range ` + ability.rangeBurn : "";
    //let cooldownAbiliity = (utils.hasValue(abillity.cooldownBurn))? `Cooldown ` + abillity.cooldownBurn + `, <break time="300ms"/>` : ``;
    let descriptionAbility =  ability.description;
    speech = `<speak>
                    <prosody pitch="medium" rate="x-low">`
                    + nameAbility + `, <break time="300ms"/>`
                    + descriptionAbility +
                    `</prosody>
              </speak>`;
    text = ability.name + ", " + descriptionAbility;
  }


  let speechs = [
    new SimpleResponse({
      speech: speech,
      text: text,
    }),
  ];
  
  return utils.getSingleRandom(speechs);
  
}

exports.askWhatInformationChampion = () => {

  let speechs = [
    new SimpleResponse({
      speech: ` <speak>
                  <prosody pitch="medium" rate="x-low"> 
                  Can I tell you the abilities and skins, which one do you want?
                  </prosody>
                </speak>`,
      text: `Can I tell you the abilities and skins, which one do you want?`,
    }),
    new SimpleResponse({
      speech: ` <speak>
                  <prosody pitch="medium" rate="x-low"> 
                  Can I still talk about skins and skills, which would you like?
                </prosody>
                </speak>`,
      text: `Can I still talk about skins and skills, which would you like?`,
    }),
  ];
  
  return utils.getSingleRandom(speechs);
  
}

exports.askWhatInformationAbiliity = () => {

  let speechs = [
    new SimpleResponse({
      speech: ` <speak>
                  <prosody pitch="medium" rate="x-low"> 
                    tell abilities to see more or skins
                  </prosody>
                </speak>`,
      text: `tell abilities to see more or skins`,
    }),

    new SimpleResponse({
      speech: ` <speak>
                  <prosody pitch="medium" rate="x-low"> 
                  tell skins to see available or free rotation
                  </prosody>
                </speak>`,
      text: `tell skins to see available or free rotation`,
    }),
    new SimpleResponse({
      speech: ` <speak>
                  <prosody pitch="medium" rate="x-low">                  
                      tell other skins to see more
                  </prosody>
                </speak>`,
      text: `tell other ability to see more`,
    }),
  ];
  
  return utils.getSingleRandom(speechs);
  
}

exports.responseChampionInfoNotAvailable = () => {
  
  let speechs;

  if(true){
    speechs    = [
      new SimpleResponse({
        speech: ` <speak>
                    <prosody pitch="medium" rate="x-low"> 
                    This information is not yet available, how about seeing the skins or abilites of a champion?
                    </prosody>
                  </speak>`,
        text: `This information is not yet available, how about seeing the skins or abilites of a champion?`,
      }),
      new SimpleResponse({
        speech: ` <speak>
                    <prosody pitch="medium" rate="x-low">          
                        Sorry but soon we will have this functionality available, how about skins or abilities?
                    </prosody>
                  </speak>`,
        text: `Sorry but soon we will have this functionality available, how about skins or abilities?`,
      }),
    ];
  
  }else{

  return "TODO" // ADICIONAR SOLICITAÇÃO DE NOTIFICATIONS PARA NOVAS FUNCIONALIDADE SE NÃO JÁ ESTIVER ATIVADO
  }

return utils.getSingleRandom(speechs);
}

exports.getBasicCardChampionInformation = (championInfo) => {

    let imageURI = riotConstants.DATA_DRAGON_URL + riotConstants.DATA_DRAGON_URN_CHAMPION_SPLASH_SKIN.replace("num",utils.getRandomSkinNum(championInfo.skins))
    .replace("champion_id",championInfo.id);

    let text = " Attack : "+ championInfo.info['attack']; 
    text += " | Defense : "+ championInfo.info['defense'];
    text += " | Difficulty : "+ championInfo.info['difficulty'];
    text += " | Magic : "+ championInfo.info['magic'];
    
    let image = utils.createImage(imageURI, championInfo.name + " image");
    
    return utils.createBasicCard(championInfo.name,championInfo.title,text,'CROPPED',image,false);
};

exports.getBasicCardChampionAbiliity = (ability, data) => {
  var versionDataChampion = data.versions.champion;
  //FIXME: FAZER MELHORIAS
  if(ability.type === "P"){
  // var imageURI = riotConstants.DATA_DRAGON_URL + riotConstants.DATA_DRAGON_URN_CHAMPIONS_IMG_PASSIVE.replace("version_data",versionDataChampion)
  //                           .replace("image_name",ability.image.full);

  // let image = utils.createImage(imageURI, ability.name + " image"); 
  // let text = ability.description;

  return utils.createBasicCard(ability.name,'Passive',"",'CROPPED',false,false);                                                                                             
  }else{
    // var imageURI = riotConstants.DATA_DRAGON_URL + riotConstants.DATA_DRAGON_URN_CHAMPIONS_IMG_SPELL.replace("version_data",versionDataChampion)
    //                         .replace("image_name",ability.image.full);


    // let image = utils.createImage(imageURI, ability.name + " image");
    let subtitle = 'Hotkey "'+ ability.type +'"';

    let text = "**Cost:** " + ( ability.costBurn > 0 ? ability.costBurn : "") + " " + ability.costType + " | **Range:** " + ability.rangeBurn + "  \n";
    text += "**Cooldown:** " + ability.cooldownBurn +"  \n";
    // text += ability.description;
                          
    return utils.createBasicCard(ability.name,subtitle,text,'CROPPED',false,false); 
  }

};

exports.getSuggestionsRandomizedWithRequired = () => {

  let requiredSuggestion = ['Skins', "Abilities", "Free rotation"];
  let randomizedSuggestion = [];
  requiredSuggestion.push(...utils.getMultipleRandom(randomizedSuggestion));

  return new Suggestions(requiredSuggestion.slice(0,MAX_SUGGESTIONS));
};

exports.getSkinsCarousel = (championInfo) => {

  let skinsCountTiles = championInfo.skins.length;
  var skinsCarouseItens = [];

  for(let index in championInfo.skins){

    let skinCurrent = championInfo.skins[index];
    let imageURI = riotConstants.DATA_DRAGON_URL + riotConstants.DATA_DRAGON_URN_CHAMPION_SPLASH_SKIN.replace("num",skinCurrent.num)
                                                                                                     .replace("champion_id",championInfo.id);

    let itemCarouse = new BrowseCarouselItem({ 
                            title: utils.toUpperCaseFirstChar(skinCurrent.name.replace(championInfo.name,"")),
                            url: imageURI,
                            image: new Image({
                            url: imageURI,
                            alt: championInfo.name +' Skin '+ skinCurrent.name.replace(championInfo.name,""),
                            }),
                          });

    skinsCarouseItens.push(itemCarouse);
  } 

  return new BrowseCarousel({items: skinsCarouseItens});

};

exports.getSimpleResponsesSkinsInfo = (championInfo) => {

  let skins = championInfo.skins;
  let skinsLength = skins.length;

  let lastSkin = skins[skinsLength - 1]

  let namesSkins = skins.map( skin =>{ 
 
     if(lastSkin.name == skin.name){
       return ' and ' + skin.name.replace(championInfo.name,"");
     }
    return skin.name.replace(championInfo.name,"");
   }).join(", ");


  let speechs = [
    new SimpleResponse({
      speech: `<speak>
      <prosody pitch="medium" rate="x-low">` + championInfo.name +` has ` + skinsLength + ` skins, they are: ` + namesSkins +` </prosody>
      </speak>`,
      text: championInfo.name +` has ` + skinsLength + ` skins, they are: ` + namesSkins,
    }),
  ];
  
  return utils.getSingleRandom(speechs);
  
}

exports.getAbilitiesList = (abilities, data) => {
  var versionDataChampion = data.versions.champion;
  var spellsListItens = {};
  
  if(utils.hasValue(abilities.P.name)){
    let imageURI = riotConstants.DATA_DRAGON_URL + riotConstants.DATA_DRAGON_URN_CHAMPIONS_IMG_PASSIVE.replace("version_data",versionDataChampion)
                                                                                                     .replace("image_name",abilities.P.image);
    
    let synonyms = [];
    synonyms.push(abilities.P.id);
    synonyms.push(abilities.P.name);
                                                                                                    spellsListItens[abilities.P.id] = {
    synonyms: abilities.P.name,
    title: abilities.P.name,
    description: 'Passive',
    image: new Image({
                    url: imageURI,
                    alt:'Image of Abilitie ' + abilities.P.name,
                    })  
    }
  }

  if(utils.hasValue(abilities.Q.name)){
    let imageURI = riotConstants.DATA_DRAGON_URL + riotConstants.DATA_DRAGON_URN_CHAMPIONS_IMG_SPELL.replace("version_data",versionDataChampion)
                                                                                                    .replace("image_name",abilities.Q.image);                                                                                                
    let synonyms = [];
    synonyms.push(abilities.Q.id);
    synonyms.push(abilities.Q.name);
    
    spellsListItens[abilities.Q.id] = {
        synonyms: synonyms,
        title: abilities.Q.name,
        description: 'Hotkey "Q"',
        image: new Image({
                url: imageURI,
                alt:'Image of Abilitie ' + abilities.Q.name,
                })  
    }
  }

  if(utils.hasValue(abilities.W.name)){
    let imageURI = riotConstants.DATA_DRAGON_URL + riotConstants.DATA_DRAGON_URN_CHAMPIONS_IMG_SPELL.replace("version_data",versionDataChampion)
                                                                                                    .replace("image_name",abilities.W.image);                                                                                                
    let synonyms = [];
    synonyms.push(abilities.W.id);
    synonyms.push(abilities.W.name);
    
    spellsListItens[abilities.W.id] = {
        synonyms: synonyms,
        title: abilities.W.name,
        description: 'Hotkey "W"',
        image: new Image({
                url: imageURI,
                alt:'Image of Abilitie ' + abilities.W.name,
                })  
    }
  }

  if(utils.hasValue(abilities.E.name)){
    let imageURI = riotConstants.DATA_DRAGON_URL + riotConstants.DATA_DRAGON_URN_CHAMPIONS_IMG_SPELL.replace("version_data",versionDataChampion)
                                                                                                    .replace("image_name",abilities.E.image);                                                                                                
    let synonyms = [];
    synonyms.push(abilities.E.id);
    synonyms.push(abilities.E.name);
    
    spellsListItens[abilities.E.id] = {
        synonyms: synonyms,
        title: abilities.E.name,
        description: 'Hotkey "E"',
        image: new Image({
                url: imageURI,
                alt:'Image of Abilitie ' + abilities.E.name,
                })  
    }
  }

  if(utils.hasValue(abilities.R.name)){
    let imageURI = riotConstants.DATA_DRAGON_URL + riotConstants.DATA_DRAGON_URN_CHAMPIONS_IMG_SPELL.replace("version_data",versionDataChampion)
                                                                                                    .replace("image_name",abilities.R.image);                                                                                                
    let synonyms = [];
    synonyms.push(abilities.R.id);
    synonyms.push(abilities.R.name);
    
    spellsListItens[abilities.R.id] = {
        synonyms: synonyms,
        title: abilities.R.name,
        description: 'Hotkey "R"',
        image: new Image({
                url: imageURI,
                alt:'Image of Abilitie ' + abilities.R.name,
                })  
    }
  }
  return new List({
    title: 'Abilities',
    items: spellsListItens
  });
}

exports.getSimpleResponsesAbilitiesInfo = (champion, abilities) => {

  let namesAbilities = abilities.Q.name + ", " + abilities.W.name + ", " + abilities.E.name + " and " + abilities.R.name;

  let speechs = [
    new SimpleResponse({
      speech: `<speak>
      <prosody pitch="medium" rate="x-low">Here are the abilities of the `+ champion.name + ` ` + namesAbilities + `, your passive is ` + abilities.P.name + ` </prosody>
      </speak>`,
      text: `Here are the abilities of the `+ champion.name + `: ` + namesAbilities + ', your passive is ' + abilities.P.name,
    }),
  ];
  
  return utils.getSingleRandom(speechs);
}

const getChampionAbillity = (champion,abillityIndex) =>{

  if(abillityIndex === riotConstants.AbiliityHotkeysIndex.P){

      return champion.passive;
      
  }else{
      return champion.spells[abillityIndex];
  }

}

exports.getSimpleResponsesWhichChampionSkins = () => {

  let speechs = [
    new SimpleResponse({
      speech: `<speak><prosody pitch="medium" rate="x-low">Which champion do you want see the skins for?</prosody></speak>`,
      text: `Which champion do you want see the skins for?`,
    }),
  ];
  
  return utils.getSingleRandom(speechs);
}

exports.getSimpleResponsesWhichChampionAbilities = () => {

  let speechs = [
    new SimpleResponse({
      speech: `<speak><prosody pitch="medium" rate="x-low">Which champion do you know the abilities?</prosody></speak>`,
      text: `Which champion do you know the abilities?`,
    }),
  ];
  
  return utils.getSingleRandom(speechs);
}

exports.getSimpleResponsesWhichChampionInformation = () => {

  let speechs = [
    new SimpleResponse({
      speech: `<speak><prosody pitch="medium" rate="x-low">which champion do you want information?</prosody></speak>`,
      text: `which champion do you want information?`,
    }),
  ];
  
  return utils.getSingleRandom(speechs);
}

exports.askWhatInformationAfterSkins = () => {

  let speechs = [
    new SimpleResponse({
      speech: `<speak><prosody pitch="medium" rate="x-low">Now would you like to see the abilities or free champion rotation?</prosody></speak>`,
      text: `Now would you like to see the abilities or free champion rotation?`,
    }),
  ];
  
  return utils.getSingleRandom(speechs);
}

exports.getSuggestionsAfterSkins = () => {

  let requiredSuggestion = ["Free rotation",'abilities'];
  let randomizedSuggestion = ["Tristana", "Draven", "Blitz","Corki", "Azir"]; 
  requiredSuggestion.push(...utils.getMultipleRandom(randomizedSuggestion));

  return new Suggestions(requiredSuggestion.slice(0,MAX_SUGGESTIONS));
};

exports.askWhatInformationAfterListAbilities = () => {

  let speechs = [
    new SimpleResponse({
      speech: `<speak><prosody pitch="medium" rate="x-low">Now would you like to see the skins or which ability you want more details?</prosody></speak>`,
      text: `Now would you like to see the skins or which ability you want more details?`,
    }),
  ];
  
  return utils.getSingleRandom(speechs);
}

exports.getSuggestionsAfterListAbilities = () => {

  let requiredSuggestion = ["Free rotation",'skins'];
  let randomizedSuggestion = ["Tristana", "Draven", "Blitz","Corki", "Azir"]; 
  requiredSuggestion.push(...utils.getMultipleRandom(randomizedSuggestion));

  return new Suggestions(requiredSuggestion.slice(0,MAX_SUGGESTIONS));
};