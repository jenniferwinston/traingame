

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
  	


 	var tFrequency = 3;
		var firstTime = time; 
		// First Time (pushed back 1 year to make sure it comes before current time)
		var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
		console.log(firstTimeConverted);
		// Current Time
		var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
		// Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);
		// Time apart (remainder)
		var tRemainder = diffTime % tFrequency;
		console.log(tRemainder);
		// Minute Until Train
		var tMinutesTillTrain = tFrequency - tRemainder;
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
		// Next Train
		var nextTrain = moment().add(tMinutesTillTrain, "minutes")
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))	

}); // onclick

  database.ref().on("child_added", function(childSnapshot){
	// pull the data
	var train = childSnapshot.val();
	console.log("Name: " + train.name);
	console.log("Destination: " + train.destination);
	console.log("Time: " + train.time);
	console.log("Frequency: " + train.frequency);
	console.log(moment().format('LT'));
	moment("YYYYMMDD").fromNow();
	
	//display in the top table
	var newElement = $("<tr/>").attr("data-name", train.name);
	  newElement.append($("<td/> ").text(train.name));
	  newElement.append($("<td/> ").text(train.destination));
	  newElement.append($("<td/> ").text(train.frequency));
	  newElement.append($("<td/> ").text(train.nextTrain)); // need to change to a time
	  newElement.append($("<td/> ").text(train.tMinutesTillTrain));
	  $(".table").append(newElement);

});	// child added



	