const utils = require('../../src/utils');
const jobFreechampionRotation = require('./freeChampionsRotation.job');
const jobVersionsUpdate = require('./versionsUpdate.job');
const jobChampionsUpdate = require('./championsUpdate.job');
const jobAbilitiesUpdate = require('./abilitiesUpdate.job');
// const jobCounterPickUpdate = require('./counterPickUpdate.job');


exports.startJobs = (request, response) => {

    let language = request.query.language;
 
    if(utils.validatekey(request.query.key)){

        switch(request.query.job){

            case "free_rotation":
                return jobFreechampionRotation.notifyUpdateNewFreeChampionRotation(response, language);
            case "update_versions":
                return jobVersionsUpdate.updateVersions(response, language);
            case "update_champions":
                return jobChampionsUpdate.updateChampions(response, language);
            case "update_abilities":
                return jobAbilitiesUpdate.updateAbilities(response, language);
            // case "update_counter_pick":
            //     return jobCounterPickUpdate.updateCounterPick(response);
            default:
                response.status(400).send("Job not found");
        }

    }else{
        response.status(401).send("Unauthorized");
    }

};

// https://us-central1-league-of-legends-assistant.cloudfunctions.net/cronJobs?key=dda0a4e34052333719aff239e203f13ebf6c563e&job=update_versions&language=br

// firebase functions:config:set key.freerotation="dda0a4e34052333719aff239e203f13ebf6c563e"