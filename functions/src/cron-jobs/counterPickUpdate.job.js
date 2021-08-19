// const championsDB = require('../data/local/champions.db'); 
// const utils = require('../utils');
// const admin = require('firebase-admin');
// const db = admin.firestore();
// const Crawler = require('crawler');
// const html2json = require('html2json').html2json;


// exports.updateCounterPick = (response) => {


//     var c = new Crawler({
//         maxConnections : 10,
//         // This will be called for each crawled page
//         callback : function (error, res, done) {
//             if(error){
//                 console.log(error);
//                 response.status(400).send("erro na creulada : "+ error);
//             }else{
//                 var $ = res.$;
//                 // $ is Cheerio by default
//                 //a lean implementation of core jQuery designed specifically for the server
//                 console.log($("title").text());
//                 let jsonObj = html2json(res.body);

//                 response.status(200).send(jsonObj);
//             }
//             done();
//         }
//     });

//     c.queue('https://www.counterstats.net/league-of-legends/ezreal');

// return championsDB.getAllChampions(language).then((champions) => {



//   }, (err) => {
//     console.error('erro updateVersions: ' + err);
//     response.status(400).send("Update version error" );
//   });
// }


    // const abilities = [];

    // champions.forEach(function(champion) {
    //     champion.spells.forEach(function(spell) {
    //         abilities.push(spell);
    //     });
    // });

    // return championsDB.saveAbilities(language,abilities).then((result) => {
        
    //     return championsDB.getEntity("abilities"+language.toUpperCase()).then((entity) => {
    //         response.status(200).send(entity);
    //       }, (err) => {
    //         console.error('erro get entity: ' + err);
    //         response.status(400).send("erro get entity: " +err);
    //       });


    // }, (err) => {
    //     console.error('erro update abilities: ' + err);
    //     response.status(400).send("Update abilities error" );
    // });
// };