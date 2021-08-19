'use strict';
const adminFirebase = require('firebase-admin');
adminFirebase.initializeApp();

const functions = require('firebase-functions');

const {app} = require('./src/app/app');

const jobs = require('./src/cron-jobs/jobs');

const controller = require('./src/app/func-controller');


// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

exports.cronJobs = functions.https.onRequest(jobs.startJobs);

exports.getFreeChampionsRotation = functions.https.onRequest(controller.getFreeChampions);

exports.getChampion = functions.https.onRequest(controller.getChampion);
