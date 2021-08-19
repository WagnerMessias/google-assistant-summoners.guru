const admin = require('firebase-admin');
const db = admin.firestore();


exports.saveUserIdIntentForPushNotification = (language,userID, intent) => { 

    return new Promise(function(resolve, reject) {
        let data = {intent: intent, userId: userID, language: language}
        db.collection("pushNotification"+language.toUpperCase()).add(data)
        .then(function(docRef) {
            resolve(docRef)
        })
        .catch(function(error) {
            reject(error);
            console.error("Error adding document: ", error);
        });
    })
} 

exports.fetchUserIdIntentForPushNotification = (language, intent) => { 

    return new Promise(function(resolve, reject) {

        let collectionRef = db.collection("pushNotification"+language.toUpperCase());
        let where = collectionRef.where("intent","==",intent).where("language","==",language);
        return where.get().then(function(querySnapshot) {
            if (querySnapshot.size > 0) {
                resolve(querySnapshot);
            } else {
                console.error("No such userId for notification!")
                reject("No such userId for notification!");
            }
        }).catch(function(error) {
            console.error("Error getting userId for notification:", error);
            reject("Error getting userId for notification: ", error);
        });
    })
}

exports.saveUser = (dataUser) => { 

    return new Promise(function(resolve, reject) {
        
        db.collection("users").doc(dataUser.sub).set(dataUser)
        .then(function(docRef) {
            resolve(docRef)
        })
        .catch(function(error) {
            reject(error);
            console.error("Error adding document: ", error);
        });
    })
} 

exports.fetchUserById = (id) => { 

    return new Promise(function(resolve, reject) {

        let docRef = db.collection("users").doc(id);

        return docRef.get().then(function(doc) {
            if (doc.exists) {
                resolve(doc.data());
            } else {
                console.info("No such user!")
                reject("No such user");
            }
        }).catch(function(error) {
            console.error("Error getting user:", error);
            reject("Error getting user:", error);
        });
    })
} 