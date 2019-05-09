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

var totalImagesAvailable;
var resultsGenerated;
var totalMessagesReceived=0;
var conversations;
var totalMessagesSent=0;
var totalUsers;
db.collection("image").get().then(function(queryShot){
    // console.log(queryShot.size);
    totalImagesAvailable=queryShot.size;
    console.log("total images available : "+totalImagesAvailable);
    addBox("total images available : "+totalImagesAvailable);
});
db.collection("results").get().then(function(queryShot){
    // console.log(queryShot.size);
    resultsGenerated=queryShot.size;
    console.log("total results available : "+resultsGenerated);
    addBox("total results available : "+resultsGenerated);

});
db.collection("messages").get().then(function(queryShot){
    // console.log(queryShot.size);
    conversations=queryShot.size;
    console.log("total coversations : "+conversations);
    addBox("total coversations : "+conversations);

    queryShot.forEach(function(doc){
        var arr=doc.data()["conversation"];
        if(arr == null){
            return;
        }
        // console.log(arr);
        for( i in arr){
            var user=arr[i]["role"];
            if(user == "manager"){
                totalMessagesSent += 1;
            }else{
                totalMessagesReceived += 1;
            }
        }
        // arr.forEach(function(i){
            
        // })
    });
    console.log("total messages sent : "+totalMessagesSent);
    addBox("total messages sent : "+totalMessagesSent);

    console.log("total messages recieved : "+totalMessagesReceived);
    addBox("total messages recieved : "+totalMessagesReceived);
});


db.collection("users").get().then(function(queryShot){
    // console.log(queryShot.size);
   totalUsers=queryShot.size;
   console.log("total users : "+totalUsers);
});

var stats=document.getElementById("stats");
function addBox(msg){
    var stat=document.createElement("div");
    stat.id="row1";
    stat.innerHTML=msg;
    stats.appendChild(stat);
}