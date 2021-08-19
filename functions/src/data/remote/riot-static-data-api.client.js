const riotConstants = require('../../constants/riot-constants');
const request = require('request');
const admin = require('firebase-admin');
const db = admin.firestore();



function getRiotStaticAPI(URN, resolve, reject) {
    let URI = riotConstants.DATA_DRAGON_URL + URN;
    return  request({url: URI,json: true}, function(error, response, body) {

        if(!error){
            resolve(body);
        }else{
            console.error('Error get send: ' + error);
            reject('Error get send: ' + error);
        }
        
    });
}

exports.getVersions = (language) => { 

    return new Promise(function(resolve, reject) {

        if(language == 'na'){
            getRiotStaticAPI(riotConstants.DATA_DRAGON_URN_VERSIONS_API_NA, resolve, reject);
        }else if(language == 'br'){
            getRiotStaticAPI(riotConstants.DATA_DRAGON_URN_VERSIONS_API_BR, resolve, reject);
        }  
    })
}

exports.getChampions = (language) => { 

    return new Promise(function(resolve, reject) {
        let versionsRef =  db.collection("versions").doc(language);
        versionsRef.get()
                .then(function(querySnapshot) {
                    
                    let versions = querySnapshot.data();
                    let championsVersion = versions.champion;
                    var URN = riotConstants.DATA_DRAGON_URN_CHAMPIONS.replace("version_data",championsVersion)
                                                                          
                    if(language == 'na'){
                        getRiotStaticAPI(URN.replace("language",riotConstants.language.na), resolve, reject);
                    }else if(language == 'br'){
                        getRiotStaticAPI(URN.replace("language",riotConstants.language.br), resolve, reject);
                    } 
                })
                .catch(function(error) {
                    console.error("Error getting documents version: ", error);
                    reject('Error getting documents version: ' + error);
                });
 
    })
} 

exports.getChampion = (language, championId) => { 

    return new Promise(function(resolve, reject) {
        let versionsRef =  db.collection("versions").doc(language);
        versionsRef.get()
                .then(function(querySnapshot) {
                    
                    let versions = querySnapshot.data();
                    let championsVersion = versions.champion;

                    let URN = riotConstants.DATA_DRAGON_URN_CHAMPION.replace("version_data",championsVersion)
                                                                    .replace("champion_id",championId);
                                                                          
                    if(language == 'na'){
                        getRiotStaticAPI(URN.replace("language",riotConstants.language.na), resolve, reject);
                    }else if(language == 'br'){
                        getRiotStaticAPI(URN.replace("language",riotConstants.language.br), resolve, reject);
                    } 
                })
                .catch(function(error) {
                    console.error("Error getting documents version: ", error);
                    reject('Error getting documents version: ' + error);
                });
 
    })
}  

  	// // Do async job
    //   request.get(options, function(err, resp, body) {
    //     if (err) {
    //         reject(err);
    //     } else {
    //         resolve(JSON.parse(body));
    //     }
    // })