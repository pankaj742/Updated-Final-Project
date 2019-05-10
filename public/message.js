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
var currentUser="";

// async function getUserDocument(user){
//     console.log(user);
//     // return doc[0];
// }


// window.setTimeout(function () { 
//     // document.getElementById("userList").lastChild.focus({preventScroll:false});
//     document.getElementById("focusDiv").focus({preventScroll:false});

// }, 10000); 

// window.setTimeout(function(){
//     document.getElementById("userList").lastchild.focus({preventScroll:false});
// },2000);
function setUser(user){
    currentUser=user;
    if(currentUser != null){
        initialLoadMessages();
        fetchMessages();
        document.getElementsByName(currentUser)[0].setAttribute("class","currentUser");
        document.getElementsByName(currentUser)[0].setAttribute("id","");
    }else{
        alert("user does not exists");
    }
}
var userList=document.getElementById("userList");
function fetchUsers(){
    db.collection("messages")
    .onSnapshot(function(snapshot){
        snapshot.docChanges().forEach(function(change){
            if(change.type != "modified"){
                if(change.doc.data()["user"] == null){
                    return;
                }
                var user=document.createElement('div');
                user.id="userId";
                user.setAttribute("name",change.doc.data()["user"]);
                user.tabIndex="1";
                user.onclick=function(){
                    // user.style.backgroundColor="#fc23a5";
                    if(currentUser != ""){
                        document.getElementsByName(currentUser)[0].setAttribute("class","");
                        document.getElementsByName(currentUser)[0].setAttribute("id","userId");
                    }
                    setUser(change.doc.data()["user"]);
                }
                user.innerHTML=change.doc.data()["user"];
                
                // currentUser=change.doc.data()["user"];
                userList.appendChild(user);
                user.focus({preventScroll: false});
                user.click();
                }
            
        });
    });
}
fetchUsers();
var msgList=document.getElementById("msgList");

function initialLoadMessages(){
    db.collection("messages").where("user","==",currentUser).get().
    then(function(queryShot){
        queryShot.forEach(function(doc){
            var conv=doc.data()["conversation"];
            for(i=0;i<conv.length;i++){
                var type=conv[i]["role"];
                    var msgContent=conv[i]["message"];
                    var msg=document.createElement('div');
                    if(type == "manager"){
                        msg.className="msgElement";
                        msg.innerHTML=msgContent;
                        msg.tabIndex="1";
                        msg.style.outline="0px";
                        msgList.appendChild(msg);
                        msg.focus({preventScroll:false});
                        // continue;
                    }
                    else if(type == "seller"){
                        msg.className="msgFromSeller";
                        msg.innerHTML=msgContent;
                        msg.tabIndex="1";
                        msg.style.outline="0px";
                        msgList.appendChild(msg);
                        msg.focus({preventScroll:false});
                        // continue;
                    }
            }
        });

    });
}
initialLoadMessages();
function fetchMessages(){
    // var flag=0;
    db.collection("messages").where("user","==",currentUser)
    .onSnapshot(function(snapshot){
        snapshot.docChanges().forEach(function(change){
            if(change.type == "added" || change.type == "modified"){
                console.log(change.type);
                var conv=change.doc.data()["conversation"];
                // console.log(conv);
                    // console.log(time+":"+conv[time]["message"]);
                    var type=conv[conv.length -1]["role"];
                    var msgContent=conv[conv.length -1]["message"];
                    var msg=document.createElement('div');
                    if(type == "manager"){
                        msg.className="msgElement";
                        msg.innerHTML=msgContent;
                        msg.style.outline="0px";
                        msg.tabIndex="1";
                        // msg.focus({preventScroll:true});
                        msgList.appendChild(msg);
                        // continue;
                    }
                    else if(type == "seller"){
                        msg.className="msgFromSeller";
                        msg.innerHTML=msgContent;
                        msg.style.outline="0px";
                        msg.tabIndex="1";
                        // msg.focus({preventScroll:true});
                        msgList.appendChild(msg);
                        // continue;
                    }

                // msg.innerHTML=change.doc.data()["conversation"][""]
            }
        });
        initialLoadMessages();
        msgList.lastChild.focus({"preventScroll":false});

    });
}
fetchMessages();
function routeEnter(e){
    // console.log("key enter");
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13) { //Enter keycode
        // alert('enter press');
        sendMessage();
    }
}
function sendMessage(){
    var text=document.getElementById("msgbox").value;
    
    db.collection("messages").where("user","==",currentUser).get().then(
        function(queryShot){
            console.log(queryShot.docs[0]);
            doc=queryShot.docs[0];
            if(doc == null){
                console.log("doc is null");
                var data={
                    "user": currentUser,
                    "conversation":new Array()
                };
                data["conversation"].push({
                    "role": "manager",
                    "message": text
                });
                console.log(data);
                db.collection("messages").add(data).then((doc)=>{
                    console.log("document added new user "+doc.id);
                    document.getElementById("msgbox").value="";
                    // alert("please click on send button again");
                    return;
                });
               
            }
            var msg=doc.data()["conversation"];
            msg.push({
                "role":"manager",
                "message":text
            });
            db.collection("messages").doc(doc.id).update({
                "conversation":msg
            })
            .then(function() {
                console.log("Document successfully updated!");
                document.getElementById("msgbox").value="";
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
            alert("document sent");
        // });
        }
    );
}