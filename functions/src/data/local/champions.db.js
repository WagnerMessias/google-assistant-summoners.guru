const admin = require('firebase-admin');
const db = admin.firestore();


function getAllFullChampions(language){ 

    return new Promise(function(resolve, reject) {
        let championsRef =  db.collection("champions"+language.toUpperCase());
        championsRef.get()
                .then(function(querySnapshot) {

                    const championsArray = [];

                    querySnapshot.forEach(function(doc) {
                        championsArray.push(doc.data());
                    });

                    console.info(championsArray);
                    resolve(championsArray);               
                })
                .catch(function(error) {
                    console.error("Error getting documents version: ", error);
                    reject('Error getting documents version: ' + error);
                });
 
    })
} 

exports.getAllChampions = (language) =>{

    return getAllFullChampions(language);
}


exports.saveAbilities = (language,abilities) => { 

    return new Promise(function(resolve, reject) {
        let entries  = [];
        var batch = db.batch();
        let i = 0;
        abilities.forEach(function(ability){
            i++;
            let abilityRef = db.collection("abilities"+language.toUpperCase()).doc(ability.id);
            batch.set(abilityRef, ability);

            entries.push({"value": ability.id, "synonyms": [
                ability.name
              ]});

            if(i % 500 === 0 ){
                batch.commit();
                batch = db.batch();
            }
        })

        return batch.commit().then(function () {

            return db.collection("entities").doc("abilities"+language.toUpperCase()).set({"abilities": entries}).then(function() {
                resolve(true);
            });
        });

    })
} 


exports.getEntity = (entity) => { 

    return new Promise(function(resolve, reject) {

        let docRef = db.collection("entities").doc(entity);

        return docRef.get().then(function(doc) {
            if (doc.exists) {
                resolve(doc.data());
            } else {
                reject("No such document!");
            }
        }).catch(function(error) {
            reject("Error getting document:", error);
        });
    })
}

exports.fetchChampion = (language, championKey) => { 

    return new Promise(function(resolve, reject) {

        let docRef = db.collection("champions"+language.toUpperCase()).doc(championKey);
        return docRef.get().then(function(doc) {
            if (doc.exists) {
                resolve(doc.data());
            } else {
                console.error("No such champion!")
                reject("No such champion!");
            }
        }).catch(function(error) {
            console.error("Error getting champion:", error);
            reject("Error getting champion:", error);
        });
    })
}

exports.fetchAbilities = (language, championKey) => { 

    return new Promise(function(resolve, reject) {

        let collectionRef = db.collection("abilities"+language.toUpperCase());
        let where = collectionRef.where("championKey","==",championKey)
        return where.get().then(function(querySnapshot) {
            if (querySnapshot.size > 0) {
                resolve(querySnapshot);
            } else {
                console.error("No such abilities!")
                reject("No such abilities!");
            }
        }).catch(function(error) {
            console.error("Error getting champion:", error);
            reject("Error getting champion:", error);
        });
    })
}

exports.fetchAbility = (language, abilityId) => { 

    return new Promise(function(resolve, reject) {

        let docRef = db.collection("abilities"+language.toUpperCase()).doc(abilityId);

        return docRef.get().then(function(doc) {
            if (doc.exists) {
                resolve(doc.data());
            } else {
                console.error("No such ability!")
                reject("No such ability!");
            }
        }).catch(function(error) {
            console.error("Error getting ability:", error);
            reject("Error getting ability:", error);
        });
    })
}

exports.fetchFreeChampionsRotation = (language) => { 

    return new Promise(function(resolve, reject) {

        let docRef = db.collection("freeChampionsRotation").doc(language);

        return docRef.get().then(function(doc) {
            if (doc.exists) {
                resolve(doc.data());
            } else {
                console.error("No such free rotation!")
                reject("No such free rotation!");
            }
        }).catch(function(error) {
            console.error("Error fetch free rotation:", error);
            reject("Error fetch free rotation:", error);
        });
    })
}

exports.fetchFreeChampionsRotationFull = (language) => { 

    return new Promise(function(resolve, reject) {

        let docRef = db.collection("freeChampionsRotation").doc("champions"+language.toUpperCase());

        return docRef.get().then(function(doc) {
            if (doc.exists) {
                resolve(doc.data());
            } else {
                console.error("No such free rotation full!")
                reject("No such free rotation full!");
            }
        }).catch(function(error) {
            console.error("Error fetch free rotation full:", error);
            reject("Error fetch free rotation full:", error);
        });
    })
}

function saveFreeChampionsFull(language, freeRotation) { 
    return new Promise(function(resolve, reject) {
console.info(freeRotation);
        getAllFullChampions(language).then((champions) => {

            const championsFree = [];
            
            let freeChanpionsIdsArray = freeRotation.freeChampionIds;

            champions.forEach(function(champion) {

              if(freeChanpionsIdsArray.indexOf(parseInt(champion.key)) > -1){
                championsFree.push(champion)
              }
            });

            return db.collection("freeChampionsRotation").doc("champions"+language.toUpperCase())
                .set({championsFull:championsFree}).then(function(docRef) {
                    resolve(docRef);
                }, (err) => {
                    console.error("Error adding document champions free: ", err);
                    reject(err);
                });
        });
    })
}

exports.saveFreeChampionsRotation = (language,newFreeRotation) => { 

    return new Promise(function(resolve, reject) {
        
        db.collection("freeChampionsRotation").doc(language).set(newFreeRotation)
        .then(function(docRef) {

            saveFreeChampionsFull(language,newFreeRotation).then((docRef) => {
                resolve(docRef);
            }, (err) => {
                reject(err);
            });

        })
        .catch(function(error) {
            reject(error);
            console.error("Error adding document: ", error);
        });
    })
} 

exports.fetchVersionsData = (server) => { 

    return new Promise(function(resolve, reject) {

        let docRef = db.collection("versions").doc(server);

        return docRef.get().then(function(doc) {
            if (doc.exists) {
                resolve(doc.data());
            } else {
                console.error("No such versions data!")
                reject("No such versions data!");
            }
        }).catch(function(error) {
            console.error("Error fetch versions data:", error);
            reject("Error fetch versions data:", error);
        });
    })
}