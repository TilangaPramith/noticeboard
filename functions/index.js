const functions = require('firebase-functions');
var fetch = require('node-fetch');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendPushNotification = functions.database.ref('/blogs/{id}').onCreate(event => {
    const root = event.data.ref.root
    var messages = []

    return root.child('/users').once('value').then((snapshot) => {
        snapshot.array.forEach(childSnapshot => {
            var expoToken = childSnapshot.val().expoToken

            if(expoToken) {
                messages.push({
                    "to": expoToken,
                    "body": "new notice added"
                })
            }
        });
        return Promise.all(messages);
    })
    // eslint-disable-next-line promise/always-return
    .then( messages => {
        fetch("https://exp.host/--/api/v2/push/send",{
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                
            },
            body: JSON.stringify(messages)
        })
    })
})
