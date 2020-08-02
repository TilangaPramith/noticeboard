const functions = require('firebase-functions');
var fetch = require('node-fetch');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendPushNotification = functions.database.ref('/blogs/{id}').onCreate(event => {
    const root = event.data.ref.root
    var messages = []
    console.log('work');
    return root.child('/users').on('value').then((snapshot) => {
        snapshot.array.forEach(childSnapshot => {
            var expoToken = childSnapshot.val().expoToken

            if(expoToken) {
                messages.push({
                    "to": expoToken,
                    "title": "Noticeboard Alert",
                    "body": "New notice added into noticeboard"
                })
            }
        });
        return Promise.all(messages);
    })
    // eslint-disable-next-line promise/always-return
    .then( messages => {
        fetch("https://exp.host/--/api/v2/push/send",{
            headers: {
                "host": "exp.host",
                "Accept": "application/json",
                "Accept-Encoding": "gzip, deflate",
                "Content-Type": "application/json",
                
            },
            body: JSON.stringify(messages)
        })
    })
})
