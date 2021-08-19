const {BasicCard,
    Button,Image} = require('actions-on-google');

    const functions = require('firebase-functions');

const AUDIO_OUTPUT = 'actions.capability.AUDIO_OUTPUT'; //The device has a speaker.
const SCREEN_OUTPUT = 'actions.capability.SCREEN_OUTPUT'; //The device has an output display screen.
const MEDIA_RESPONSE_AUDIO = 'actions.capability.MEDIA_RESPONSE_AUDIO'; //The device supports playback of media content.
const WEB_BROWSER = 'actions.capability.WEB_BROWSER'; //The device supports a web browser.

exports.getSingleRandom = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
};

exports.getMultipleRandom = (arr) => {
    return arr.filter(() => Math.random() > 0.5);
};

exports.createBasicCard = (title, subtitle,text, display, imageData, buttonsData ) => {

    var cardItens = {};

    if(!hasValue(text) && !hasValue(imageData.url)){
        console.error("Erro Basiccard Create - Context Welcome");
    }
  
 
    hasValue(title) ? cardItens['title'] = title : null;
    hasValue(subtitle) ? cardItens['subtitle'] = subtitle : null;
    hasValue(display) ? cardItens['display'] = display : null;
    hasValue(text) ? cardItens['text'] = text : null;

    if(hasValue(imageData)){
        cardItens['image'] = imageData;
    }
  
    if(hasValue(buttonsData)){
        cardItens['buttons'] = buttonsData;
    }

return new BasicCard(cardItens);

};

function hasValue(val){
    return val !== false && val !== undefined && val !== "" && val !== null; 
};

exports.createButtons = (buttons) => {

var buttonsArray = [];

for(let index in buttons){

buttonsArray.push(new Button(
    {title:buttons[index].title,url:buttons[index].uri}
));
}

return buttonsArray;

};

exports.createImage = (imageURI,accessibilityText)  => {

    return new Image({
                    url:imageURI,
                    alt: accessibilityText,
                })
//    {url: imageURI,accessibilityText: accessibilityText,}       
};

exports.toUpperCaseFirstChar = (string) => {
    return string.charAt(0).toUpperCase() + string.substring(1, string.length - 1);
  }

exports.getRandomSkinNum = (arraySkins) => {

    let randomIndex = Math.floor(Math.random() * arraySkins.length);
    randomIndex = randomIndex > 0 ? randomIndex -1 : randomIndex;
    return arraySkins[randomIndex].num;
};

exports.validatekey = (key)  => {
    switch(key){
        case functions.config().key.freerotation:
            return true;
        default:
            return false;
    }    
};

exports.resetConversationContext = (conv) => {
    conv.contexts.delete('champion-information-context');
    conv.contexts.delete('champion-information-context-abilities');
  };

  exports.clearConversationData = (conv) => {
      //TODO: modificar o uso para algo genérico
    conv.data.championKey = null;
    conv.data.informationType = null;
  };
  exports.hasValue = (value) => {

   if(typeof value != "undefined" && value != "" && value != null && value != false && value != isNaN){
        return true;
   }else{
       return false
   }
};

exports.compareArrays = (arrayOne, arrayTwo) => {
    
    if(!arrayOne || !arrayTwo){
        return false;
    }

    if (arrayOne.length != arrayTwo.length){
        return false;
    }

    for (var i = 0, l=arrayOne.length; i < l; i++) {
        // Check if we have nested arrays
        if (arrayOne[i] instanceof Array && arrayTwo[i] instanceof Array) {
            // recurse into the nested arrays
            if (!compareArrays(arrayOne[i],arrayTwo[i]))
                return false;       
        }           
        else if (arrayOne[i] != arrayTwo[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    } 
    
    return true;
};

exports.hasScreenOutput = (conv) => {
    return conv.surface.capabilities.has(SCREEN_OUTPUT);
}

exports.hasAudioOutput = (conv) => {
    return conv.surface.capabilities.has(AUDIO_OUTPUT);
}

exports.hasMediaResponseAudio = (conv) => {
    return conv.surface.capabilities.has(MEDIA_RESPONSE_AUDIO);
}

exports.hasWebBrowser = (conv) => {
    return conv.surface.capabilities.has(WEB_BROWSER);
}

exports.getServer = (locale) => {
    switch(locale){    
        case "pt-BR":
            return "br";
        default:
            return "na";;
    }   
 };