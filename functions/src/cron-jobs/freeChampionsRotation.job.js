const championsDB = require('../data/local/champions.db'); 

const utils = require('../utils');
const notification = require('../cron-jobs/pushNotification');

const riotGameApi = require('../data/remote/riot-games-api.client'); 
const {intent} = require('../constants/intents.constants')


exports.notifyUpdateNewFreeChampionRotation = (response, language) => {
  
  return riotGameApi.getFreeChampionRotation(language).then((newFreeRotation) => {

    if(newFreeRotation.status){

      console.info("Erro Api Riot getFreeChampionRotation(): "+newFreeRotation.status.status_code);
      response.status(400).send("Update free champion rotation error" + error);
    }else{
      return championsDB.fetchFreeChampionsRotation(language).then((oldFreeRotation) => {

        if(utils.compareArrays(oldFreeRotation.freeChampionIds,newFreeRotation.freeChampionIds)){
          console.info("Free rotation has not been updated");
          response.status(200).send("Free rotation has not been updated" );
        }else{

            return championsDB.saveFreeChampionsRotation(language,newFreeRotation).then((result) => {
              console.info("Free rotation was successfully updated");
 
                  return notification.sendNotificationForIntent(language,intent.FREE_CHAMPION_ROTATION,"New free champion rotation")
                  .then((result) => {
                    response.status(200).send("Free rotation notification successfully" );
                  }, (err) => {
                    console.error('erro notification free rotation: ' + err);
                    response.status(400).send("notification free rotation error" );
                });

            }, (err) => {
                console.error('erro update free rotation: ' + err);
                response.status(400).send("Update free rotation error" );
            });
        }

      }, (err) => {
        console.error('erro updateVersions: ' + err);
        response.status(400).send("Update version error" );
      });
    }
    
  });

}

//URL: https://us-central1-league-of-legends-assistant.cloudfunctions.net/freeRotationUpdate?key=b8a9d06c6725128149b6222eb1735e462ad909d3
//040 */1 * * 2 (America/New_York)
//*/30 * * * 2  -> At every 30th minute on Tuesday
// 30 */1 * * 0 -> At minute 30 past every hour on Sunday
// 30 0-23/1 * * 0

// function forceUpdateFake(){

// var jso = {"freeChampionIds":[11,16,23,45,51,77,79,85,90,92,143,164,236,421],"freeChampionIdsForNewPlayers":[18,81,92,141,37,238,19,45,25,64],"maxNewPlayerLevel":10};

//     refRaizDataBase.child('freeChampionRotation').set(jso).then(function() {
//       return "rotation fake update completed";
//     }).catch(function(error) {
//       return "rotation fake update not fail: "+error;
//     });

// }
