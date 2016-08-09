

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAz27r0Vj1-QWnOZpjLI2rTUJiY1mtZfa8",
    authDomain: "traingame-c77e2.firebaseapp.com",
    databaseURL: "https://traingame-c77e2.firebaseio.com",
    storageBucket: "traingame-c77e2.appspot.com",
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // on click for form submission
  	$("#submit").click(function(){
  		var name = $("#nameinput").val().trim();
  		var destination = $("#destinput").val().trim();
  		var time = $("#timeinput").val().trim();
  		var frequency = $("#freqinput").val().trim();

  		//pushing input into firebase
  		database.ref().push({
  			name: name,
  			destination: destination,
  			time: firebase.database.ServerValue.TIMESTAMP,
  			frequency: frequency
  		})
  		$("input").val('');
  		return false;
  	}) // onclick


  database.ref().on("child_added", function(childSnapshot){
	// pull the data
	var train = childSnapshot.val();
	console.log("Name: " + train.name);
	console.log("Destination: " + train.destination);
	console.log("Time: " + train.time);
	console.log("Frequency: " + train.frequency);
	console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
	moment("YYYYMMDD").fromNow();
	
	//display in the top table
	var newElement = $("<tr/>").attr("data-name", train.name);
	  newElement.append($("<td/> ").text(train.name));
	  newElement.append($("<td/> ").text(train.destination));
	  newElement.append($("<td/> ").text(train.time));
	  newElement.append($("<td/> ").text(train.frequency));
	  $(".table").append(newElement);

});	// child added

	