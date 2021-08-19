const riotStaticAPI = require('../data/remote/riot-static-data-api.client'); 
const championsDB = require('../data/local/champions.db'); 

const utils = require('../utils');
const riotConstants = require('../constants/riot-constants')
const admin = require('firebase-admin');
const db = admin.firestore();

exports.updateChampions = (response, language) => {

return riotStaticAPI.getChampions(language).then((resp) => {
    let dataChampions = resp.data;

    let entries  = [];
    
    for(var championKey in dataChampions){

        let champion = dataChampions[championKey];

        entries.push({"value": champion.key, "synonyms": [
            champion.name,
            champion.id,
            champion.title
          ]});
    }

    return  db.collection("entities").doc("champions"+language.toUpperCase()).set({"champions": entries})
    .then(function() {

       // let namesUpdate = [];
        var batch = db.batch();
        const championsArray = [];
        //var championsFull = new Object();

        for(var key in dataChampions){
           let championId = dataChampions[key].id;

            let promise =  riotStaticAPI.getChampion(language,championId).then((resp) => {
            
                let champion = resp.data[championId];

                let championRef = db.collection("champions"+language.toUpperCase()).doc(champion.key);
                batch.set(championRef, customizingDataChampion(champion));

            }, (err) => {
                console.error('erro updateChampions: ' + err);
            });

            championsArray.push(promise);    
        };

       return  Promise.all(championsArray)
        .then(() => {
            
            return batch.commit().then(function () {

                return championsDB.getEntity("champions"+language.toUpperCase()).then((entity) => {
                    response.status(200).send(entity);
                  }, (err) => {
                    console.error('erro get entity: ' + err);
                    response.status(400).send("erro get entity: " +err);
                  });
            });
            
        })
        .catch(err =>{
            console.error(err);
            response.status(400).send("Update champions erro" + err);
        });

    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
        response.status(400).send("Update entities erro" + error);
    });

  }, (err) => {
    console.error('erro updateVersions: ' + err);
    response.status(400).send("Update version error" );
  });
}

function customizingDataChampion(champion){

    abilitiesIndex = ["Q","W","E","R"];
    let newSpells =  [];
    let spells = champion.spells;

    newSpells.push({"id": champion.id+"P",
                    "championKey":champion.key,
                    "type": "P",
                    "name": champion.passive.name,
                    "description": champion.passive.description,
                    "image": champion.passive.image.full
                });

    for(let i in  spells) {
        let hotkey = abilitiesIndex[i];

        newSpells.push({"id": champion.id+hotkey,
                "championKey":champion.key,
                "type": hotkey,
                "name": spells[i].name,
                "description": spells[i].description,
                "image": spells[i].image.full,
                "costBurn" : spells[i].costBurn,
                "costType" : spells[i].costType,
                "rangeBurn" : spells[i].rangeBurn,
                "cooldownBurn" : spells[i].cooldownBurn
            });

    };

    let data = {"key": champion.key,
                "id": champion.id,
                "name": champion.name,
                "title":champion.title,
                "image":champion.image,
                "tags": champion.tags,
                "info":champion.info,
                "skins":champion.skins,
                "passive": champion.passive,
                "spells": newSpells
    }

    return data;

}
