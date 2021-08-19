
const summonersDB = require('./local/summoners.db');
const utils = require('../utils');

exports.registerUserForPushNotification = (userID, intent) => {
    
    return new Promise(function(resolve, reject) {

        return summonersDB.saveUserIdIntentForPushNotification("na",userID, intent).then((docRef) => {

            if(utils.hasValue(docRef.id)){
                resolve(true);
            }else{
                reject("error save user push notification"); 
            }
        }, (err) => {
            reject(err);
        });

    });
}

exports.getUserIdIntentForPushNotification = (language,intent) => {

    return new Promise(function(resolve, reject) {

        return summonersDB.fetchUserIdIntentForPushNotification(language, intent).then((snapshot) => {

            const userIdsNotifications = [];

            snapshot.forEach(function(doc) {
                userIdsNotifications.push(doc.data());
                
            });
            resolve(userIdsNotifications);

        }, (err) => {
            reject(err);
        });

    });
}

exports.signInUser = (dataUser) => {
    
    return new Promise(function(resolve, reject) {

        return summonersDB.saveUser(dataUser).then(() => {
            resolve(true);
        }, (err) => {
            reject(err);
        });

    });
}

exports.getUserById = (userId) => {
    
    return new Promise(function(resolve, reject) {

        return summonersDB.fetchUserById(userId).then((user) => {
            resolve(user);
        }, (err) => {
            reject(err);
        });

    });
}