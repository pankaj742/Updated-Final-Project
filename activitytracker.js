var config = {
    apiKey: "AIzaSyCtf5dlViJYXWBeoo2yHfTI8vjY2m4wzJI",
    authDomain: "camera-app-ecf92.firebaseapp.com",
    databaseURL: "https://camera-app-ecf92.firebaseio.com",
    projectId: "camera-app-ecf92",
    storageBucket: "camera-app-ecf92.appspot.com",
    messagingSenderId: "902166638398"
};
firebase.initializeApp(config);
var db=firebase.firestore();

var box=document.getElementById("activityDiv");
function addInfo(msg){
    var infoBox=document.createElement('div');
    infoBox.id="row1";
    infoBox.tabIndex="1";
    infoBox.innerHTML=msg;
    box.appendChild(infoBox);
    infoBox.focus({preventScroll:false});
}

db.collection("activity").orderBy("timestamp").onSnapshot(function(queryShot){
    queryShot.docChanges().forEach(function(change){
        var msg=change.doc.data()["info"];
        addInfo(msg);
    });
});
