
const championsDB = require('./local/champions.db');

exports.getChampion = (championKey, region) => {

    return new Promise(function(resolve, reject) {

        championsDB.fetchChampion(region,championKey).then((champion) => {
            resolve(champion);
        }, (err) => {
            reject(err);
        });

    });
}



exports.getAbilities = (championKey) => {

    return new Promise(function(resolve, reject) {

        return championsDB.fetchAbilities("na",championKey).then((snapshot) => {
            const abilities = new Object();

            snapshot.forEach(function(doc) {
                let ability = doc.data();
                switch(ability.type){
                    case "P":
                    abilities.P = ability;
                    break;
                    case "Q":
                    abilities.Q = ability;
                    break;
                    case "W":
                    abilities.W = ability;
                    break;
                    case "E":
                    abilities.E = ability;
                    break;
                    case "R":
                    abilities.R = ability;
                    break;
                    default:
                    console.error("Ability desconhecida!");
                }
                
            });
            resolve(abilities);
        }, (err) => {
            reject(err);
        });

    });
}

exports.getAbility = (abilityId) => {

    return new Promise(function(resolve, reject) {

        return championsDB.fetchAbility("na",abilityId).then((ability) => {
            resolve(ability);
        }, (err) => {
            reject(err);
        });

    });
}

exports.getFreeChampionsRotation = () => {

    return new Promise(function(resolve, reject) {

        championsDB.fetchFreeChampionsRotationFull("na").then((freeRotation) => {
            resolve(freeRotation.championsFull);
        }, (err) => {
            reject(err);
        });

    });
}

exports.getVersionData = (server) => {
    return new Promise(function(resolve, reject) {

        championsDB.fetchVersionsData(server).then((versionsData) => {
            resolve(versionsData);
        }, (err) => {
            reject(err);
        });

    });
}