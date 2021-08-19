const riotStaticAPI = require('../data/remote/riot-static-data-api.client'); 
const utils = require('../utils');
const admin = require('firebase-admin');
const db = admin.firestore();

exports.updateVersions = (response, language) => {

return riotStaticAPI.getVersions(language).then((resp) => {
    let data = resp.n;

  return  db.collection("versions").doc(language).set(data)
      .then(function() {
          response.status(200).send("Update version executado" );
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
          response.status(400).send("Update version erro" + error);
      });

  }, (err) => {
    console.error('erro updateVersions: ' + err);
    response.status(400).send("Update version error" );
  });
}
