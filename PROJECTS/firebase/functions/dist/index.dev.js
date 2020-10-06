"use strict";

var functions = require('firebase-functions');

var admin = require('firebase-admin');

admin.initializeApp();
var db = admin.firestore();
exports.helloWorld = functions.https.onRequest(function (request, response) {
  functions.logger.info("Hello logs!", {
    structuredData: true
  });
  response.send("Hello from Firebase!");
}); //export.<name>=fucntions.event

exports.newUser = functions.firestore.document('/users/{userid}').onCreate(function (data, context) {
  //function always return the value
  var userid = context.params.userid;
  db.collection('userdata').doc(userid).set({
    uid: userid,
    name: 'rajeev'
  }).then(function (data) {
    console.log(data);
  });
});