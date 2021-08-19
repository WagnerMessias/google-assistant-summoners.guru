const riotConstants = require('../../constants/riot-constants');
const request = require('node-fetch');
const functions = require('firebase-functions');
const utils = require('../../utils'); 


exports.getVersions = () => {
    return getRiotGamesAPI(riotConstants.URN_CHAMPION_ROTATIONS).then((response) => {
         return  response;
     });
 } 

exports.getFreeChampionRotation = (language) => {
    
    return getRiotGamesAPI(language,riotConstants.URN_CHAMPION_ROTATIONS).then((response) => {
        return  response;
    });
}   

function getRiotGamesAPI(language,URN) {

    let keyApiRiotGame = riotConstants.KEY_API_RIOT_GAME;

    if(utils.hasValue(functions.config().key.riotgameapi)){
        
        keyApiRiotGame = functions.config().key.riotgameapi;
    }

    console.info("key Riot Game: "+keyApiRiotGame);

    let URL;
    switch(language){
        case "br":
        URL = riotConstants.RIOT_GAMES_API_BR1;
        break
        default:
        URL = riotConstants.RIOT_GAMES_API_NA1;
    }

    let URI = URL + URN;
    return request(URI, {headers: { 'X-Riot-Token': keyApiRiotGame}})
            .then((response) => response.json());
}


//firebase functions:config:set key.riotgameapi="RGAPI-72bca8e7-ccb1-46dd-93e6-084c2bd45598"
