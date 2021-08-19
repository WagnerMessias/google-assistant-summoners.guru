const {google} = require('googleapis');
const key = require('../../src/app/key-league-of-legends-assistant.json');
const request = require('request');
const repositorySummoners = require('../data/summoners.repository');
const constants = require('../constants/riot-constants');

let jwtClient = new google.auth.JWT(
    key.client_email, null, key.private_key,
    ['https://www.googleapis.com/auth/actions.fulfillment.conversation'],
    null
  );

exports.sendNotificationForIntent = (language, intent, title) => {
    
    return new Promise(function(resolve, reject) {

        return repositorySummoners.getUserIdIntentForPushNotification(language,intent)
        .then((userIdsNotifications) => {
            //TODO if language
            let locale = 'en-US';
            sendNotification(userIdsNotifications,locale,intent,title,resolve);

        }, (err) => {
            reject(err);
        });
    });
}


function sendNotification(userIdPushNotification,locale,intent,title,resolve) {

    jwtClient.authorize((err, tokens) => {

        for(var index in userIdPushNotification){

            let notif = {
                userNotification: {
                title: title,
                },
                target: {
                userId: userIdPushNotification[index].userId,
                intent: intent,
                // Expects a IETF BCP-47 language code (i.e. en-US)
                locale: locale
                },
            };
    
            request.post(constants.ACTIONS_API_NOTIFICATION_SEND, {
                'auth': {
                'bearer': tokens.access_token,
                },
                'json': true,
                'body': {'customPushMessage':notif},
            }, (err, httpResponse, body) => {
                    console.info(httpResponse.statusCode + ': ' + httpResponse.statusMessage);
                if(err){
                    console.error('Error notification send: ' + err);
                }
            });
        }
        
    });
    resolve(true);
}