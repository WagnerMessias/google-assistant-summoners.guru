const utils = require('../../utils');
const {SimpleResponse,Suggestions, Button} = require('actions-on-google');

const MAX_SUGGESTIONS = 3;


exports.getSimpleResponses = () => {

let speechs = [
  new SimpleResponse({
    speech: `<speak>
    <prosody pitch="medium" rate="x-low"><emphasis level="strong"> Hi Summoner,</emphasis> do you want to know the free champion rotation o<emphasis level="reduced">or</emphasis> say the name of a champion</prosody>
   </speak>`,
    text: `Hi Summoner, do you want to know the free champion rotation or say the name of a champion`,
  }),
  new SimpleResponse({
    speech: `<speak>
    <prosody pitch="medium" rate="x-low"><emphasis level="strong"> hi Summoner,</emphasis> you can start by asking<break time="300ms"/> about free champions rotation ¨<break time="300ms"/> <emphasis level="reduced">or</emphasis> say the name of a champion who wants information</prosody>
    </speak>`,
    text: `Hi Summoner, you can start by asking about free champions rotation  or say the name of a champion who wants information`,
  }),
  new SimpleResponse({
    speech: `<speak>
    <prosody pitch="medium" rate="x-low"><emphasis level="strong"> Welcome, Summoner,</emphasis> ask about a champion <emphasis level="reduced">or</emphasis> which ones are free to play</prosody></speak>`,
    text: `Welcome, Summoner, ask about a champion or which ones are free to play`,
  }),
  new SimpleResponse({
    speech: `<speak>
    <prosody pitch="medium" rate="x-low"><emphasis level="strong"> Howdy, gamester</emphasis> ask about a champion <emphasis level="reduced">or</emphasis> which ones are free to play</prosody></speak>`,
    text: `Howdy, gamester, ask about a champion or which ones are free to play`,
  }),
];

return utils.getSingleRandom(speechs);
}

exports.getSuggestionsRandomizedWithRequired = () => {

  let requiredSuggestion = ["Free rotation",'Skins'];
  let randomizedSuggestion = ["Tristana", "Draven", "Blitz","Corki", "Azir"]; 
  requiredSuggestion.push(...utils.getMultipleRandom(randomizedSuggestion));

  return new Suggestions(requiredSuggestion.slice(0,MAX_SUGGESTIONS));
};

exports.getBasicCardTutorial = () => {

let buttons =new Button({title:'GET STARTED',url:"https://www.google.com/"});

let image = utils.createImage("https://gamingnews.com.br/wp-content/uploads/2014/09/league-of-legends.jpg","Welcome image ");

return utils.createBasicCard(false,false,false,'CROPPED',image,buttons);

};

exports.getImageNews = () => {
  
  let url = "https://firebasestorage.googleapis.com/v0/b/league-of-legends-assistant.appspot.com/o/summoners%20guro%20WELCOME%20fundo%20white.png?alt=media&token=482a0209-3956-49cc-8644-7de5f01d5095";
  let alt = "Welcome image";
 
  return utils.createImage(url,alt);
  
  };

// exports.getSuggestions = () => {

//   let requiredSuggestion = ['Champion', "Free champions"];
  
//   return new Suggestions(requiredSuggestion);
// };

// exports.getSuggestionsRandomized = () => {

//   let randomizedSuggestion = ['Champion', "Free champions",'Skins', "Champion abilities","Current session"]; 

//   return new Suggestions(utils.getMultipleRandom(randomizedSuggestion).slice(0,MAX_SUGGESTIONS));
// };


// const {  List,
//   Carousel,
//   BrowseCarousel,
//   BrowseCarouselItem,
//   dialogflow,
//   Suggestions,
//   BasicCard,
//   Button,
//   Image,
// SimpleResponse,} = require('actions-on-google');

// let buttonsArray = [{title:'APP',uri:'android-app://com.mercadolibre/meli/home'},{title:'GET STARTED 2',uri:'https://www.google.com/'}];
// let buttonsArray = [{title:'MAPS',uri:'http://play.google.com/store/apps/details?id=com.google.android.apps.maps'},{title:'GET STARTED 2',uri:'https://www.google.com/'}];
// let buttons = utils.createButtons(buttonsArray);
// exports.teste = [
// ,
//   new SimpleResponse({
//     speech: `Come back if there's anything else IO you'd like to know.`,
//     text: `Come back if there's anything else I/O you'd like to know.`,
//   }),
// ];

// {
//   'simpleResponses': [
//       new SimpleResponse({
//         //Olá Invocador, você pode pedir  informaçoes sobre um campeão ou quais sao os campeões gratuitos desta semana
//       speech: `hi Summoner, you can start by asking, ¨which free champions this week¨ or ask for information about a champion¨`,
//       text: `That's a 404. What did you want help with?`,
//     }),
//   ],
//   'suggestions': {
//     'required': [
//       'Manage my schedule',
//       'Find things to do',
//       'Get directions',
//     ],
//     'randomized': [
//       'Where is it?', 'How can I watch remotely?', `Find office hours`,
//       'Will there be food?', 'Is there swag?', `When's the after party?`, 'Codelabs and sandboxes',
//     ],
//   },
// }