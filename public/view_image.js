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
var storeRef=firebase.storage().ref();
var fetchResults=function(){
    db.collection("image").where('tag','==',"image").get().then(function(queryShot){
        console.log(queryShot);
    queryShot.forEach(function(doc){
       addBox(doc);
    });
});
}
function viewMessage(){
    window.location='message.html';
}
async function generateResult(_url){
    var canvas=document.createElement('canvas');
	canvas.width="720";
	canvas.height="1080";
	canvas.style="border:2px solid black;margin: 0px 0px 0px 300px;";
	var ctx = canvas.getContext('2d');

	var tablestyle="background-color: pink;margin: auto;border: 1px solid black;width:720px;";
	var tdstyle="font-size: 40px;font-style: italic;font-family: arial;color: grey;text-align: center;width: 300px;border: 1px solid black;";
	var trstyle="height:100px;";
    // var url='hompage.png';
    var url=_url;
	var data= '<svg  xmlns="http://www.w3.org/2000/svg" width="720" height="1080">'+
				'<foreignObject width="100%" height="100%">'+
				'<div xmlns="http://www.w3.org/1999/xhtml">'+
				'<table style="'+tablestyle+'"><tr style="'+trstyle+'"><th style="'+tdstyle+'">Attribute</th><th style="'+tdstyle+'">Predicted Value</th></tr><tr style="'+trstyle+'"><td colspan="2" style="'+tdstyle+'">pankaj : shah</td>'+
				'</tr><tr style="'+trstyle+'"><td colspan="2" style="'+tdstyle+'">gautam : prakash</td></tr><tr style="'+trstyle+'"><td colspan="2" style="'+tdstyle+'">gautam : prakash</td>'+
				'</tr></table>'+
				'</div>'+
				'</foreignObject>'+
				'</svg>';
	    
	 data = await encodeURIComponent(data);

	 console.log("after encode");
    var img = new Image();
    var _blob;

	 img.onload = function() {
	  var displayimg=new Image();
	  displayimg.width="200";
	  displayimg.height="200";
	  displayimg.crossOrigin="anonymous";
	  displayimg.src=url;
	  displayimg.onload=function(){
	  	ctx.drawImage(displayimg,300,0,200,200);

	  		  ctx.drawImage(img, 0, 200);

	  console.log(canvas.toDataURL());
	  canvas.toBlob(function(blob) {
	     var newImg = document.createElement('img'),
	     url = URL.createObjectURL(blob);

	     newImg.onload = function() {
	     // no longer need to read the blob so it's revoked
         URL.revokeObjectURL(url);
         uploadResult(blob,_url);
        //  console.log(blob);
        //  return blob;
	   };

	   newImg.src = url;
    //    document.body.appendChild(newImg);
	 });
	  }

	}

    img.src = "data:image/svg+xml," + data;
	// document.body.appendChild(img);
	console.log("hi");
}
function uploadResult(blob,targetUrl){
    if(blob != null){
        var file = blob;
        console.log(blob);
        var body= document.getElementById("body");
        var storageRef = firebase.storage().ref();
        var db=firebase.firestore();
        // Create the file metadata
        var metadata = {
          contentType: 'image/jpeg'
        };

        var progressBar=document.createElement("progress");
        var text=document.createTextNode("uploading");
        progressBar.appendChild(text);
        progressBar.style.border="2px solid black";
        progressBar.max=100.0;
        progressBar.style.position="fixed";
        progressBar.style.top="100px";
        progressBar.style.left="500px";
        progressBar.style.width="400px";
        progressBar.style.height="100px";
        progressBar.style.zIndex="1";
        body.appendChild(progressBar);
        // Upload file and metadata to the object 'images/mountains.jpg'
        // var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);
        var uploadTask = storageRef.child("results/"+new Date()+".jpg").put(file, metadata);


        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            progressBar.value=progress;
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          }, function(error) {

          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;

            case 'storage/canceled':
              // User canceled the upload
              break;

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, function() {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            alert('Result has been generated sucesfully and saved to database ');
            window.open(downloadURL);
            db.collection("image").where("url", "==", targetUrl)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc);
                    doc.ref.update({
                        "result_url":downloadURL 
                    });
                    console.log("result added to image");
                    console.log(doc.id, " => ", doc.data());
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
            db.collection("results").add({
                    tag: "result",
                    id : uploadTask.snapshot.ref.location.path,
                    url: downloadURL
            });
                console.log(uploadTask.snapshot.ref.location.path);
            progressBar.style.display="none";
            // document.getElementById("img").src="img-succ.png";
          });
        });
    }
}
async function _predict(url){
    // var req=new XMLHttpRequest();
    // var blob;
    // req.open("GET",url);
    // req.responseType="blob";
    // req.onload=function(){
    //     console.log(req.response);
    // }
    // req.send();
        // File or Blob named mountains.jpg
        sessionStorage.setItem("url",url);
        window.open("../index.html");
        // generateResult(url);
        
}
function deleteImage(doc){
    console.log(doc.data());
    var body=document.getElementById("body");
    body.style.cursor="wait";
    console.log("doc"+doc.data()["name"]);
    var storeImage=storeRef.child(doc.data()["id"]);
    storeImage.delete().then(function(){
        console.log("image delete from storage");
        db.collection("image").doc(doc.id).delete().then(function(){
            body.style.cursor="default";
            alert("Image deleted succesfully");
            db.collection("activity").add({
                "info":"Image deleted via galary at time: "+new Date()+" document id: "+doc.id,
                "timestamp": new Date()
            });
            var cancel=document.getElementById("cancel");
            cancel.click();

        }).catch(function(e){
            console.log(e);
        });
    }).catch(function(e){
        console.log(e);
    });
}
var firstTime=true;
var updated=false;
if(firstTime==true && updated == false){
    fetchResults();
    firstTime=false;
}
function addNotification(msg){
    var message=document.createElement("div");
    message.style.display="block";
    message.style.border="1px solid pink";
    message.style.paddingLeft="30px";
    message.style.fontFamily="Arial";
    message.style.fontStyle="italic";
    switch(msg){
        case "Image added": message.style.color="green";
        // newNotification=true;
        break;
        case "Image removed": message.style.color="red";
        // newNotification=true;
        break;
        case "Image updated": message.style.color="orange";
        // newNotification=true;
        break;
        default: message.style.color="black";
    }
    var text=document.createTextNode(msg);
    // text.style.fontFamily="arial";
    message.appendChild(text);
    notification_object.appendChild(message);
}

var notification_no=0;
var no_value=document.getElementById("no_value");
firstTimeProblem=1;
var fetchUpdated=function(){
    // var flag=0;
    db.collection("image").where("tag","==","image").onSnapshot(function(queryShot){
    queryShot.docChanges().forEach(function(change){
            console.log(change.type);
            // if(change.type == "modified"){
            //     flag=1;
            //     return;}
            var box = document.getElementById("big_container");
            var parent=box.parentNode;
            parent.removeChild(box);
            var div=document.createElement('div');
            div.id="big_container";
            parent.appendChild(div);
           notification_no += 1;
           no_value.innerHTML=notification_no;
           var not=document.getElementById("notification");
           if(not == null){
               not=document.getElementById("newNotification");
           }
           not.id="newNotification";
        //    not.style.animationName="bhukbhai";
           not.style.animationPlayState="running";
            addNotification("Image "+change.type);
           if(change.type == "added" && firstTimeProblem == 0){
            var turl=change.doc.get("url");
            _predict(turl);
           }
           //alert("document "+change.type);
    });
    fetchResults();
    firstTimeProblem=0;
    
});
}
if(firstTime == false && updated==false){
    fetchUpdated();
    updated=true;
}
function addBox(doc){
    // console.log(doc.data());
    var data=doc.data();
    var container =document.getElementById("big_container");
    var box=document.createElement('div');
    box.id="container";
    // var textNode=document.createTextNode(data.id);
    // box.appendChild(textNode);
    var image=document.createElement("img");
    image.src=data.url;
    image.style.width= "360px";
    image.style.height= "420px";
    image.onclick= function imageFullScreen(){
        console.log("hi");
        var body= document.getElementById("body");
        var fullScreen=document.createElement("div");
        fullScreen.id="fullScreen";
        var button=document.createElement("img");
        button.id="deleteButton";
        button.src="delete.png";
        button.onclick=function(){
            deleteImage(doc);
        }
        var div=document.createElement("div");
        div.id="imgDiv";
        var image=document.createElement("img");
        image.id="fullImage";
        image.src=data.url;
        div.appendChild(image);
        fullScreen.appendChild(div);
        body.appendChild(fullScreen);
        var div=document.createElement('div');
        div.id="rightFullScreen";
        div.appendChild(button);
        var cancel=document.createElement("img");
        cancel.id="cancel";
        cancel.onclick=function(){
            fullScreen.style.display="none";
            fullScreen.parentNode.removeChild(fullScreen);
        };
        cancel.src="cancel.png";
        div.appendChild(cancel);
        var fullButton=document.createElement('button');
        fullButton.id='fullButton';
        fullButton.innerHTML="View in full Screen";
        fullButton.onclick=function(){
            window.open(data.url);
        };
        var predict=document.createElement('button');
        predict.innerHTML="predict";
        predict.onclick=function(){
            cancel.click();
            _predict(data.url);
        };
        div.appendChild(fullButton);
        div.append(predict);
        fullScreen.appendChild(div);

    };
    image.onmouseenter=function(){
        if(data.result_url == null){
            image.src="resultNotGenerated.png";
        }else{
            image.src=data.result_url;

        }
        // image.style.width= "400px";
        // image.style.height= "440px";
        // image.align="left";
        // image.style.opacity="0.2";
    };
    image.onmouseleave=function(){
        image.src=data.url;
        // image.style.width= "360px";
        // image.style.height= "420px";
        // image.align="left";
        // image.style.opacity="1";
    };
    // image.onclick=function(event){
    //     window.location=data.url;
    // };
    box.appendChild(image);
    container.appendChild(box);
}

// var period=setInterval(function(){
//     var box = document.getElementById("big_container");
//     var parent=box.parentNode;
//     parent.removeChild(box);
//     var div=document.createElement('div');
//     div.id="big_container";
//     parent.appendChild(div);
//     fetchResults();
// },20000);
var notification_object=document.getElementById("full_notification");
var notification_state=0;
function openNotification(){
    if(notification_state == 0){
        var not=document.getElementById("newNotification");
        if(not == null){
            notification_object.style.display="block";
            notification_state=1;
            return;
        }
        not.style.animationPlayState="paused";
        not.id="notification";
        notification_object.style.display="block";
        notification_state=1;
    }else{
        notification_object.style.display="none";
        notification_state=0;
    }
    
}


// var body=document.getElementById("body");
// body.onclick=function(){
//     alert("clicked on document");
//     notification_state=1;
//     openNotification();
// }
