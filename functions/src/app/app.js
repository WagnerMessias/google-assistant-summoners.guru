'use strict';
const {dialogflow} = require('actions-on-google');
const utils = require('../utils')
const app = dialogflow({debug: true,clientId:"xxxxxxxx",});
const championsRepository = require('../data/champions.repository');
const summonerRepository = require('../data/summoners.repository')

const {signInMatchIntent} = require('../context/sing-in/signIn.context');
const {welcomeMatchIntent} = require('../context/welcome/welcome.context');
const { exit,fallback,noInput} = require("../context/common/common.context");
const {freeRotationMatchIntent} = require('../context/free-champions-rotation/freeChampionsRotation.context');
const {championInformationMatchIntent} = require('../context/champion-information/championInformation.context');
const {masteryMatchIntent} = require('../context/mastery/mastery.context');

const {intent} = require('../constants/intents.constants')

app.middleware((conv) => {

    conv.data.user = getUserSignIn(conv);
    conv.data.server = utils.getServer(conv.user.locale)//TODO: pegar servidor extamente igual api substituir em todo appp
    championsRepository.getVersionData(conv.data.server).then((versionsData) => {
    conv.data.versions = versionsData;
    }, (err) => {
        console.error(err);
    });
  });

app.intent(intent.START_SIGN_IN, signInMatchIntent);
app.intent(intent.GET_SIGN_IN, signInMatchIntent);

app.intent(intent.FREE_CHAMPION_ROTATION, freeRotationMatchIntent);
app.intent(intent.FREE_ROTATION_SETUP_PUSH, freeRotationMatchIntent);
app.intent(intent.FINISH_FREE_ROTATION_SETUP_PUSH, freeRotationMatchIntent);
app.intent(intent.CHAMPION_INFORMATION, championInformationMatchIntent);
app.intent(intent.FREE_CHAMPION_ROTATION_OPTION, championInformationMatchIntent);

app.intent(intent.CHAMPION_INFORMATION_ABILITY_OPTION, championInformationMatchIntent);
app.intent(intent.CHAMPION_INFORMATION_SKIN, championInformationMatchIntent);
app.intent(intent.ABILITY_INFORMATION, championInformationMatchIntent);

app.intent(intent.MASTERY_TOTAL_SCORE, masteryMatchIntent);


app.intent(intent.WELCOME, welcomeMatchIntent);
app.intent(intent.EXIT, exit);
app.intent(intent.FALLBACK, fallback);
app.intent(intent.NO_INPUT, noInput);

app.fallback((conv) => {
    console.error('No matching intent handler found: ' + conv.intent);
    fallback(conv);
});

function getUserSignIn(conv){

    const {payload} = conv.user.profile;
    let user = {isSignIn:false};

    if(payload && payload.sub){
        let userObj =  {name: payload.given_name,
                    email: payload.email,
                    sub: payload.sub,
                    isSignIn: true};
        user = userObj;
    }
    return user;
}

//DialogflowApp object return
exports.app = app;