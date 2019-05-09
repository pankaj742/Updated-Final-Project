 
var config = {
    apiKey: "AIzaSyCtf5dlViJYXWBeoo2yHfTI8vjY2m4wzJI",
    authDomain: "camera-app-ecf92.firebaseapp.com",
    databaseURL: "https://camera-app-ecf92.firebaseio.com",
    projectId: "camera-app-ecf92",
    storageBucket: "camera-app-ecf92.appspot.com",
    messagingSenderId: "902166638398"
  };
  firebase.initializeApp(config);
// firebase.initializeApp({
// 	  apiKey: 'AIzaSyAKLLPqrj6InjiZ3D1OjSmffMamXKBKF0s',
// 	  authDomain: 'pankaj-final-project.firebaseapp.com',
// 	  projectId: 'pankaj-final-project'
// 	});
var db = firebase.firestore();


var addData=function(){

	console.log("in the add function");
	var userName=document.getElementById("uname");
	var password=document.getElementById("pass");
	var email=document.getElementById("email");
	var phoneNo=document.getElementById("phoneNo");
	//console.log("db:"+db.toSource());
	db.collection("users").add({
	    "userName": userName.value,
	    "password": password.value,
	    "email": email.value,
	    "phoneNo": phoneNo.value
	})
	.then(function(docRef) {
	    console.log("Document written with ID: ", docRef.id);
	    sessionStorage.setItem("added","true");
		window.location.href="index.html";

	})
	.catch(function(error) {
	    console.error("Error adding document: ", error);
	});
	
	
}
