const functions = require('firebase-functions');
const admin=require('firebase-admin');
admin.initializeApp();
const db=admin.firestore();
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
//export.<name>=fucntions.event
exports.newUser=functions.firestore.document('/users/{userid}').onCreate((data,context)=>{
//function always return the value

    var userid=context.params.userid;
    db.collection('userdata').doc(userid).set({
        uid:userid,
        name:'rajeev',
        
    }).then((data)=>{console.log(data)})


})