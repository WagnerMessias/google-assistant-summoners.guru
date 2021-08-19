const championsDB = require('../data/local/champions.db'); 
const utils = require('../utils');
const admin = require('firebase-admin');
const db = admin.firestore();

exports.updateAbilities = (response, language) => {

return championsDB.getAllChampions(language).then((champions) => {

    const abilities = [];

    champions.forEach(function(champion) {
        champion.spells.forEach(function(spell) {
            abilities.push(spell);
        });
    });

    return championsDB.saveAbilities(language,abilities).then((result) => {
        
        return championsDB.getEntity("abilities"+language.toUpperCase()).then((entity) => {
            response.status(200).send(entity);
          }, (err) => {
            console.error('erro get entity: ' + err);
            response.status(400).send("erro get entity: " +err);
          });

    }, (err) => {
        console.error('erro update abilities: ' + err);
        response.status(400).send("Update abilities error" );
    });

  }, (err) => {
    console.error('erro updateVersions: ' + err);
    response.status(400).send("Update version error" );
  });
}
